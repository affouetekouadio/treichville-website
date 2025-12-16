<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Model DirectionContact - Représente un contact (email, téléphone, etc.) d'une direction
 */
class DirectionContact extends Model
{
    use HasFactory;

    protected $fillable = [
        'direction_id',
        'type',
        'valeur',
        'label',
        'ordre',
    ];

    protected $casts = [
        'ordre' => 'integer',
    ];

    /**
     * Relation avec la direction parente
     */
    public function direction(): BelongsTo
    {
        return $this->belongsTo(Direction::class);
    }
}
