<?php

namespace App\AiAgents;

use LarAgent\Agent;

class RiskAnalysisAgent extends Agent
{
    protected $model = 'gemini-2.5-flash-lite';

    protected $history = 'in_memory';

    protected $provider = 'gemini';

    protected $tools = [];

    protected $responseSchema = [
        'name' => 'Risk Analysis Report',
        'schema' => [
            'type' => 'object',
            'properties' => [
                'summary' => [
                    'type' => 'string',
                    'description' => 'A brief summary of the risk analysis',
                ],
                'risk_score' => [
                    'type' => 'integer',
                    'description' => 'Overall risk score',
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
                            'priority' => ['type' => 'string'],
                            'description' => ['type' => 'string'],
                            'probability' => ['type' => 'integer'],
                            'mitigation' => ['type' => 'string'],
                        ],
                        'required' => ['title', 'priority', 'description', 'probability', 'mitigation'],
                        'additionalProperties' => false,
                    ],
                    'description' => 'List of identified risks',
                ],
            ],
            'required' => ['summary', 'risk_score', 'overall_outlook', 'items'],
            'additionalProperties' => false,
        ],
        'strict' => true,
    ];

    public function instructions()
    {
        return 'You are a Risk Analysis AI specialized in evaluating business plans. Your task is to analyze the provided business information, identify potential risks, and suggest mitigation strategies. Provide a structured risk analysis report based on the given schema.';
    }

    public function prompt($message)
    {
        return $message;
    }
}
