<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckKasirRole
{
    /**
     * Handle an incoming request.
     * Middleware ini membatasi kasir hanya bisa mengakses halaman POS
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();
        
        // Jika user adalah kasir dan mencoba akses selain POS
        if ($user && $user->role === 'kasir') {
            $currentRoute = $request->route()->getName();
            
            // Daftar route yang diizinkan untuk kasir
            $allowedRoutes = [
                'pos.index',
                'pos.store',
                'pos.show',
                'pos.create',
                'logout', // Izinkan logout
            ];
            
            // Jika kasir mencoba akses route yang tidak diizinkan
            if (!in_array($currentRoute, $allowedRoutes)) {
                if ($request->wantsJson()) {
                    return response()->json(['message' => 'Unauthorized'], 403);
                }
                return redirect()->route('pos.index')
                    ->with('error', 'Anda hanya memiliki akses ke halaman POS.');
            }
        }

        return $next($request);
    }
}
