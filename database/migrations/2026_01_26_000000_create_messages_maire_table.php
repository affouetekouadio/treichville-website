<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('messages_maire', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('photo')->nullable();
            $table->string('image_fond')->nullable();
            $table->string('titre_vision');
            $table->string('salutation');
            $table->text('contenu_message');
            $table->text('texte_conclusion')->nullable();
            $table->string('nom_maire');
            $table->string('titre_maire');
            $table->string('citation')->nullable();
            $table->boolean('actif')->default(false);
            $table->timestamps();

            $table->index('actif');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('messages_maire');
    }
};
