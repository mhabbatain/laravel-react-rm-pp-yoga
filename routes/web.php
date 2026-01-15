<?php

use App\Http\Controllers\BerandaController;
use App\Http\Controllers\KaryawanController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\PesananController;
use App\Http\Controllers\POSController;
use App\Http\Controllers\AiController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified', 'kasir'])->group(function () {
    // Halaman khusus admin
    Route::middleware(['admin'])->group(function () {
        Route::get('beranda', [BerandaController::class, 'index'])->name('beranda');
        Route::resource('karyawan', KaryawanController::class);
        Route::resource('daftar-pesanan', PesananController::class);
        Route::resource('daftar-menu', MenuController::class);
        
        // AI Chat endpoint (backend proxy ke Gemini/OpenAI-like API)
        Route::post('/ai/chat', [AiController::class, 'chat'])->name('ai.chat');
        Route::get('/ai-chat', function () {
            return Inertia::render('ai-chat');
        })->name('ai.chat.page');
    });
    
    // Halaman POS - bisa diakses admin dan kasir
    Route::resource('pos', POSController::class);
});


require __DIR__ . '/settings.php';
