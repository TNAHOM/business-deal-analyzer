<?php

namespace App\Models;

use App\Enums\AnalysisType;
use Illuminate\Database\Eloquent\Model;

class Analysis extends Model
{
    protected $fillable = ['business_id', 'data', 'type'];

    protected $casts = [
        'data' => 'array',
        'type' => AnalysisType::class,
    ];

    public function business()
    {
        return $this->belongsTo(Business::class);
    }
}
