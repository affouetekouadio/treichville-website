<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->enum('type', ['actualite', 'evenement', 'patrimoine']);
            $table->timestamps();
        });

        Schema::table('actualites', function (Blueprint $table) {
            $table->foreignId('category_id')->nullable()->after('categorie')->constrained('categories')->nullOnDelete();
        });

        Schema::table('evenements', function (Blueprint $table) {
            $table->foreignId('category_id')->nullable()->after('categorie')->constrained('categories')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('actualites', function (Blueprint $table) {
            $table->dropConstrainedForeignId('category_id');
        });
        Schema::table('evenements', function (Blueprint $table) {
            $table->dropConstrainedForeignId('category_id');
        });
        Schema::dropIfExists('categories');
    }
};
