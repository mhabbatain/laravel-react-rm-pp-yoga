<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('beranda', function () {
        return Inertia::render('beranda');
    })->name('beranda');
});

Route::get('/pos', fn() => inertia('POS'))->name('pos');
Route::get('/daftar-pesanan', fn() => inertia('daftar-pesanan'))->name('daftar-pesanan');
Route::get('/daftar-pesanan/{id}', fn($id) => inertia('detail-daftar-pesanan', ['id' => $id]))->name('detail-daftar-pesanan');

Route::get('/karyawan', fn() => inertia('karyawan'))->name('karyawan');
Route::get('/daftar-menu', fn() => inertia('daftar-menu'))->name('daftar-menu');

require __DIR__ . '/settings.php';
