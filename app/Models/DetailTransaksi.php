<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DetailTransaksi extends Model
{
    /** @use HasFactory<\Database\Factories\DetailTransaksiFactory> */
    use HasFactory;

    protected $guarded = ['id'];
    protected $with = ['menu'];
    protected $table = 'detail_transaksis';

    public function transaksi(): BelongsTo
    {
        return $this->belongsTo(Transaksi::class, 'id_transaksi');
    }

    public function menu(): BelongsTo
    {
        return $this->belongsTo(Menu::class, 'id_menu');
    }
}
