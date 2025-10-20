<?php

namespace App\Repositories;

use App\Models\Offer;
use Exception;
use Illuminate\Support\Facades\Log;

class OfferRepository
{
    public function all()
    {
        return Offer::all();
    }

    public function find($id)
    {
        return Offer::find($id);
    }

    public function create(array $data)
    {
        try {
            $offer = Offer::create($data);
            Log::info("Offer created with ID: {$offer->id}");

            return $offer;

        } catch (Exception $e) {
            Log::error('Error creating offer: '.$e->getMessage());
            throw new Exception('Error creating offer: '.$e->getMessage());
        }
    }

    public function update($id, array $data)
    {
        $offer = Offer::find($id);
        $offer->update($data);

        return $offer;
    }

    public function delete($id)
    {
        $offer = Offer::find($id);
        $offer->delete();

        return $offer;
    }
}
