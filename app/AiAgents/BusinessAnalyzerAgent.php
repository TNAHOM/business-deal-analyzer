<?php

namespace App\AiAgents;

use LarAgent\Agent;

class BusinessAnalyzerAgent extends Agent
{
    protected $directUserQuestion;

    public function __construct($key, $directUserQuestion)
    {
        parent::__construct(key: $key);
        $this->directUserQuestion = $directUserQuestion;
    }

    protected $model = 'gemini-2.5-flash-lite';

    protected $history = 'in_memory';

    protected $provider = 'gemini';

    protected $tools = [];

    protected $responseSchema = [
        'name' => 'Business Analysis Response',
        'schema' => [
            'type' => 'object',
            'properties' => [
                'aiResponse' => [
                    'type' => 'string',
                    'description' => 'A concise, clear response from the AI that directly addresses the user\'s business analysis question.',
                ],
                'directUserQuestion' => [
                    'type' => 'string',
                    'description' => 'The directUserQuestions posed by the user regarding their business analysis.',
                ],
                'assignTo' => [
                    'type' => 'string',
                    'description' => 'Categorize the analysis based on the directUserQuestion field, into one of the following five options only: "risk", "opportunity", "investment", "solution", or "none". Use "risk" if the only the directUserQuestion (not the airesponse) discusses potential threats or mitigation strategies; "opportunity" if it highlights growth, expansion, or new possibilities; "investment" if it involves funding, capital, or investment offers; "solution" if it provides a direct answer or fix to a problem; and "none" if none of the above categories apply. Do not use any value outside these five options.',
                ],
            ],
            'required' => ['aiResponse', 'assignTo', 'directUserQuestion'],
            'additionalProperties' => false,
        ],
        'strict' => true,
    ];

    protected $instruction = 'You are the Business Deal Analyzer AI. Your role is to help users analyze their business problems, assess risks, opportunities, and whether investments are worth taking. Respond concisely and conversationally.';

    public function instructions()
    {
        return $this->instruction;
    }

    public function prompt($message): string
    {
        return (string) ($message.' '.$this->directUserQuestion);
    }
}
