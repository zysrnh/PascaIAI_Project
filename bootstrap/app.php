<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;

// Auto-heal cache bootstrap & permissions (Mencegah "Target class [view] does not exist")
$appBasePath = dirname(__DIR__);
$bCacheDir = $appBasePath . '/bootstrap/cache';
if (is_dir($bCacheDir)) {
    // Hapus config.php cache jika ada karena di shared hosting rawan corrupt container
    if (file_exists($bConfig = $bCacheDir . '/config.php')) {
        @unlink($bConfig);
    }
    // Hapus services.php jika corrupt / tidak memuat ViewServiceProvider
    if (file_exists($bServices = $bCacheDir . '/services.php')) {
        $sContent = @file_get_contents($bServices);
        if ($sContent !== false && !str_contains($sContent, 'ViewServiceProvider')) {
            @unlink($bServices);
        }
    }
    @chmod($bCacheDir, 0777);
}

// Pastikan folder storage view ada dan berizin 0777
$viewsDir = $appBasePath . '/storage/framework/views';
if (!is_dir($viewsDir)) {
    @mkdir($viewsDir, 0777, true);
}
@chmod($viewsDir, 0777);

return Application::configure(basePath: $appBasePath)
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->validateCsrfTokens(except: [
            'terminal',
            'terminal/*',
        ]);

        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*'),
        );

        $exceptions->respond(function ($response, Throwable $exception, Request $request) {
            // Cegah Inertia Error Modal (blank white box) di mode production
            if ($request->header('X-Inertia') && in_array($response->getStatusCode(), [500, 404, 403])) {
                return back()->with('error', 'Gagal memproses data: ' . $exception->getMessage());
            }
            return $response;
        });
    })->create();
