<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Enums\AnalysisType;

class Analysis extends Model
{
    protected $fillable = ['business_id', 'data', 'type'];

    protected $casts = [
        'data' => 'array',
        'type' => AnalysisType::class,
    ];

    public function business() {
        return $this->belongsTo(Business::class);
    }
}
