<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

/**
 * Model Direction - Représente une direction ou service de la mairie
 */
class Direction extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'slug',
        'description',
        'short_description',
        'contenu',
        'icon',
        'responsable',
        'adresse',
        'ordre',
        'actif',
    ];

    protected $casts = [
        'actif' => 'boolean',
        'ordre' => 'integer',
    ];

    /**
     * Boot du model - Génération automatique du slug
     */
    protected static function booted(): void
    {
        static::creating(function (self $direction): void {
            if (empty($direction->slug)) {
                $direction->slug = static::generateUniqueSlug(Str::slug($direction->nom));
            }
        });
    }

    public static function generateUniqueSlug(string $baseSlug, ?int $ignoreId = null): string
    {
        $slug = $baseSlug;
        $suffix = 1;

        while (static::where('slug', $slug)
            ->when($ignoreId, fn ($query) => $query->where('id', '!=', $ignoreId))
            ->exists()) {
            $suffix += 1;
            $slug = $baseSlug . '-' . $suffix;
        }

        return $slug;
    }

    /**
     * Relation avec les contacts de la direction
     */
    public function contacts(): HasMany
    {
        return $this->hasMany(DirectionContact::class)->orderBy('ordre', 'asc');
    }

    /**
     * Scope pour récupérer uniquement les directions actives, ordonnées
     */
    public function scopeActives($query)
    {
        return $query->where('actif', true)
            ->orderBy('ordre', 'asc')
            ->orderBy('nom', 'asc');
    }

    /**
     * Récupère tous les emails de la direction
     */
    public function getEmailsAttribute()
    {
        return $this->contacts()->where('type', 'email')->get();
    }

    /**
     * Récupère tous les téléphones de la direction
     */
    public function getTelephonesAttribute()
    {
        return $this->contacts()->where('type', 'telephone')->get();
    }

    /**
     * Formate les données pour l'affichage frontend
     */
    public function toFrontendArray(): array
    {
        return [
            'id' => $this->id,
            'nom' => $this->nom,
            'slug' => $this->slug,
            'description' => $this->description ?? '',
            'short_description' => $this->short_description ?? $this->description ?? '',
            'contenu' => $this->contenu ?? '',
            'icon' => $this->icon,
            'responsable' => $this->responsable,
            'adresse' => $this->adresse,
            'contacts' => $this->contacts->map(function ($contact) {
                return [
                    'type' => $contact->type,
                    'valeur' => $contact->valeur,
                    'label' => $contact->label,
                ];
            }),
        ];
    }
}
