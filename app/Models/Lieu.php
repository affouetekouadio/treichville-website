<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Lieu extends Model
{
    use HasFactory;

    protected $table = 'lieux';

    protected $fillable = [
        'type',
        'nom',
        'description',
        'image',
        'horaires',
        'acces',
        'equipements',
        'ordre',
        'actif',
        'is_flash_info',
    ];

    protected $casts = [
        'equipements' => 'array',
        'actif' => 'boolean',
        'ordre' => 'integer',
        'is_flash_info' => 'boolean',
    ];

    /**
     * Scope pour récupérer uniquement les lieux actifs
     */
    public function scopeActif($query)
    {
        return $query->where('actif', true);
    }

    /**
     * Scope pour trier par ordre
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('ordre', 'asc');
    }

    /**
     * Scope pour récupérer les lieux flash info
     */
    public function scopeFlashInfos($query)
    {
        return $query->where('is_flash_info', true)
            ->where('actif', true)
            ->orderBy('ordre', 'asc');
    }

    /**
     * Accessor pour l'URL de l'image
     */
    public function getImageUrlAttribute(): ?string
    {
        if (!$this->image) {
            return null;
        }

        // Si c'est déjà une URL complète, la retourner
        if (str_starts_with($this->image, 'http://') || str_starts_with($this->image, 'https://')) {
            return $this->image;
        }

        // Sinon, construire l'URL depuis le storage public
        return Storage::disk('public')->url($this->image);
    }

    /**
     * Boot method pour auto-assigner l'ordre
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($lieu) {
            if (!isset($lieu->ordre) || $lieu->ordre === 0) {
                $maxOrdre = static::max('ordre') ?? 0;
                $lieu->ordre = $maxOrdre + 1;
            }
        });
    }
}
