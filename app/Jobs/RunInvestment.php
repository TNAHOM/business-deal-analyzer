<?php

namespace App\Jobs;

use App\Enums\AnalysisType;
use App\Models\Analysis;
use App\Models\Business;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class RunInvestment implements ShouldQueue
{
    use Queueable;

    protected $business;

    protected $updateBusinessInfo = null;

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
        $investmentData = [
            'roi' => rand(5, 20), // Random ROI percentage
            'valuation' => rand(100000, 1000000), // Random valuation
            'recommendation' => 'Hold', // Placeholder recommendation
        ];

        Analysis::updateOrCreate([
            'business_id' => $this->business->id,
            'type' => AnalysisType::INVESTMENT,
        ], [
            'data' => $investmentData,
        ]);

    }
}
