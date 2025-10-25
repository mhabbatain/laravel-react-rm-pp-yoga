<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use App\Models\Menu;
use App\Models\Pesanan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class POSController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        return Inertia::render('POS', [
            'kategoris' => Kategori::all(),
            'menuItems' => Menu::with('kategori')->get(),
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
    public function store(Request $request)
    {
        // Validasi data dari frontend
        $validated = $request->validate([
            'id_karyawan' => 'required|exists:karyawans,id',
            'meja' => 'required|in:1,2,3,4,5,6,7',
            'metode_pembayaran' => 'required|in:tunai,qris',
            'detail_pesanans' => 'required|array|min:1',
            'detail_pesanans.*.id_menu' => 'required|exists:menus,id',
            'detail_pesanans.*.jumlah' => 'required|integer|min:1',
            'detail_pesanans.*.subtotal' => 'required|numeric|min:0',
        ]);

        // Hitung total harga pesanan
        $total = collect($validated['detail_pesanans'])->sum('subtotal');

        // Generate nomor pesanan unik (misalnya: ORD-20251025-001)
        $nomorPesanan = 'ORD-' . now()->format('Ymd-His');

        // Simpan pesanan utama
        $pesanan = Pesanan::create([
            'id_karyawan' => $validated['id_karyawan'],
            'nomor_pesanan' => $nomorPesanan,
            'meja' => $validated['meja'],
            'waktu' => now(),
            'total' => $total,
            'metode_pembayaran' => $validated['metode_pembayaran'],
        ]);

        // Simpan detail pesanan (loop setiap item)
        foreach ($validated['detail_pesanans'] as $detail) {
            $pesanan->detail_pesanans()->create([
                'id_menu' => $detail['id_menu'],
                'jumlah' => $detail['jumlah'],
                'subtotal' => $detail['subtotal'],
            ]);
        }

        // Redirect atau response Inertia
        return back()->with('success', 'Pesanan berhasil dibuat!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
