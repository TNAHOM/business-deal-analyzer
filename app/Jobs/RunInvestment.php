<?php

namespace App\Jobs;

use App\AiAgents\InvestementAnalysisAgent;
use App\Enums\AnalysisType;
use App\Models\Analysis;
use App\Models\Business;
use App\Utils\ResponseParser;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class RunInvestment implements ShouldQueue
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

        Log::info("Starting Investment Analysis for business #{$this->business->id}");

        try {

            $agent = new InvestementAnalysisAgent(key: 'investment_analysis_agent');

            $prompt = "
                Analyze the following business in detail for investment analysis and respond in JSON format that matches your schema.

                Business Name: {$this->business->name}
                Sector: {$this->business->sector}
                Description: {$this->business->description}
                Financials: ".json_encode($this->business->financials).'
                NewUpdatedInfoAboutBusiness: '.($this->updateBusinessInfo ? json_encode($this->updateBusinessInfo) : 'No new updates').'

                Provide Investment analysis for the business, and a general summary.
            ';

            $response = $agent->message(message: $prompt)->respond();

            Log::info('Investment AI Response Received', ['response' => $response]);

            $responseArray = ResponseParser::toArray($response);

            Log::info('Storing Investment Analysis Result', ['updateBusinessInfo' => $this->updateBusinessInfo]);

            if ($this->updateBusinessInfo) {
                Analysis::update([
                    'business_id' => $this->business->id,
                    'type' => AnalysisType::INVESTMENT,
                ], [
                    'data' => $responseArray,
                ]);
            } else {

                Analysis::create([
                    'business_id' => $this->business->id,
                    'type' => AnalysisType::INVESTMENT,
                    'data' => $responseArray,
                ]);
            }
        } catch (\Exception $e) {
            Log::error('Error during Investment Analysis', ['error' => $e->getMessage()]);
        }
    }
}
