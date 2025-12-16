<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('media_files', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->string('path');
            $table->string('disk')->default('public');
            $table->string('collection')->default('default');
            $table->string('file_type')->default('file');
            $table->string('mime_type')->nullable();
            $table->unsignedBigInteger('size')->nullable();
            $table->foreignId('actualite_id')->nullable()->constrained('actualites')->cascadeOnDelete();
            $table->foreignId('evenement_id')->nullable()->constrained('evenements')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('media_files');
    }
};
