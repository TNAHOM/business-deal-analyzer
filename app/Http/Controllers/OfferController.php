<?php

namespace App\Http\Controllers;

use App\Repositories\AnalysisRepository;
use App\Repositories\BusinessRepository;
use App\Repositories\OfferRepository;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class OfferController extends Controller
{
    protected $offerRepository;

    protected $businessRepository;

    protected $analysisRepository;

    public function __construct(OfferRepository $offerRepository, BusinessRepository $businessRepository, AnalysisRepository $analysisRepository)
    {
        $this->offerRepository = $offerRepository;
        $this->businessRepository = $businessRepository;
        $this->analysisRepository = $analysisRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $offers = $this->offerRepository->all();
        $analysis = $this->analysisRepository->getByType('investment', Auth::user()->business->id);

        return Inertia::render('Offers/Offers', [
            'offers' => $offers,
            'analysis' => $analysis,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'investor' => 'required|string|max:255',
            'amount' => 'required|integer|min:0',
            'equity' => 'required|numeric|min:0|max:100',
            'postMoneyValuation' => 'required|numeric|min:0',
            'offerDate' => 'required|date',
            'status' => 'required|in:pending,accepted,rejected,underReview',
            'type' => 'required|in:current,previous,declined',
        ]);

        try {
            $user_id = Auth::user()->id;
            $business_id = $this->businessRepository->getByUserId($user_id)->first()->id;

            $validatedData['business_id'] = $business_id;

            $this->offerRepository->create($validatedData);

            return redirect()->route('offers.index')->with('success', 'Offer created successfully.');

        } catch (Exception $e) {
            Log::error('Error creating offer: '.$e->getMessage());

            return redirect()->route('offers.index')->with('error', 'Error creating offer: '.$e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $offer = $this->offerRepository->find($id);

        if (! $offer) {
            return redirect()->route('offers.index')->with('error', 'Offer not found.');
        }

        return Inertia::render('Offers/Offer', [
            'offer' => $offer,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
