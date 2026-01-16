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
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique(); // Clé unique du paramètre
            $table->text('value')->nullable(); // Valeur du paramètre
            $table->string('type')->default('text'); // Type: text, image, json, boolean
            $table->string('group')->default('general'); // Groupe: general, contact, social, appearance
            $table->text('description')->nullable(); // Description du paramètre
            $table->timestamps();

            $table->index(['group']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
