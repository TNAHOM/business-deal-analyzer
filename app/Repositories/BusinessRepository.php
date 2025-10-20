<?php

namespace App\Repositories;

use App\Models\Business;

class BusinessRepository
{
    public function all()
    {
        return Business::all();
    }

    public function find($id)
    {
        return Business::find($id);
    }

    public function create(array $data)
    {
        return Business::create($data);
    }

    public function update($id, array $data)
    {
        $business = Business::find($id);
        $business->update($data);

        return $business;
    }

    public function delete($id)
    {
        $business = Business::find($id);
        $business->delete();

        return $business;
    }

    // get by user_id
    public function getByUserId($user_id)
    {
        return Business::where('user_id', $user_id)->get();
    }
}
