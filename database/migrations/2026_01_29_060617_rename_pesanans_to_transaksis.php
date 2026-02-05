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
        Schema::rename('pesanans', 'transaksis');
        Schema::rename('detail_pesanans', 'detail_transaksis');
        
        Schema::table('detail_transaksis', function (Blueprint $table) {
            $table->renameColumn('id_pesanan', 'id_transaksi');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('detail_transaksis', function (Blueprint $table) {
            $table->renameColumn('id_transaksi', 'id_pesanan');
        });

        Schema::rename('transaksis', 'pesanans');
        Schema::rename('detail_transaksis', 'detail_pesanans');
    }
};
