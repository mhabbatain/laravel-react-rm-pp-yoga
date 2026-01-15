<?php

namespace App\Http\Controllers;

use App\Models\Pesanan;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PesananController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = $request->get('filter', 'semua');
        
        $query = Pesanan::with('detail_pesanans')->orderBy('created_at', 'desc');
        
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
        
        $pesanans = $query->get();
        
        return Inertia::render('daftar-pesanan', [
            'pesanans' => $pesanans,
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
    public function show(Pesanan $daftar_pesanan)
    {
        // Load relasi detail_pesanans dan menu
        $daftar_pesanan->load('detail_pesanans.menu');

        return Inertia::render('daftar-pesanan-detail', [
            'pesanan' => $daftar_pesanan,
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
    public function destroy(Pesanan $pesanan)
    {
        //
    }
}
