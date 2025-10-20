<?php

namespace App\AiAgents;

use LarAgent\Agent;

class InvestementAnalysisAgent extends Agent
{
    protected $model = 'gemini-2.5-flash-lite';

    protected $history = 'in_memory';

    protected $provider = 'gemini';

    protected $tools = [];

    protected $responseSchema = [
        'name' => 'Investment Analysis Report',
        'schema' => [
            'type' => 'object',
            'properties' => [
                'needsInvestment' => [
                    'type' => 'boolean',
                    'description' => 'Whether the business needs investment',
                ],
                'confidence' => [
                    'type' => 'integer',
                    'minimum' => 0,
                    'maximum' => 100,
                    'description' => 'Confidence score (0-100) for the investment recommendation',
                ],
                'reason' => [
                    'type' => 'string',
                    'description' => 'Summary of why investment is needed or not',
                ],
                'approximateAmount' => [
                    'type' => 'string',
                    'description' => 'Estimated investment amount required (e.g., "$2,000,000 - $3,500,000")',
                ],
                'rationale' => [
                    'type' => 'array',
                    'items' => ['type' => 'string'],
                    'description' => 'Key financial and strategic reasons supporting the recommendation',
                ],
                'useOfFunds' => [
                    'type' => 'array',
                    'items' => ['type' => 'string'],
                    'description' => 'Breakdown of how the investment will be used',
                ],
                'pros' => [
                    'type' => 'array',
                    'items' => ['type' => 'string'],
                    'minItems' => 2,
                    'maxItems' => 6,
                    'description' => 'List of pros accepting or declining an investment based on the needsInvestment result in the business',
                ],
                'cons' => [
                    'type' => 'array',
                    'items' => ['type' => 'string'],
                    'minItems' => 2,
                    'maxItems' => 6,
                    'description' => 'List of cons accepting or declining an investment based on the needsInvestment result in the business',
                ],
            ],
            'required' => [
                'needsInvestment',
                'confidence',
                'reason',
                'approximateAmount',
                'rationale',
                'useOfFunds',
                'pros',
                'cons',
            ],
            'additionalProperties' => false,
        ],
        'strict' => true,
    ];

    public function instructions()
    {
        return 'You are an Investment Analysis AI specialized in evaluating business based on the financial status(heavly) and the business information. Your task is to analyze the provided business information and determine whether the business requires investment. Provide a structured investment analysis report based on the given schema.';
    }

    public function prompt($message)
    {
        return $message;
    }
}
