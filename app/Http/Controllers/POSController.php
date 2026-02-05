<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use App\Models\Menu;
use App\Models\Transaksi;
use App\Services\PrintService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Throwable;

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
        // Validasi data dasar dari frontend
        $validated = $request->validate([
            // 'id_karyawan' removed. We now use id_user for everyone.
            'id_user' => 'nullable|exists:users,id',
            'meja' => 'required|in:1,2,3,4,5,6,7',
            'metode_pembayaran' => 'required|in:tunai,qris',
            'detail_transaksis' => 'required|array|min:1',
            'detail_transaksis.*.id_menu' => 'required|exists:menus,id',
            'detail_transaksis.*.jumlah' => 'required|integer|min:1',
        ]);

        // Tentukan ID User: jika dikirim di request pakai itu (admin pilih karyawan), 
        // jika tidak, pakai user yang sedang login.
        $userId = $validated['id_user'] ?? auth()->id();

        if (empty($userId)) {
            return back()->withInput()->with('error', 'User ID tidak ditemukan.');
        }

        // Mulai database transaction
        try {
            DB::beginTransaction();

            $total = 0;
            $detailUntukDisimpan = [];

            // 1. Loop untuk validasi stok dan hitung ulang total/subtotal
            foreach ($validated['detail_transaksis'] as $detail) {
                // Temukan menu dan lock barisnya untuk mencegah race condition stok
                $menu = Menu::lockForUpdate()->find($detail['id_menu']);

                // Jika menu tidak ditemukan (seharusnya tidak terjadi karena validasi exists)
                if (!$menu) {
                    throw new \Exception("Menu dengan ID {$detail['id_menu']} tidak ditemukan.");
                }

                // Cek ketersediaan stok
                if ($menu->stok < $detail['jumlah']) {
                    throw new \Exception("Stok untuk menu '{$menu->nama_menu}' tidak mencukupi (tersisa: {$menu->stok}, diminta: {$detail['jumlah']}).");
                }

                // Hitung ulang subtotal berdasarkan harga dari database (lebih aman)
                $subtotal = $menu->harga * $detail['jumlah'];
                $total += $subtotal; // Akumulasi total

                // Simpan detail yang sudah divalidasi dan dihitung ulang
                $detailUntukDisimpan[] = [
                    'id_menu' => $detail['id_menu'],
                    'jumlah' => $detail['jumlah'],
                    'subtotal' => $subtotal,
                    'menu_instance' => $menu // Simpan instance menu untuk update stok nanti
                ];
            }

            // 2. Generate nomor pesanan unik
            $nomorPesanan = 'ORD-' . now()->format('Ymd-His');

            // 3. Simpan transaksi utama
            $transaksi = Transaksi::create([
                'id_karyawan' => null, // Deprecated, set null
                'id_user' => $userId, // Use the determined user ID
                'nomor_pesanan' => $nomorPesanan,
                'meja' => $validated['meja'],
                'waktu' => now(),
                'total' => $total, // Gunakan total yang dihitung ulang
                'metode_pembayaran' => $validated['metode_pembayaran'],
            ]);

            // 4. Simpan detail transaksi DAN kurangi stok
            foreach ($detailUntukDisimpan as $detail) {
                // Simpan detail ke database
                $transaksi->detailTransaksis()->create([
                    'id_menu' => $detail['id_menu'],
                    'jumlah' => $detail['jumlah'],
                    'subtotal' => $detail['subtotal'],
                ]);

                // Kurangi stok menu
                $menuInstance = $detail['menu_instance'];
                // $menuInstance->stok -= $detail['jumlah']; // Cara biasa
                $menuInstance->decrement('stok', $detail['jumlah']); // Cara lebih aman (atomic)
                // $menuInstance->save(); // Tidak perlu save jika menggunakan decrement
            }

            // Jika semua berhasil, commit transaction
            DB::commit();

            // Redirect dengan pesan sukses dan transaksi_id untuk print
            return back()->with([
                'success' => 'Transaksi berhasil dibuat!',
                'transaksi_id' => $transaksi->id,
            ]);
        } catch (Throwable $e) {
            // Jika terjadi error, rollback semua perubahan database
            DB::rollBack();

            // Tampilkan pesan error ke pengguna
            // Log error untuk developer
            Log::error('Gagal membuat transaksi: ' . $e->getMessage());
            return back()->withInput()->with('error', 'Gagal membuat transaksi: ' . $e->getMessage());
        }

    }

    /**
     * Print receipt for a given order (Browser Print)
     */
    public function print(Transaksi $transaksi)
    {
        // Load relasi untuk print
        $transaksi->load(['detailTransaksis.menu', 'karyawan', 'user']);

        return view('print.receipt', [
            'transaksi' => $transaksi,
        ]);
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
