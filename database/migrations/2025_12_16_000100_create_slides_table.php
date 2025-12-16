<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Crée la table slides pour gérer le carrousel de la page d'accueil
     */
    public function up(): void
    {
        Schema::create('slides', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable(); // Titre principal du slide
            $table->string('subtitle')->nullable(); // Sous-titre
            $table->string('highlight')->nullable(); // Texte mis en évidence (couleur orange)
            $table->text('description')->nullable(); // Description du slide
            $table->string('image_path'); // Chemin de l'image (obligatoire)
            $table->string('cta_text')->nullable(); // Texte du bouton call-to-action
            $table->string('cta_link')->nullable(); // Lien du bouton (URL ou ID de section)
            $table->integer('ordre')->default(0); // Ordre d'affichage
            $table->boolean('actif')->default(true); // Si le slide est actif
            $table->timestamps();
        });
    }

    /**
     * Supprime la table slides
     */
    public function down(): void
    {
        Schema::dropIfExists('slides');
    }
};
