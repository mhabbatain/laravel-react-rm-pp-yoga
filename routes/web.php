<?php

use App\Http\Controllers\DetailPesananController;
use App\Http\Controllers\KaryawanController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\PesananController;
use App\Http\Controllers\POSController;
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

// Route::get('/pos', fn() => inertia('POS'))->name('pos');
Route::resource('pos', POSController::class);
Route::resource('karyawan', KaryawanController::class);
// Route::resource('daftar-pesanan', DetailPesananController::class);
Route::resource('daftar-pesanan', PesananController::class);
Route::resource('daftar-menu', MenuController::class);



require __DIR__ . '/settings.php';
