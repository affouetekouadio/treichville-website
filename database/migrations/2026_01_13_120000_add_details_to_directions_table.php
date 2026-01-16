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
        Schema::table('directions', function (Blueprint $table) {
            $table->string('short_description')->nullable()->after('description');
            $table->text('contenu')->nullable()->after('short_description');
            $table->string('icon')->nullable()->after('contenu');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('directions', function (Blueprint $table) {
            $table->dropColumn(['short_description', 'contenu', 'icon']);
        });
    }
};
