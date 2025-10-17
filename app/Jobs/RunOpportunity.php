<?php

namespace App\Jobs;

use App\Enums\AnalysisType;
use App\Models\Analysis;
use App\Models\Business;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class RunOpportunity implements ShouldQueue
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
        $ai_analysis = [
            'summary' => 'The business shows strong potential for growth through diversification and technology adoption.',
            'opportunity_score' => 78,
            'overall_outlook' => 'High Opportunity',
            'items' => [
                [
                    'title' => 'Digital Expansion',
                    'potential' => 'High',
                    'description' => 'Adopting e-commerce and digital marketing could expand customer reach significantly.',
                    'probability' => 88,
                    "recommended_actions" => "Invest in a user-friendly e-commerce platform and leverage social media marketing."

                ],
                [
                    'title' => 'Product Diversification',
                    'potential' => 'Medium',
                    'description' => 'Introducing complementary product lines could enhance brand strength and revenue streams.',
                    'probability' => 41,
                    "recommended_actions" => "Conduct market research to identify viable complementary products and pilot new offerings."

                ],
                [
                    'title' => 'Strategic Partnerships',
                    'potential' => 'Low',
                    'description' => 'Collaborations with regional partners can improve distribution efficiency.',
                    'probability' => 75,
                    "recommended_actions" => "Identify and approach potential partners for distribution agreements to enhance market presence."
                ],
            ]
        ];
        Analysis::create([
            'business_id' => $this->business->id,
            'type' => AnalysisType::OPPORTUNITY,
            'data' => $ai_analysis,
        ]);
    }
}
