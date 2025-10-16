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
            'summary' => 'Risk analysis completed using mock data.',
            'risks' => [
                'Market volatility in the sector',
                'High operational costs',
                'Dependency on a single supplier'
            ],
            'risk_level' => 'medium'
        ];

        Analysis::create([
            'business_id' => $this->business->id,
            'type' => AnalysisType::RISK,
            'data' => $ai_analysis,
        ]);

        Log::info("Risk Analysis completed for Business ID: {$this->business->id} with data: " . json_encode($ai_analysis));
    }
}
