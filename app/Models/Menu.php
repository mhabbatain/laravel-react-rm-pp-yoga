<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    /** @use HasFactory<\Database\Factories\MenuFactory> */
    use HasFactory;
    /**
     * Get the kategori that owns the menu.
     */
    public function kategori()
    {
        return $this->belongsTo(Kategori::class, 'id_kategori');
    }
}
