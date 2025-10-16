<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // This migration targets PostgreSQL. It drops the existing check constraint
        // and recreates it to allow the known analysis types.
        if (DB::getDriverName() === 'pgsql') {
            DB::statement('ALTER TABLE analyses DROP CONSTRAINT IF EXISTS analyses_type_check');
            DB::statement("ALTER TABLE analyses ADD CONSTRAINT analyses_type_check CHECK (type IN ('risk','opportunity','solution','investment'))");
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (DB::getDriverName() === 'pgsql') {
            DB::statement('ALTER TABLE analyses DROP CONSTRAINT IF EXISTS analyses_type_check');
        }
    }
};
