<?php

namespace App\Jobs;

use App\AiAgents\RiskAnalysisAgent;
use App\Enums\AnalysisType;
use App\Models\Analysis;
use App\Models\Business;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;

class RunRiskAnalytics implements ShouldQueue
{
    protected $business;

    /**
     * Create a new job instance.
     */
    public function __construct(Business $business, $businessInfo = null)
    {
        $this->business = $business;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Log::info("Starting Risk & Opportunity Analysis for business #{$this->business->id}");

        try {

            $agent = new RiskAnalysisAgent(key: 'risk_analysis_agent');

            $prompt = "
                Analyze the following business in detail for risk analysis and respond in JSON format that matches your schema.
                
                Business Name: {$this->business->name}
                Sector: {$this->business->sector}
                Description: {$this->business->description}
                Financials: ".json_encode($this->business->financials).'

                Provide business risks, and a general summary.
            ';

            $response = $agent->message(message: $prompt)->respond();

            Log::info('✅ AI Response Received', ['response' => $response]);

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

            Analysis::updateOrCreate(
                [
                    'business_id' => $this->business->id,
                    'type' => AnalysisType::RISK,
                ],
                [
                    'data' => $responseArray,
                ]
            );

            Log::info("✅ Analysis successfully saved for business #{$this->business->id}");

        } catch (\Exception $e) {
            Log::error("Error during risk analysis: {$e->getMessage()}");
        }

    }
}
