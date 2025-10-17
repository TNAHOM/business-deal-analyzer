<?php

namespace App\Http\Controllers;

use App\Enums\AnalysisType;
use App\Models\Analysis;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RiskOpportunityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $business = Auth::user()->business;

        $riskAnalysis = Analysis::where("business_id", $business->id)->where('type', AnalysisType::RISK)->latest('updated_at')->first();
        $opportunityAnalysis = Analysis::where("business_id", $business->id)->where('type', AnalysisType::OPPORTUNITY)->latest('updated_at')->first();

        return Inertia::render('Analysis/RiskOpportunity', [
            'riskAnalysis' => $riskAnalysis,
            'opportunityAnalysis' => $opportunityAnalysis,
        ]);
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
