<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('adjoints', function (Blueprint $table) {
            $table->id();
            $table->string('nom'); // Nom de l'adjoint
            $table->string('role'); // Ex: "4ème adjoint", "3ème adjoint"
            $table->string('photo')->nullable(); // Chemin vers la photo
            $table->string('focus')->nullable(); // Ex: "Vie citoyenne & proximité" (nullable comme demandé)
            $table->string('icon')->nullable(); // Nom de l'icône Lucide
            $table->integer('ordre')->default(0); // Ordre d'affichage
            $table->boolean('actif')->default(true); // Activé/désactivé
            $table->timestamps();

            $table->index(['ordre', 'actif']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('adjoints');
    }
};
