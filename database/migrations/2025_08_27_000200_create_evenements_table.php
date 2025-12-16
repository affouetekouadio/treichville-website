<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('evenements', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->string('slug')->unique();
            $table->string('categorie')->nullable();
            $table->text('description')->nullable();
            $table->longText('contenu')->nullable();
            $table->string('image_path')->nullable();
            $table->boolean('gratuit')->default(false);
            $table->timestamp('date_debut')->nullable()->index();
            $table->timestamp('date_fin')->nullable();
            $table->string('lieu')->nullable();
            $table->string('status')->default('draft');
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('evenements');
    }
};
