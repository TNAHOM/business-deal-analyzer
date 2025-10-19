<?php

namespace App\Http\Controllers;

use App\AiAgents\BusinessAnalyzerAgent;
use App\Jobs\RunInvestment;
use App\Jobs\RunOpportunity;
use App\Jobs\RunRiskAnalytics;
use App\Jobs\RunSolution;
use App\Models\Business;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ChatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Chat/Chat');
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
        $userId = Auth::id();
        $validated = $request->validate([
            'message' => 'required|string',
        ]);

        $userMessage = $validated['message'];
        $businessData = Business::where('user_id', $userId)->first();

        // use this key for onl y testing puposes, try to add the key in config or .env
        // for the next time improve this part
        $agent = new BusinessAnalyzerAgent(key: 'business_analyzer', directUserQuestion: $userMessage);

        $finalInfo = $userMessage.' '.json_encode($businessData);

        $response = $agent->message($finalInfo)->respond();

        if ($response['assignTo'] === 'risk') {
            Log::info('Analyzing risk based on chat response.', ['final_info' => $finalInfo, 'response' => $response]);

            RunRiskAnalytics::dispatch(updateBusinessInfo: $finalInfo, business: $businessData);
        } elseif ($response['assignTo'] === 'opportunity') {
            Log::info('Analyzing opportunity based on chat response.', ['final_info' => $finalInfo, 'response' => $response]);
            RunOpportunity::dispatch(updateBusinessInfo: $finalInfo, business: $businessData);
        } elseif ($response['assignTo'] === 'investment') {
            Log::info('Analyzing investment based on chat response.', ['final_info' => $finalInfo, 'response' => $response]);

            RunInvestment::dispatch(updateInvestment: $finalInfo, business: $businessData);
        } elseif ($response['assignTo'] === 'solution') {
            Log::info('Storing solution based on chat response.', ['final_info' => $finalInfo, 'response' => $response]);

            RunSolution::dispatch(updateSolution: $finalInfo, business: $businessData);
        }

        return response()->json([
            'user_message' => $userMessage,
            'agent_response' => $response,
        ]);

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
