<?php

namespace App\AiAgents;

use LarAgent\Agent;

class OpportunityAnalysisAgent extends Agent
{
    protected $model = 'gemini-2.5-flash-lite';

    protected $history = 'in_memory';

    protected $provider = 'gemini';

    protected $tools = [];

    protected $responseSchema = [
        'name' => 'Opportunity Analysis Report',
        'schema' => [
            'type' => 'object',
            'properties' => [
                'summary' => [
                    'type' => 'string',
                    'description' => 'A brief summary of the opportunity analysis',
                ],
                'opportunity_score' => [
                    'type' => 'integer',
                    'description' => 'Overall opportunity score',
                ],
                'overall_outlook' => [
                    'type' => 'string',
                    'description' => 'General outlook based on the analysis',
                ],
                'items' => [
                    'type' => 'array',
                    'items' => [
                        'type' => 'object',
                        'properties' => [
                            'title' => ['type' => 'string'],
                            'potential' => ['type' => 'string'],
                            'description' => ['type' => 'string'],
                            'probability' => ['type' => 'integer'],
                            'recommended_actions' => ['type' => 'string'],
                        ],
                        'required' => [
                            'title',
                            'potential',
                            'description',
                            'probability',
                            'recommended_actions',
                        ],
                        'additionalProperties' => false,
                    ],
                    'description' => 'List of identified opportunities',
                ],
            ],
            'required' => ['summary', 'opportunity_score', 'overall_outlook', 'items'],
            'additionalProperties' => false,
        ],
        'strict' => true,
    ];

    public function instructions()
    {
        return 'You are a Opportunity Analysis AI specialized in evaluating business plans. Your task is to analyze the provided business information, identify potential opportunities, and suggest recommended actions. Provide a structured opportunity analysis report based on the given schema.';
    }

    public function prompt($message)
    {
        return $message;
    }
}
