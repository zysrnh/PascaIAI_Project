<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$request = Illuminate\Http\Request::create('/admin/fakultas/dosen-pengaturan', 'POST', [
    'banner_image' => null,
    'deskripsi' => 'DAWDAWDA'
]);
$app->instance('request', $request);
$response = $app->handle($request);
echo "Status: " . $response->getStatusCode() . "\n";
if ($response->getStatusCode() == 302) {
    echo "Redirect: " . $response->headers->get('Location') . "\n";
    $session = $request->session();
    if ($session->has('errors')) {
        echo "Errors:\n";
        print_r($session->get('errors')->getBag('default')->getMessages());
    }
} else {
    echo $response->getContent();
}
