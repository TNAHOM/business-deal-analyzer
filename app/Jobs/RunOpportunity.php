<?php

namespace App\Jobs;

use App\AiAgents\OpportunityAnalysisAgent;
use App\Enums\AnalysisType;
use App\Models\Analysis;
use App\Models\Business;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class RunOpportunity implements ShouldQueue
{
    use Queueable;

    protected $business;

    protected $updateBusinessInfo = null;

    /**
     * Create a new job instance.
     */
    public function __construct(Business $business, $updateBusinessInfo = null)
    {
        $this->business = $business;
        $this->updateBusinessInfo = $updateBusinessInfo;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {

        Log::info("Starting Opportunity Analysis for business #{$this->business->id}");

        try {

            $agent = new OpportunityAnalysisAgent(key: 'opportunity_analysis_agent');

            $prompt = "
                Analyze the following business in detail for opportunity analysis and respond in JSON format that matches your schema.

                Business Name: {$this->business->name}
                Sector: {$this->business->sector}
                Description: {$this->business->description}
                Financials: ".json_encode($this->business->financials).'
                NewUpdatedInfoAboutBusiness: '.($this->updateBusinessInfo ? json_encode($this->updateBusinessInfo) : 'No new updates').'

                Provide business opportunities, and a general summary.
            ';

            $response = $agent->message(message: $prompt)->respond();

            Log::info('Opportunity AI Response Received', ['response' => $response]);

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

            Log::info('Storing Opportunity Analysis Result', ['updateBusinessInfo' => $this->updateBusinessInfo]);

            if ($this->updateBusinessInfo) {
                Analysis::update([
                    'business_id' => $this->business->id,
                    'type' => AnalysisType::OPPORTUNITY,
                ], [
                    'data' => $responseArray,
                ]);
            } else {

                Analysis::create([
                    'business_id' => $this->business->id,
                    'type' => AnalysisType::OPPORTUNITY,
                    'data' => $responseArray,
                ]);
            }
        } catch (\Exception $e) {
            Log::error('Error during Opportunity Analysis', ['error' => $e->getMessage()]);
        }
    }
}
