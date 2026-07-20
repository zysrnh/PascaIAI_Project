<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$p = App\Models\PengaturanHalaman::where('halaman', 'dosen')->first();
$p->deskripsi = 'DAWDAWDA';
$p->save();
echo "Saved!";
