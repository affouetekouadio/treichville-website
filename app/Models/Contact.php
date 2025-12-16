<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Contact extends Model
{
    protected $fillable = [
        'nom',
        'email',
        'telephone',
        'sujet',
        'message',
        'traite',
        'traite_le',
        'traite_par',
    ];

    protected $casts = [
        'traite' => 'boolean',
        'traite_le' => 'datetime',
    ];

    /**
     * Relation avec l'utilisateur qui a traité le message
     */
    public function traitePar(): BelongsTo
    {
        return $this->belongsTo(User::class, 'traite_par');
    }
}
