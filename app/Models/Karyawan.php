<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Karyawan extends Model
{
    /** @use HasFactory<\Database\Factories\KaryawanFactory> */
    use HasFactory;

    protected $fillable = [
        'nama',
        'role',
        'no_telepon',
        'alamat',
        'user_id',
    ];

    public function transaksis()
    {
        return $this->hasMany(Transaksi::class, 'id_karyawan');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
