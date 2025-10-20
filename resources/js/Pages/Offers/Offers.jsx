import { useState } from "react";
import OfferSidebar from "./OfferSidebar";
import Recommendation from "./Recommendation";
import SelectedOffer from "./SelectedOffer";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function OffersPage({ offers, analysis }) {
    console.log("Offers:", offers);

    if (!analysis) {
        return (
            <AuthenticatedLayout>
                <div>Please Try again Later</div>
            </AuthenticatedLayout>
        );
    }
    const [selectedOfferId, setSelectedOfferId] = useState(
        offers[0]?.id || null
    );

    const allOffers = offers;

    const investmentAnalysis = analysis.data;

    const financialMetrics = [
        {
            label: "Post-Money Valuation",
            value: "$16.7M",
            change: "+25%",
            positive: true,
        },
        {
            label: "Dilution Impact",
            value: "15%",
            change: "Moderate",
            positive: false,
        },
        {
            label: "Runway Extension",
            value: "24 months",
            change: "+18 months",
            positive: true,
        },
        {
            label: "ROI Potential",
            value: "3.5x",
            change: "High",
            positive: true,
        },
    ];

    const handleChildData = (offerId) => {
        setSelectedOfferId(offerId);
    };

    const selectedOffer = allOffers.find(
        (offer) => offer.id === selectedOfferId
    );

    return (
        <AuthenticatedLayout>
            <div className="min-h-[calc(100vh-4rem)] bg-background">
                <div className="flex gap-6 px-4 py-8 sm:px-6 lg:px-8">
                    <OfferSidebar
                        allOffers={allOffers}
                        selectedOfferId={selectedOfferId}
                        onSelectOffer={handleChildData}
                    />
                    {/* Main Content Area */}
                    <div className="flex-1 min-w-0">
                        <div className="mx-auto max-w-4xl">
                            <Recommendation
                                investmentAnalysis={investmentAnalysis}
                            />

                            {/* Selected Offer Details */}
                            {selectedOffer && (
                                <SelectedOffer
                                    selectedOffer={selectedOffer}
                                    financialMetrics={financialMetrics}
                                    pros={investmentAnalysis.pros}
                                    cons={investmentAnalysis.cons}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
