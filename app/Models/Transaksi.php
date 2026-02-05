<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Transaksi extends Model
{
    /** @use HasFactory<\Database\Factories\TransaksiFactory> */
    use HasFactory;

    protected $guarded = ['id'];
    protected $table = 'transaksis';

    /**
     * @deprecated Use user() instead. This relationship is kept for legacy support.
     */
    public function karyawan()
    {
        return $this->belongsTo(Karyawan::class, 'id_karyawan');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function detailTransaksis()
    {
        return $this->hasMany(DetailTransaksi::class, 'id_transaksi');
    }
}
