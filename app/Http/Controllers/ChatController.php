<?php

namespace App\Http\Controllers;

use App\AiAgents\BusinessAnalyzerAgent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("Chat/Chat");
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
            'message' => 'required|string',
        ]);

        $userMessage = $validated['message'];

        $instruction = "You are the Business Deal Analyzer AI. Your role is to help users analyze their business problems, assess risks, opportunities, and whether investments are worth taking. Respond concisely and conversationally.";
        // use this key for onl y testing puposes, try to add the key in config or .env
        // for the next time improve this part
        $agent = new BusinessAnalyzerAgent(key: "business_analyzer", instruction: $instruction);

        $response = $agent->message($userMessage);

        return response()->json([
            'user_message' => $userMessage,
            'agent_response' => $response->respond()
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
