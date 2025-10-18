<?php

namespace App\AiAgents;

use LarAgent\Agent;

class BusinessAnalyzerAgent extends Agent
{
    protected $model = 'gemini-2.0-flash-lite';

    protected $history = 'in_memory';

    protected $provider = 'gemini';

    protected $tools = [];

    protected $instruction;

    public function __construct($key, string $instruction = 'You are the Business Deal Analyzer AI.')
    {
        parent::__construct($key);
        $this->instruction = $instruction;
    }

    public function instructions()
    {
        return $this->instruction;
    }

    public function prompt($message)
    {
        return $message;
    }
}
