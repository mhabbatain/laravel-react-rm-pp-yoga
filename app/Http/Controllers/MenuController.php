<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('daftar-menu', [
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
        // 1. Validasi input
        $validated = $request->validate([
            'nama_menu' => 'required|string|max:255',
            'id_kategori' => 'required|integer|exists:kategoris,id',
            'harga' => 'required|numeric|min:0',
            'stok' => 'required|integer|min:0',
            'gambar' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048', // maks 2MB
        ]);

        // 2. Handle file upload
        if ($request->hasFile('gambar')) {
            // Simpan gambar di 'storage/app/public/menu-images'
            // 'path' akan berisi sesuatu seperti 'menu-images/namfile.jpg'
            $path = $request->file('gambar')->store('menu-images', 'public');
            $validated['gambar'] = $path;
        }

        // 3. Buat data menu baru
        Menu::create($validated);

        // 4. Redirect kembali ke halaman index
        return Redirect::route('daftar-menu.index')->with('success', 'Menu berhasil ditambahkan!.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Menu $menu)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Menu $menu)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Menu $daftar_menu)
    {
        // 1. Validasi input
        $validated = $request->validate([
            'nama_menu' => 'required|string|max:255',
            'id_kategori' => 'required|integer|exists:kategoris,id',
            'harga' => 'required|numeric|min:0',
            'stok' => 'required|integer|min:0',
            // 'sometimes' berarti hanya validasi jika field 'gambar' dikirim
            'gambar' => 'sometimes|nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        // 2. Handle file upload (jika ada gambar baru)
        if ($request->hasFile('gambar')) {
            // Hapus gambar lama jika ada
            if ($daftar_menu->gambar && Storage::disk('public')->exists($daftar_menu->gambar)) {
                Storage::disk('public')->delete($daftar_menu->gambar);
            }

            // Simpan gambar baru
            $path = $request->file('gambar')->store('menu-images', 'public');
            $validated['gambar'] = $path;
        } else {
            // 3. JANGAN UPDATE GAMBAR JIKA TIDAK ADA FILE BARU
            // Hapus 'gambar' dari data yang akan di-update
            unset($validated['gambar']);
        }

        // 3. Update data menu
        $daftar_menu->update($validated);

        // 4. Redirect
        return Redirect::route('daftar-menu.index')->with('success', 'Menu berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Menu $daftar_menu)
    {
        // 1. Hapus gambar terkait dari storage
        if ($daftar_menu->gambar && Storage::disk('public')->exists($daftar_menu->gambar)) {
            Storage::disk('public')->delete($daftar_menu->gambar);
        }

        // 2. Hapus data dari database
        $daftar_menu->delete();

        // 3. Redirect

        return Redirect::route('daftar-menu.index')->with('success', 'Menu berhasil dihapus!.');
    }
}
