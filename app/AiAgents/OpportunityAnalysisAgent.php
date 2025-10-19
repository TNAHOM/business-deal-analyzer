<?php

namespace App\AiAgents;

use LarAgent\Agent;

class OpportunityAnalysisAgent extends Agent
{
    protected $model = 'gemini-2.5-flash-lite';

    protected $history = 'in_memory';

    protected $provider = 'gemini';

    protected $tools = [];

    protected $responseSchema = require app_path('Utils/ResponseSchema.php');

    public function instructions()
    {
        return 'You are a Opportunity Analysis AI specialized in evaluating business plans. Your task is to analyze the provided business information, identify potential opportunities, and suggest recommended actions. Provide a structured opportunity analysis report based on the given schema.';
    }

    public function prompt($message)
    {
        return $message;
    }
}
