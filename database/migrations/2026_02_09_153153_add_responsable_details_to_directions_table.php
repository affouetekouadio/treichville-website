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
            $table->string('photo_responsable')->nullable()->after('responsable');
            $table->text('biographie_responsable')->nullable()->after('photo_responsable');
            $table->json('reseaux_sociaux_responsable')->nullable()->after('biographie_responsable');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('directions', function (Blueprint $table) {
            $table->dropColumn(['photo_responsable', 'biographie_responsable', 'reseaux_sociaux_responsable']);
        });
    }
};
