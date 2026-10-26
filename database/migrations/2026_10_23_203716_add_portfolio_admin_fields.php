<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('is_admin')->default(false);
        });
        Schema::table('projects', function (Blueprint $table) {
            $table->string('short_description', 500)->nullable()->change();
            $table->string('github_url', 2048)->nullable()->change();
            $table->string('demo_url', 2048)->nullable()->change();
            $table->json('image')->nullable();
            $table->index(['category', 'created_at', 'id']);
            $table->index(['featured', 'created_at', 'id']);
        });
        Schema::table('experiences', function (Blueprint $table) {
            // ponytail: galleries are capped at three; use related media rows for independently managed galleries.
            $table->json('evidence_images')->default('[]');
            $table->index(['start_date', 'id']);
        });
        Schema::table('certificates', function (Blueprint $table) {
            $table->string('credential_url', 2048)->nullable()->change();
            $table->json('image')->nullable();
            $table->index(['year', 'id']);
        });
        DB::statement('ALTER TABLE experiences ADD CONSTRAINT experience_gallery_limit CHECK (json_typeof(evidence_images) = \'array\' AND json_array_length(evidence_images) <= 3)');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Keep widened text columns so a rollback cannot truncate existing content.
        DB::statement('ALTER TABLE experiences DROP CONSTRAINT experience_gallery_limit');
        Schema::table('users', fn (Blueprint $table) => $table->dropColumn('is_admin'));
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn('image');
            $table->dropIndex(['category', 'created_at', 'id']);
            $table->dropIndex(['featured', 'created_at', 'id']);
        });
        Schema::table('experiences', function (Blueprint $table) {
            $table->dropColumn('evidence_images');
            $table->dropIndex(['start_date', 'id']);
        });
        Schema::table('certificates', function (Blueprint $table) {
            $table->dropColumn('image');
            $table->dropIndex(['year', 'id']);
        });
    }
};
