<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

/**
 * Model Slide - Représente un slide du carrousel de la page d'accueil
 */
class Slide extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'subtitle',
        'highlight',
        'description',
        'image_path',
        'cta_text',
        'cta_link',
        'ordre',
        'actif',
    ];

    protected $casts = [
        'actif' => 'boolean',
        'ordre' => 'integer',
    ];

    protected $appends = [
        'image_url',
    ];

    /**
     * Scope pour récupérer uniquement les slides actifs, ordonnés
     */
    public function scopeActifs($query)
    {
        return $query->where('actif', true)
            ->orderBy('ordre', 'asc')
            ->orderBy('id', 'asc');
    }

    /**
     * Accesseur pour l'URL de l'image
     * Gère les URLs locales et externes
     */
    public function getImageUrlAttribute(): ?string
    {
        if (! $this->image_path) {
            return null;
        }

        // Si c'est une URL externe ou un chemin absolu, retourner tel quel
        if (
            str_starts_with($this->image_path, 'http://') ||
            str_starts_with($this->image_path, 'https://') ||
            str_starts_with($this->image_path, '/')
        ) {
            return $this->image_path;
        }

        // Sinon, générer l'URL depuis le storage public
        return Storage::disk('public')->url($this->image_path);
    }

    /**
     * Formate les données pour l'affichage frontend
     */
    public function toFrontendArray(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title ?? '',
            'subtitle' => $this->subtitle ?? '',
            'highlight' => $this->highlight ?? '',
            'description' => $this->description ?? '',
            'image' => $this->image_url,
            'cta' => $this->cta_text ?? 'Découvrir',
            'cta_link' => $this->cta_link,
        ];
    }
}
