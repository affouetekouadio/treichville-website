<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Crée la table patrimoines pour gérer les monuments et lieux patrimoniaux
     */
    public function up(): void
    {
        Schema::create('patrimoines', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->string('slug')->unique();
            $table->string('categorie')->nullable(); // Catégorie textuelle (fallback)
            $table->text('description')->nullable();
            $table->longText('contenu')->nullable();
            $table->string('image_path')->nullable();
            $table->string('lieu')->nullable(); // Localisation du patrimoine
            $table->string('status')->default('draft'); // draft, published
            $table->timestamp('published_at')->nullable()->index();
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();

            // Relation avec categories
            $table->foreignId('category_id')->nullable()->constrained('categories')->nullOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Supprime la table patrimoines
     */
    public function down(): void
    {
        Schema::dropIfExists('patrimoines');
    }
};
