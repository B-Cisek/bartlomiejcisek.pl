<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UploadFileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/phpinfo', fn() => phpinfo())->middleware(['auth', 'admin'])->name('phpInfo');
Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/storage', [UploadFileController::class, 'index'])->name('storage');
    Route::post('/storage', [UploadFileController::class, 'store'])->name('storage.store');
});

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/users', fn() => Inertia::render('Users'))->name('users');
});



require __DIR__.'/auth.php';
