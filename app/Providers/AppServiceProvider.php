<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        RateLimiter::for('contact-form', function (Request $request) {
            return Limit::perMinute(5)
                ->by($request->ip())
                ->response(function (Request $request, array $headers) {
                    if ($request->expectsJson()) {
                        return response()->json([
                            'message' => 'Trop de tentatives. Réessayez plus tard.',
                        ], 429, $headers);
                    }

                    return back()
                        ->withErrors([
                            'rate_limit' => 'Trop de tentatives. Réessayez dans quelques minutes.',
                        ])
                        ->withInput()
                        ->setStatusCode(429);
                });
        });
    }
}
