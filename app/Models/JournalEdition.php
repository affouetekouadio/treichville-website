<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class JournalEdition extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'file_path',
        'cover_image_path',
        'file_size',
        'published_at',
        'ordre',
        'actif',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'ordre' => 'integer',
        'actif' => 'boolean',
    ];

    protected $appends = [
        'file_url',
        'cover_image_url',
        'file_size_label',
        'download_url',
    ];

    public function scopeActifs($query)
    {
        return $query->where('actif', true)
            ->orderByDesc('published_at')
            ->orderBy('ordre', 'asc')
            ->orderBy('id', 'desc');
    }

    public function getFileUrlAttribute(): ?string
    {
        return $this->resolvePath($this->file_path);
    }

    public function getCoverImageUrlAttribute(): ?string
    {
        return $this->resolvePath($this->cover_image_path);
    }

    public function getFileSizeLabelAttribute(): ?string
    {
        if (! $this->file_size) {
            return null;
        }

        $size = $this->file_size;
        if ($size >= 1024 * 1024) {
            return number_format($size / (1024 * 1024), 1, '.', ' ') . ' Mo';
        }

        return number_format($size / 1024, 1, '.', ' ') . ' Ko';
    }

    public function toFrontendArray(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title ?? '',
            'description' => $this->description ?? '',
            'size' => $this->file_size_label,
            'url' => $this->file_url,
            'download_url' => $this->download_url,
            'cover_image' => $this->cover_image_url,
            'published_at' => optional($this->published_at)->toDateString(),
        ];
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

    public function getDownloadUrlAttribute(): string
    {
        return route('communication.journal.download', $this);
    }
}
