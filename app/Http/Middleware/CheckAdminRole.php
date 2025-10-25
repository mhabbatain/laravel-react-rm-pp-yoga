<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckAdminRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Cek apakah user sudah login DAN rolenya 'admin'
        if (!Auth::check() || Auth::user()->role !== 'admin') {
            // Jika bukan admin, redirect ke halaman POS (atau halaman lain yang diizinkan)
            // Anda bisa juga redirect ke halaman 'unauthorized' atau abort(403)
            return redirect()->route('pos.index')->with('error', 'Anda tidak memiliki akses ke halaman ini.');
        }

        // Jika admin, lanjutkan request
        return $next($request);
    }
}
