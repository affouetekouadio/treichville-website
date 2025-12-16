<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * Model Patrimoine - Représente les monuments et lieux patrimoniaux de Treichville
 */
class Patrimoine extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre',
        'slug',
        'categorie',
        'description',
        'contenu',
        'image_path',
        'lieu',
        'status',
        'published_at',
        'meta_title',
        'meta_description',
        'category_id',
    ];

    protected $casts = [
        'published_at' => 'datetime',
    ];

    protected $appends = [
        'image_url',
    ];

    /**
     * Boot du model - Génération automatique du slug
     */
    protected static function booted(): void
    {
        static::creating(function (self $patrimoine): void {
            if (empty($patrimoine->slug)) {
                $patrimoine->slug = Str::slug($patrimoine->titre);
            }
        });
    }

    /**
     * Relation avec les fichiers media
     */
    public function mediaFiles(): HasMany
    {
        return $this->hasMany(MediaFile::class);
    }

    /**
     * Relation avec la catégorie
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Scope pour récupérer uniquement les patrimoines publiés
     */
    public function scopePublished($query)
    {
        return $query->where('status', 'published')->whereNotNull('published_at');
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
            'titre' => $this->titre,
            'slug' => $this->slug,
            'description' => $this->description ?? '',
            'categorie' => $this->category?->name ?? $this->categorie ?? 'Patrimoine',
            'category_id' => $this->category_id,
            'lieu' => $this->lieu,
            'image_url' => $this->image_url,
            'date_publication' => optional($this->published_at ?? $this->created_at)->toDateString(),
        ];
    }
}
