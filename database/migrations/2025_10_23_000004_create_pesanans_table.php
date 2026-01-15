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
        Schema::create('pesanans', function (Blueprint $table) {
            $table->id();
            $table->foreignId("id_karyawan")->constrained('karyawans')->onDelete("cascade");
            $table->string("nomor_pesanan");
            $table->enum("meja", ['1', '2', '3', '4', '5', '6', '7']);
            $table->dateTime('waktu', precision: 0);
            $table->double("total");
            $table->enum("metode_pembayaran", ["tunai", "qris"]);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pesanans');
    }
};
