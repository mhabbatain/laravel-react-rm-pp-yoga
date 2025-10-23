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
        'jabatan',
        'no_telepon',
        'alamat'
    ];

    public function pesanans()
    {
        return $this->hasMany(Pesanan::class, 'id_karyawan');
    }
}
