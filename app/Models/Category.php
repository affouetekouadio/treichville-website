<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'type',
    ];

    protected static function booted(): void
    {
        static::creating(function (self $category): void {
            if (empty($category->slug)) {
                $category->slug = Str::slug($category->name);
            }
        });
    }

    public function actualites(): HasMany
    {
        return $this->hasMany(Actualite::class);
    }

    public function evenements(): HasMany
    {
        return $this->hasMany(Evenement::class);
    }

    public function patrimoines(): HasMany
    {
        return $this->hasMany(Patrimoine::class);
    }
}
