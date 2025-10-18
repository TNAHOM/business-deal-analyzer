<?php

namespace App\AiAgents;

use LarAgent\Agent;

class SolutionAnalysisAgent extends Agent
{
    protected $model = 'gemini-2.5-flash-lite';

    protected $history = 'in_memory';

    protected $provider = 'gemini';

    protected $tools = [];

    protected $responseSchema = [
        'name' => 'Retention Problem Solution Report',
        'schema' => [
            'type' => 'object',
            'properties' => [
                'problemStatement' => [
                    'type' => 'object',
                    'properties' => [
                        'title' => ['type' => 'string'],
                        'description' => ['type' => 'string'],
                        'impact' => ['type' => 'string'],
                        'urgency' => ['type' => 'string'],
                        'affectedAreas' => [
                            'type' => 'array',
                            'items' => ['type' => 'string'],
                        ],
                    ],
                    'required' => ['title', 'description', 'impact', 'urgency', 'affectedAreas'],
                    'additionalProperties' => false,
                ],
                'rootCauses' => [
                    'type' => 'array',
                    'items' => ['type' => 'string'],
                    'description' => 'List of identified root causes',
                ],
                'solutions' => [
                    'type' => 'array',
                    'items' => [
                        'type' => 'object',
                        'properties' => [
                            'id' => ['type' => 'string'],
                            'title' => ['type' => 'string'],
                            'category' => ['type' => 'string'],
                            'priority' => ['type' => 'string'],
                            'effort' => ['type' => 'string'],
                            'timeline' => ['type' => 'string'],
                            'cost' => ['type' => 'string'],
                            'impact' => ['type' => 'string'],
                            'description' => ['type' => 'string'],
                            'steps' => [
                                'type' => 'array',
                                'items' => ['type' => 'string'],
                            ],
                            'expectedOutcomes' => [
                                'type' => 'array',
                                'items' => ['type' => 'string'],
                            ],
                            'risks' => [
                                'type' => 'array',
                                'items' => ['type' => 'string'],
                            ],
                        ],
                        'required' => [
                            'id', 'title', 'category', 'priority', 'effort', 'timeline', 'cost', 'impact', 'description', 'steps', 'expectedOutcomes', 'risks',
                        ],
                        'additionalProperties' => false,
                    ],
                    'description' => 'List of proposed solutions',
                ],
            ],
            'required' => ['problemStatement', 'rootCauses', 'solutions'],
            'additionalProperties' => false,
        ],
        'strict' => true,
    ];

    public function instructions()
    {
        return "Define your agent's instructions here.";
    }

    public function prompt($message)
    {
        return $message;
    }
}
