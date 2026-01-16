<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Actualite extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre',
        'slug',
        'categorie',
        'category_id',
        'description',
        'contenu',
        'image_path',
        'status',
        'published_at',
        'meta_title',
        'meta_description',
        'est_flash_info',
        'actif',
        'ordre_affichage',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'est_flash_info' => 'boolean',
        'actif' => 'boolean',
    ];

    protected $appends = [
        'image_url',
    ];

    protected static function booted(): void
    {
        static::creating(function (self $actualite): void {
            if (empty($actualite->slug)) {
                $actualite->slug = Str::slug($actualite->titre);
            }
        });
    }

    public function mediaFiles(): HasMany
    {
        return $this->hasMany(MediaFile::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published')->whereNotNull('published_at');
    }

    public function scopeFlashInfos($query)
    {
        return $query->where('est_flash_info', true)
            ->where('actif', true)
            ->published()
            ->orderBy('ordre_affichage', 'asc')
            ->orderBy('published_at', 'desc');
    }

    public function getImageUrlAttribute(): ?string
    {
        if (! $this->image_path) {
            return null;
        }

        if (
            str_starts_with($this->image_path, 'http://') ||
            str_starts_with($this->image_path, 'https://') ||
            str_starts_with($this->image_path, '/')
        ) {
            return $this->image_path;
        }

        return Storage::disk('public')->url($this->image_path);
    }

    public function toFrontendArray(): array
    {
        return [
            'id' => $this->id,
            'titre' => $this->titre,
            'slug' => $this->slug,
            'description' => $this->description ?? '',
            'contenu' => $this->contenu ?? '',
            'categorie' => $this->category?->name ?? $this->categorie ?? 'Annonce',
            'category_id' => $this->category_id,
            'image_url' => $this->image_url,
            'date_publication' => optional($this->published_at ?? $this->created_at)->toDateString(),
        ];
    }
}
