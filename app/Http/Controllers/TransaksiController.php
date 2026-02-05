<?php

namespace App\Http\Controllers;

use App\Models\Transaksi;
use App\Services\PrintService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransaksiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = $request->get('filter', 'semua');
        
        $query = Transaksi::with('detailTransaksis')->orderBy('created_at', 'desc');
        
        // Filter berdasarkan periode
        switch ($filter) {
            case 'harian':
                $query->whereDate('created_at', Carbon::today());
                break;
            case 'mingguan':
                $query->whereBetween('created_at', [
                    Carbon::now()->startOfWeek(),
                    Carbon::now()->endOfWeek()
                ]);
                break;
            case 'bulanan':
                $query->whereMonth('created_at', Carbon::now()->month)
                      ->whereYear('created_at', Carbon::now()->year);
                break;
            case 'tahunan':
                $query->whereYear('created_at', Carbon::now()->year);
                break;
            default:
                // 'semua' - tidak ada filter
                break;
        }
        
        $transaksis = $query->get();
        
        return Inertia::render('daftar-transaksi', [
            'transaksis' => $transaksis,
            'currentFilter' => $filter,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {}

    /**
     * Display the specified resource.
     */
    public function show(Transaksi $daftar_transaksi)
    {
        // Load relasi detail_pesanans dan menu
        $daftar_transaksi->load('detailTransaksis.menu');

        return Inertia::render('daftar-transaksi-detail', [
            'transaksi' => $daftar_transaksi,
        ]);
    }

    /**
     * Print receipt for a given order (Browser Print)
     */
    public function print(Transaksi $daftar_transaksi)
    {
        // Load relasi untuk print
        $daftar_transaksi->load(['detailTransaksis.menu', 'karyawan', 'user']);

        return view('print.receipt', [
            'transaksi' => $daftar_transaksi,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pesanan $pesanan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pesanan $pesanan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaksi $daftar_transaksi)
    {
        // Hapus detail pesanan terlebih dahulu
        $daftar_transaksi->detailTransaksis()->delete();
        
        // Hapus transaksi
        $daftar_transaksi->delete();

        return to_route('daftar-transaksi.index');
    }
}
