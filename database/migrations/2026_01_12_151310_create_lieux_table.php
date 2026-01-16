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
        Schema::create('lieux', function (Blueprint $table) {
            $table->id();
            $table->string('type'); // Parc ou Piscine
            $table->string('nom');
            $table->text('description');
            $table->string('image')->nullable();
            $table->string('horaires')->nullable();
            $table->string('acces')->default('Gratuit'); // Gratuit ou Payant
            $table->json('equipements')->nullable(); // Array d'équipements
            $table->integer('ordre')->default(0);
            $table->boolean('actif')->default(true);
            $table->timestamps();

            $table->index(['ordre', 'actif']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lieux');
    }
};
