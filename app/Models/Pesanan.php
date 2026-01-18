<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pesanan extends Model
{
    /** @use HasFactory<\Database\Factories\PesananFactory> */
    use HasFactory;

    protected $fillable = [
        'id_karyawan',
        'id_user',
        'nomor_pesanan',
        'meja',
        'waktu',
        'total',
        'metode_pembayaran',
    ];

    public function karyawan()
    {
        return $this->belongsTo(Karyawan::class, 'id_karyawan');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function detail_pesanans()
    {
        return $this->hasMany(DetailPesanan::class, 'id_pesanan');
    }
}
