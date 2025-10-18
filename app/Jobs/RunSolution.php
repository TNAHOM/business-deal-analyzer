<?php

namespace App\Jobs;

use App\AiAgents\SolutionAnalysisAgent;
use App\Models\Analysis;
use App\Models\Business;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class RunSolution implements ShouldQueue
{
    use Queueable;

    protected $business;

    /**
     * Create a new job instance.
     */
    public function __construct(Business $business)
    {
        $this->business = $business;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Log::info("Starting Solution Analysis for business #{$this->business->id}");

        try {

            $agent = new SolutionAnalysisAgent(key: 'solution_analysis_agent');

            $prompt = "
                Analyze the following business in detail for solution recommendations and respond in JSON format that matches your schema.

                Business Name: {$this->business->name}
                Sector: {$this->business->sector}
                Description: {$this->business->description}
                Problems: {$this->business->problems}.
                Financials: ".json_encode($this->business->financials).'

                Provide recommended solutions, and a general summary.
            ';

            $response = $agent->message(message: $prompt)->respond();

            Log::info('Solution AI Response Received', ['response' => $response]);

            if (is_string($response)) {
                $decoded = json_decode($response, true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    $responseArray = $decoded;
                } else {
                    $responseArray = ['raw' => $response];
                }
            } elseif (is_array($response)) {
                $responseArray = $response;
            } elseif (is_object($response)) {
                $responseArray = json_decode(json_encode($response), true);
            } else {
                $responseArray = ['raw' => (string) $response];
            }

            Analysis::create([
                'business_id' => $this->business->id,
                'type' => 'solution',
                'data' => $responseArray,
            ]);

        } catch (\Exception $e) {
            Log::error("Error during Solution Analysis for business #{$this->business->id}: ".$e->getMessage());
        }
    }
}
