<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class MediaFile extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'path',
        'disk',
        'collection',
        'file_type',
        'mime_type',
        'size',
        'actualite_id',
        'evenement_id',
    ];

    protected $appends = [
        'url',
    ];

    public function actualite(): BelongsTo
    {
        return $this->belongsTo(Actualite::class);
    }

    public function evenement(): BelongsTo
    {
        return $this->belongsTo(Evenement::class);
    }

    public function getUrlAttribute(): string
    {
        if (
            str_starts_with($this->path, 'http://') ||
            str_starts_with($this->path, 'https://') ||
            str_starts_with($this->path, '/')
        ) {
            return $this->path;
        }

        return Storage::disk($this->disk ?? 'public')->url($this->path);
    }
}
