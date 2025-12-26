<?php

use App\Http\Controllers\Data\Users;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/data/users', [Users::class, 'index'])->name('data.users');
    Route::post('/save/data/users', [Users::class, 'save'])->name('save.data.users');
    Route::put('/update/data/users/{id}', [Users::class, 'update'])->name('update.data.users');
    Route::delete('/destroy/data/users/{id}', [Users::class, 'destroy'])->name('delete.data.users');

});

require __DIR__.'/settings.php';
