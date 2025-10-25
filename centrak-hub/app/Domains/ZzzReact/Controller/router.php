<?php declare(strict_types=1);

use Illuminate\Support\Facades\Route;

// Serve React app under /app prefix to avoid breaking existing UI
Route::get('/app', function () {
    $index = public_path('app/index.html');
    if (file_exists($index)) {
        return response()->file($index);
    }
    return response('React app not built. Run frontend build.', 503);
});

Route::get('/app/{any}', function () {
    $index = public_path('app/index.html');
    if (file_exists($index)) {
        return response()->file($index);
    }
    return abort(404);
})->where('any', '.*');
