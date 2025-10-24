<?php

namespace App\Http\Controllers;

use App\Models\DetailPesanan;
use App\Models\Pesanan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DetailPesananController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Pesanan $pesanan)
    {
        // // Load relasi detail_pesanans dan menu serta karyawan
        // $pesanan->load(['detail_pesanans.menu', 'karyawan']);

        // // Mengirim ke halaman Inertia
        // return Inertia::render('DetailDaftarPesanan', [
        //     'pesanan' => $pesanan,
        // ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DetailPesanan $detailPesanan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DetailPesanan $detailPesanan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DetailPesanan $detailPesanan)
    {
        //
    }
}
