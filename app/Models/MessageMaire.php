<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class MessageMaire extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'messages_maire';

    protected $fillable = [
        'photo',
        'image_fond',
        'titre_vision',
        'salutation',
        'contenu_message',
        'texte_conclusion',
        'nom_maire',
        'titre_maire',
        'citation',
        'actif',
    ];

    protected $casts = [
        'actif' => 'boolean',
    ];

    protected $appends = [
        'photo_url',
        'image_fond_url',
    ];

    public function scopeActif($query)
    {
        return $query->where('actif', true);
    }

    public function getPhotoUrlAttribute(): ?string
    {
        if (!$this->photo) {
            return null;
        }

        if (
            str_starts_with($this->photo, 'http://') ||
            str_starts_with($this->photo, 'https://') ||
            str_starts_with($this->photo, '/')
        ) {
            return $this->photo;
        }

        return Storage::disk('public')->url($this->photo);
    }

    public function getImageFondUrlAttribute(): ?string
    {
        if (!$this->image_fond) {
            return null;
        }

        if (
            str_starts_with($this->image_fond, 'http://') ||
            str_starts_with($this->image_fond, 'https://') ||
            str_starts_with($this->image_fond, '/')
        ) {
            return $this->image_fond;
        }

        return Storage::disk('public')->url($this->image_fond);
    }

    public function toFrontendArray(): array
    {
        return [
            'id' => $this->id,
            'photo_url' => $this->photo_url,
            'image_fond_url' => $this->image_fond_url,
            'titre_vision' => $this->titre_vision,
            'salutation' => $this->salutation,
            'contenu_message' => $this->contenu_message,
            'texte_conclusion' => $this->texte_conclusion,
            'nom_maire' => $this->nom_maire,
            'titre_maire' => $this->titre_maire,
            'citation' => $this->citation,
            'actif' => $this->actif,
        ];
    }
}
