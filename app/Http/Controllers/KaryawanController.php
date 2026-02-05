<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KaryawanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Ambil User dengan role 'karyawan' atau 'kasir'
        $karyawans = User::whereIn('role', ['karyawan', 'kasir'])
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'nama' => $user->name,
                    'role' => $user->role,
                    'no_telepon' => $user->no_telepon,
                    'email' => $user->email,
                ];
            });

        return Inertia::render('karyawan', [
            'karyawans' => $karyawans
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
            'no_telepon' => [
                'required',
                'regex:/^[0-9+() -]+$/',
                'max:20',
                // Cek unik di tabel users
                'unique:users,no_telepon' 
            ],
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
        ]);

        // Buat user langsung sebagai data karyawan
        User::create([
            'name' => $validated['nama'],
            'email' => $validated['email'],
            // Default role bisa diset 'kasir' atau 'karyawan' sesuai kebutuhan
            'role' => 'kasir', 
            'no_telepon' => $validated['no_telepon'],
            'password' => Hash::make($validated['password']),
        ]);

        return back()->with('success', 'Karyawan baru berhasil ditambahkan!');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $karyawan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $karyawan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     * Note: Route model binding might need adjustment to bind {karyawan} to User
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        
        $validated = $request->validate([
            'nama' => 'sometimes|required|max:255',
            'no_telepon' => [
                'sometimes',
                'required',
                'regex:/^[0-9+() -]+$/',
                'max:20',
                'unique:users,no_telepon,' . $user->id,
            ],
            'email' => [
                'sometimes',
                'required',
                'email',
                'unique:users,email,' . $user->id,
            ],
            'password' => 'nullable|string|min:8',
        ]);

        $userData = [
            'name' => $validated['nama'] ?? $user->name,
            'email' => $validated['email'] ?? $user->email,
            'no_telepon' => $validated['no_telepon'] ?? $user->no_telepon,
        ];

        if (!empty($validated['password'])) {
            $userData['password'] = Hash::make($validated['password']);
        }

        $user->update($userData);

        return back()->with('success', 'Data karyawan berhasil diupdate!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return back()->with('success', 'Data karyawan berhasil dihapus!');
    }
}
