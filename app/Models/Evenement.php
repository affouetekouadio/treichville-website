<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Evenement extends Model
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
        'gratuit',
        'date_debut',
        'date_fin',
        'lieu',
        'status',
        'meta_title',
        'meta_description',
    ];

    protected $casts = [
        'gratuit' => 'boolean',
        'date_debut' => 'datetime',
        'date_fin' => 'datetime',
    ];

    protected $appends = [
        'image_url',
    ];

    protected static function booted(): void
    {
        static::creating(function (self $evenement): void {
            if (empty($evenement->slug)) {
                $evenement->slug = Str::slug($evenement->titre);
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
        return $query->where('status', 'published')->whereNotNull('date_debut');
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
            'categorie' => $this->category?->name ?? $this->categorie ?? 'Événement',
            'category_id' => $this->category_id,
            'image_url' => $this->image_url,
            'gratuit' => $this->gratuit,
            'date_debut' => optional($this->date_debut)->toIso8601String(),
            'date_fin' => optional($this->date_fin)->toIso8601String(),
            'lieu' => $this->lieu ?? '',
        ];
    }
}
