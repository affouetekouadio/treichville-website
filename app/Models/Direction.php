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
                $direction->slug = Str::slug($direction->nom);
            }
        });
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
