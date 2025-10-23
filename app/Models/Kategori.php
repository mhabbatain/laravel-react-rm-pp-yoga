<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kategori extends Model
{
    /** @use HasFactory<\Database\Factories\KategoriFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    /**
     * Get the menus associated with the category.
     */
    public function menus()
    {
        return $this->hasMany(Menu::class, 'id_kategori');
    }
}
