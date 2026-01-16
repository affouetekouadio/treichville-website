<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'youtube_url',
        'published_at',
        'ordre',
        'actif',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'actif' => 'boolean',
        'ordre' => 'integer',
    ];

    protected $appends = [
        'youtube_id',
    ];

    public function scopeActif($query)
    {
        return $query->where('actif', true);
    }

    public function getYoutubeIdAttribute(): ?string
    {
        return self::extractYoutubeId($this->youtube_url);
    }

    public function toFrontendArray(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description ?? '',
            'youtube_url' => $this->youtube_url,
            'youtube_id' => $this->youtube_id,
            'published_at' => optional($this->published_at ?? $this->created_at)->toDateString(),
            'actif' => $this->actif,
            'ordre' => $this->ordre,
        ];
    }

    public static function extractYoutubeId(?string $url): ?string
    {
        if (! $url) {
            return null;
        }

        $patterns = [
            '%(?:youtube\.com/(?:watch\?v=|embed/|shorts/)|youtu\.be/)([A-Za-z0-9_-]{11})%i',
        ];

        foreach ($patterns as $pattern) {
            if (preg_match($pattern, $url, $matches)) {
                return $matches[1];
            }
        }

        return null;
    }
}
