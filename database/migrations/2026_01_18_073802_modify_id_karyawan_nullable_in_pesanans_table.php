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
        Schema::table('pesanans', function (Blueprint $table) {
            // Drop foreign key constraint first
            $table->dropForeign(['id_karyawan']);
            
            // Make id_karyawan nullable
            $table->foreignId('id_karyawan')->nullable()->change();
            
            // Add foreign key back with nullable support
            $table->foreign('id_karyawan')
                  ->references('id')
                  ->on('karyawans')
                  ->onDelete('set null');
            
            // Add id_user column for admin users
            $table->foreignId('id_user')->nullable()->after('id_karyawan')
                  ->constrained('users')
                  ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pesanans', function (Blueprint $table) {
            // Drop id_user column
            $table->dropForeign(['id_user']);
            $table->dropColumn('id_user');
            
            // Revert id_karyawan to not nullable
            $table->dropForeign(['id_karyawan']);
            $table->foreignId('id_karyawan')->nullable(false)->change();
            $table->foreign('id_karyawan')
                  ->references('id')
                  ->on('karyawans')
                  ->onDelete('cascade');
        });
    }
};
