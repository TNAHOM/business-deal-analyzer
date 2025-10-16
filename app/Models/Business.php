<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Business extends Model
{

    protected $fillable = [
        'user_id',
        'name',
        'description',
        'sector',
        'financials',
    ];

    protected $casts = [
        'financials' => 'array', // Cast JSON to array
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}