<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use Illuminate\Http\Request;

class KategoriController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Ambil semua kategori
        $kategoris = Kategori::all();
        return response()->json($kategoris);
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
            'name' => 'required|string|max:255',
        ]);
        $kategori = Kategori::create($validated);
        return response()->json($kategori, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Kategori $kategori)
    {
        return response()->json($kategori);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Kategori $kategori)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Kategori $kategori)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);
        $kategori->update($validated);
        return response()->json($kategori);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kategori $kategori)
    {
        $kategori->delete();
        return response()->json(['message' => 'Kategori deleted']);
    }
}
