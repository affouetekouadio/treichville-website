<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

/**
 * Model Adjoint - Représente les adjoints au maire
 */
class Adjoint extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'role',
        'photo',
        'focus',
        'icon',
        'ordre',
        'actif',
    ];

    protected $casts = [
        'actif' => 'boolean',
        'ordre' => 'integer',
    ];

    /**
     * Scope pour récupérer uniquement les adjoints actifs
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
     * Accesseur pour obtenir l'URL complète de la photo
     */
    public function getPhotoUrlAttribute(): ?string
    {
        if (!$this->photo) {
            return null;
        }

        // Si c'est une URL externe
        if (str_starts_with($this->photo, 'http://') || str_starts_with($this->photo, 'https://')) {
            return $this->photo;
        }

        // Sinon, générer l'URL depuis le storage
        return Storage::disk('public')->url($this->photo);
    }

    /**
     * Boot du modèle
     */
    protected static function boot()
    {
        parent::boot();

        // Définir automatiquement l'ordre lors de la création
        static::creating(function ($adjoint) {
            if (!$adjoint->ordre) {
                $maxOrdre = static::max('ordre') ?? 0;
                $adjoint->ordre = $maxOrdre + 1;
            }
        });
    }
}
