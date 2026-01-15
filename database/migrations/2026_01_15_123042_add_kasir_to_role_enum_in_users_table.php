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
        // Untuk MySQL, kita perlu mengubah ENUM dengan ALTER TABLE
        DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('admin', 'karyawan', 'kasir') DEFAULT 'karyawan'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('admin', 'karyawan') DEFAULT 'karyawan'");
    }
};
