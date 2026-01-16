<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class ContentBlock extends Model
{
    use HasFactory;

    protected $fillable = [
        'page',
        'section_key',
        'title',
        'content',
        'image_path',
        'background_image_path',
        'cta_text',
        'cta_link',
        'data',
        'ordre',
        'actif',
    ];

    protected $casts = [
        'actif' => 'boolean',
        'ordre' => 'integer',
        'data' => 'array',
    ];

    protected $appends = [
        'image_url',
        'background_image_url',
    ];

    public function scopeActifs($query)
    {
        return $query->where('actif', true)
            ->orderBy('ordre', 'asc')
            ->orderBy('id', 'asc');
    }

    public function getImageUrlAttribute(): ?string
    {
        return $this->resolvePath($this->image_path);
    }

    public function getBackgroundImageUrlAttribute(): ?string
    {
        return $this->resolvePath($this->background_image_path);
    }

    private function resolvePath(?string $path): ?string
    {
        if (! $path) {
            return null;
        }

        if (
            str_starts_with($path, 'http://') ||
            str_starts_with($path, 'https://') ||
            str_starts_with($path, '/')
        ) {
            return $path;
        }

        return Storage::disk('public')->url($path);
    }

    public function toFrontendArray(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title ?? '',
            'content' => $this->content ?? '',
            'image' => $this->image_url,
            'background_image' => $this->background_image_url,
            'cta' => $this->cta_text ?? '',
            'cta_link' => $this->cta_link,
            'data' => $this->data ?? [],
        ];
    }
}
