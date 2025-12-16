<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('actualites', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->string('slug')->unique();
            $table->string('categorie')->nullable();
            $table->text('description')->nullable();
            $table->longText('contenu')->nullable();
            $table->string('image_path')->nullable();
            $table->string('status')->default('draft');
            $table->timestamp('published_at')->nullable()->index();
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();

            // Champs pour les flash infos
            $table->boolean('est_flash_info')->default(false);
            $table->boolean('actif')->default(true);
            $table->integer('ordre_affichage')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('actualites');
    }
};
