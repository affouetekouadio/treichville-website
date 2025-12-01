<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Frontend/Home');
})->name('home');

Route::get('/contact', function () {
    return Inertia::render('Frontend/Contact');
})->name('contact');

Route::get('/actualites', function () {
    return Inertia::render('Frontend/Actualites/Index');
})->name('actualites.index');

Route::get('/evenements', function () {
    return Inertia::render('Frontend/Evenements/Index');
})->name('evenements.index');

Route::get('/services', function () {
    return Inertia::render('Frontend/Services/Index');
})->name('services.index');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
