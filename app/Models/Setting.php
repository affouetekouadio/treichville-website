<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

/**
 * Model Setting - Gère les paramètres de configuration du site
 */
class Setting extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'value',
        'type',
        'group',
        'description',
    ];

    protected $casts = [
        'value' => 'string',
    ];

    /**
     * Cache key pour les settings
     */
    const CACHE_KEY = 'app.settings';

    /**
     * Récupère la valeur d'un paramètre par sa clé
     */
    public static function get(string $key, $default = null)
    {
        $settings = static::getAllCached();
        return $settings[$key] ?? $default;
    }

    /**
     * Définit la valeur d'un paramètre
     */
    public static function set(string $key, $value, string $type = 'text', string $group = 'general'): self
    {
        $setting = static::updateOrCreate(
            ['key' => $key],
            [
                'value' => $value,
                'type' => $type,
                'group' => $group,
            ]
        );

        static::clearCache();

        return $setting;
    }

    /**
     * Récupère tous les paramètres (avec cache)
     */
    public static function getAllCached(): array
    {
        return Cache::rememberForever(self::CACHE_KEY, function () {
            return static::all()->pluck('value', 'key')->toArray();
        });
    }

    /**
     * Récupère tous les paramètres groupés
     */
    public static function getAllGrouped(): array
    {
        return static::all()->groupBy('group')->map(function ($settings) {
            return $settings->keyBy('key');
        })->toArray();
    }

    /**
     * Vide le cache des paramètres
     */
    public static function clearCache(): void
    {
        Cache::forget(self::CACHE_KEY);
    }

    /**
     * Accesseur pour obtenir la valeur décodée
     */
    public function getDecodedValueAttribute()
    {
        return match ($this->type) {
            'json' => json_decode($this->value, true),
            'boolean' => filter_var($this->value, FILTER_VALIDATE_BOOLEAN),
            'image' => $this->getImageUrl(),
            default => $this->value,
        };
    }

    /**
     * Récupère l'URL de l'image si le type est image
     */
    protected function getImageUrl(): ?string
    {
        if (!$this->value) {
            return null;
        }

        // Si c'est une URL externe
        if (str_starts_with($this->value, 'http://') || str_starts_with($this->value, 'https://')) {
            return $this->value;
        }

        // Sinon, générer l'URL depuis le storage
        return Storage::disk('public')->url($this->value);
    }

    /**
     * Boot du modèle
     */
    protected static function boot()
    {
        parent::boot();

        // Vider le cache après chaque modification
        static::saved(function () {
            static::clearCache();
        });

        static::deleted(function () {
            static::clearCache();
        });
    }
}
