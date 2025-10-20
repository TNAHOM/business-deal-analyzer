<?php

namespace App\Repositories;

use App\Models\Analysis;

class AnalysisRepository
{
    public function all()
    {
        return Analysis::all();
    }

    public function find($id)
    {
        return Analysis::find($id);
    }

    public function create(array $data)
    {
        return Analysis::create($data);
    }

    public function update($id, array $data)
    {
        $analysis = Analysis::find($id);
        $analysis->update($data);

        return $analysis;
    }

    public function delete($id)
    {
        $analysis = Analysis::find($id);
        $analysis->delete();

        return $analysis;
    }

    public function getByType($type, $business_id)
    {
        return Analysis::where('business_id', $business_id)->where('type', $type)->latest('updated_at')->first();
    }
}
