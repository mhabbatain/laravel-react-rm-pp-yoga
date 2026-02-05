<?php

namespace App\Providers;

use App\Http\Responses\LoginResponse;
use App\Http\Responses\LogoutResponse;
use Illuminate\Support\ServiceProvider;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;
use Laravel\Fortify\Contracts\LogoutResponse as LogoutResponseContract;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Custom login response untuk redirect berdasarkan role
        $this->app->singleton(LoginResponseContract::class, LoginResponse::class);
        
        // Custom logout response untuk redirect ke halaman login
        $this->app->singleton(LogoutResponseContract::class, LogoutResponse::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
