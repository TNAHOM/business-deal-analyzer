<?php

namespace App\Http\Controllers;

use App\Jobs\RunRiskAnalytics;
use App\Models\Business;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class BusinessController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $business = Auth::user()->business;
        if ($business) {
            return redirect()->route('chat.index');
        }

        return Inertia::render('Onboarding/Onboarding');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'sector' => 'required|string|max:255',
            'financials' => 'nullable|array',
        ]); 

        $business = new Business($validated);
        $business->user()->associate(Auth::user());
        $business->save();

        Log::info('Business created, starting analysis jobs...');

        (new RunRiskAnalytics($business))->handle();

        return redirect()->route('chat.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Business $business)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Business $business)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Business $business)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Business $business)
    {
        //
    }
}
