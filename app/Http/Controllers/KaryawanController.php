<?php

namespace App\Http\Controllers;

use App\Models\Karyawan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KaryawanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('karyawan', [
            'karyawans' => Karyawan::all()
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

        $validated = $request->validate([
            'nama' => 'required|max:255',
            'jabatan' => 'required|in:kasir,pelayan,koki,manajer',
            'no_telepon' => [
                'required',
                'regex:/^[0-9+() -]+$/', // Biar hanya angka dan simbol telepon umum
                'max:20',
                'unique:karyawans,no_telepon' // Memastikan nggak ad nomor yg sama
            ],
            'status' => 'required|in:aktif,nonaktif',
        ]);

        Karyawan::create([
            'nama' => $validated['nama'],
            'jabatan' => $validated['jabatan'],
            'no_telepon' => $validated['no_telepon'],
            'status' => $validated['status'],
        ]);


        return back()->with('success', 'Karyawan baru berhasil ditambahkan!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Karyawan $karyawan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Karyawan $karyawan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Karyawan $karyawan)
    {
        //
        $validated = $request->validate([
            'nama' => 'sometimes|required|max:255',
            'jabatan' => 'sometimes|required|in:kasir,pelayan,koki,manajer',
            'no_telepon' => [
                'sometimes',
                'required',
                'regex:/^[0-9+() -]+$/',
                'max:20',
                'unique:karyawans,no_telepon,' . $karyawan->id,
            ],
            'status' => 'sometimes|required|in:aktif,nonaktif',
        ]);

        $karyawan->update($validated);

        return back()->with('success', 'Data karyawan berhasil diupdate!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Karyawan $karyawan)
    {
        $karyawan->delete();
        return back()->with('success', 'Data karyawan berhasil dihapus!');
    }
}
