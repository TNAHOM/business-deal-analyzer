<?php

use App\Http\Controllers\BusinessController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RiskOpportunityController;
use App\Http\Controllers\SolutionController;
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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/analysis/risk-opportunity', [RiskOpportunityController::class, 'index'])
        ->name('analysis.risk-opportunity');

    Route::get('/chat', [ChatController::class, 'index'])->name('chat.index');
    Route::post('/chat', [ChatController::class, 'store'])->name('chat.store');

    Route::get('/solutions', [SolutionController::class, 'index'])->name('solutions.index');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/onboarding', [BusinessController::class, 'index'])->name('onboarding.index');
    Route::post('/onboarding', [BusinessController::class, 'store'])->name('onboarding.store');
});

require __DIR__.'/auth.php';
