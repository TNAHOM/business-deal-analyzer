<?php

namespace App\Jobs;

use App\Enums\AnalysisType;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use App\Models\Analysis;
use App\Models\Business;
use Illuminate\Support\Facades\Log;

class RunRiskAnalytics implements ShouldQueue
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
        Log::info("Risk Analysis started for Business ID: {$this->business->id}");
        $ai_analysis = [
            'summary' => 'The business is currently in a moderate-risk environment. Market and operational challenges exist but are manageable.',
            'risk_score' => 62,
            'overall_outlook' => 'Moderate Risk',
            'items' => [
                [
                    'title' => 'Market Volatility',
                    'priority' => 'High',
                    'description' => 'Rapid price fluctuations in the market may affect revenue stability.',
                    'probability' => 88,
                    'mitigation' => 'Implement hedging strategies and diversify product offerings to reduce exposure to market swings.',
                ],
                [
                    'title' => 'Supplier Dependency',
                    'priority' => 'Medium',
                    'description' => 'The business relies heavily on a single supplier which could impact operations if disrupted.',
                    'probability' => 75,
                    'mitigation' => 'Identify and qualify alternative suppliers to ensure supply chain resilience.',
                ],
                [
                    'title' => 'Operational Cost Rise',
                    'priority' => 'Low',
                    'description' => 'Energy and logistics costs are gradually increasing, but manageable within the current margin.',
                    'probability' => 60,
                    'mitigation' => 'Optimize energy usage and renegotiate logistics contracts to control cost increases.',
                ],
            ]
        ];

        Analysis::create([
            'business_id' => $this->business->id,
            'type' => AnalysisType::RISK,
            'data' => $ai_analysis,
        ]);

        Log::info("Risk Analysis completed for Business ID: {$this->business->id} with data: " . json_encode($ai_analysis));
    }
}
