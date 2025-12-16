<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Crée la table direction_contacts pour gérer les contacts multiples par direction
     */
    public function up(): void
    {
        Schema::create('direction_contacts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('direction_id')->constrained('directions')->cascadeOnDelete();
            $table->enum('type', ['email', 'telephone', 'fax', 'whatsapp']); // Type de contact
            $table->string('valeur'); // Valeur du contact (email, numéro, etc.)
            $table->string('label')->nullable(); // Label optionnel (ex: "Standard", "Urgences", etc.)
            $table->integer('ordre')->default(0); // Ordre d'affichage
            $table->timestamps();
        });
    }

    /**
     * Supprime la table direction_contacts
     */
    public function down(): void
    {
        Schema::dropIfExists('direction_contacts');
    }
};
