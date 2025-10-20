<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    protected $fillable = [
        'title',
        'business_id',
        'investor',
        'amount',
        'equity',
        'postMoneyValuation',
        'offerDate',
        'status',
        'type',
    ];

    public function business()
    {
        return $this->belongsTo(Business::class);
    }
}
