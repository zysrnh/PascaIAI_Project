<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Auto-ensure storage framework directories exist (mencegah error tempnam() di hosting)
foreach ([
    __DIR__.'/../storage/framework/views',
    __DIR__.'/../storage/framework/cache/data',
    __DIR__.'/../storage/framework/sessions',
    __DIR__.'/../storage/logs',
    __DIR__.'/../bootstrap/cache',
] as $sDir) {
    if (!is_dir($sDir)) {
        @mkdir($sDir, 0777, true);
    }
    @chmod($sDir, 0777);
}

// Bersihkan cache bootstrap config.php jika ada (mencegah issue Target class [view] does not exist)
if (file_exists($cachedConfig = __DIR__.'/../bootstrap/cache/config.php')) {
    @unlink($cachedConfig);
}

// Auto-fix permissions folder build & assets agar tidak 403 Forbidden
$buildDir = __DIR__.'/build';
if (is_dir($buildDir)) {
    @chmod($buildDir, 0755);
    $assetsDir = $buildDir.'/assets';
    if (is_dir($assetsDir)) {
        @chmod($assetsDir, 0755);
        foreach (glob($assetsDir.'/*') as $f) {
            @chmod($f, 0644);
        }
    }
    if (file_exists($m = $buildDir.'/manifest.json')) {
        @chmod($m, 0644);
    }
}

// Register the Composer autoloader...
require __DIR__.'/../vendor/autoload.php';

// Bootstrap Laravel and handle the request...
/** @var Application $app */
$app = require_once __DIR__.'/../bootstrap/app.php';

$app->handleRequest(Request::capture());
