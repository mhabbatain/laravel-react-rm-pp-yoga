<?php

namespace App\Http\Controllers;

use App\Models\Karyawan;
use App\Models\Menu;
use App\Models\Pesanan;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use NumberFormatter;

class BerandaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $today = Carbon::today();

        // --- Ambil Data Statistik ---

        // 1. Pesanan Hari Ini (Sudah benar)
        $pesananHariIni = Pesanan::whereDate('created_at', $today)->count();

        // 2. Total Karyawan
        $totalKaryawan = Karyawan::count();

        // 3. Menu Tersedia (Stok > 0) (Sudah benar)
        $menuAktif = Menu::where('stok', '>', 0)->count();

        // 4. Pendapatan Hari Ini
        // <-- Perubahan: Gunakan kolom 'total' sesuai migrasi pesanans
        $pendapatanHariIniRaw = Pesanan::whereDate('created_at', $today)->sum('total');

        // --- Format Pendapatan ke Rupiah (Sudah benar) ---
        $formatter = new NumberFormatter('id_ID', NumberFormatter::CURRENCY);
        // Mengatasi jika sum() menghasilkan null (tidak ada pesanan hari ini)
        $pendapatanHariIni = $formatter->formatCurrency($pendapatanHariIniRaw ?? 0, 'IDR');
        $pendapatanHariIni = str_replace(',00', '', $pendapatanHariIni);

        // --- Siapkan Array Stats (Sudah benar) ---
        $stats = [
            [
                'title' => 'Pesanan Hari Ini',
                'value' => (string) $pesananHariIni,
            ],
            [
                'title' => 'Total Karyawan',
                'value' => (string) $totalKaryawan,
            ],
            [
                'title' => 'Menu Tersedia',
                'value' => (string) $menuAktif,
            ],
            [
                'title' => 'Pendapatan Hari Ini',
                'value' => $pendapatanHariIni,
            ],
        ];

        // --- Ambil Data Pesanan Terbaru ---
        // <-- Perubahan: Pilih kolom yang ada di tabel 'pesanans'
        // Tabel 'pesanans' TIDAK memiliki 'nama_pelanggan' atau 'status'.
        // Kita ambil 'nomor_pesanan' sebagai gantinya. Frontend perlu disesuaikan.
        $recentOrders = Pesanan::select('id', 'nomor_pesanan', 'total') // Pilih kolom yang tersedia
            ->latest() // Urutkan berdasarkan created_at descending (default)
            ->limit(3)
            ->get();

        // --- Kirim Data ke Inertia View ---
        return Inertia::render('beranda', [
            'stats' => $stats,
            'recentOrders' => $recentOrders, // Kirim data pesanan terbaru (dengan kolom yang ada)
        ]);
    }

    // Method lain (create, store, show, edit, update, destroy) tidak diperlukan.
}
