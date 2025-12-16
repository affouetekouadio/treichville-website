<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Crée la table directions pour gérer les directions/services de la mairie
     */
    public function up(): void
    {
        Schema::create('directions', function (Blueprint $table) {
            $table->id();
            $table->string('nom'); // Nom de la direction/service
            $table->string('slug')->unique();
            $table->text('description')->nullable(); // Description de la direction
            $table->string('responsable')->nullable(); // Nom du responsable
            $table->string('adresse')->nullable(); // Adresse spécifique si différente
            $table->integer('ordre')->default(0); // Ordre d'affichage
            $table->boolean('actif')->default(true); // Si la direction est active
            $table->timestamps();
        });
    }

    /**
     * Supprime la table directions
     */
    public function down(): void
    {
        Schema::dropIfExists('directions');
    }
};
