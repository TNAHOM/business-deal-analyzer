<?php

namespace App\Jobs;

use App\Models\Analysis;
use App\Models\Business;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use App\Enums\AnalysisType;

class RunInvestment implements ShouldQueue
{
    use Queueable;

    protected $business;

    public function __construct(Business $business)
    {
        $this->business = $business;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $investmentData = [
            'roi' => rand(5, 20), // Random ROI percentage
            'valuation' => rand(100000, 1000000), // Random valuation
            'recommendation' => 'Hold', // Placeholder recommendation
        ];

        Analysis::create([
            'business_id' => $this->business->id,
            'data' => $investmentData,
            'type' => AnalysisType::INVESTMENT,
        ]);
        
    }
}
