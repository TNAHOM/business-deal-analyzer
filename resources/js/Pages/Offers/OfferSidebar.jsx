import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, PlusCircle, Clock } from "lucide-react";
import { AddOfferModal } from "./AddOfferModal";

const OfferSidebar = ({ allOffers, onSelectOffer, selectedOfferId }) => {
    const [addPopupOpen, setAddPopupOpen] = useState(false);

    const currentOffers = allOffers.filter((offer) => offer.type === "current");
    const previousOffers = allOffers.filter(
        (offer) => offer.type === "previous"
    );

    const handleOfferSelection = (offerId) => {
        onSelectOffer(offerId);
    };

    return (
        <>
            <div className="w-full max-w-xs flex-shrink-0">
                <Card className="border-border bg-card sticky top-8">
                    <CardHeader>
                        <CardTitle className="text-card-foreground">
                            Offers
                        </CardTitle>
                        <CardDescription>View all your offers</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Current Offers Section */}
                        {currentOffers.length > 0 && (
                            <div className="space-y-2">
                                <h4 className="flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
                                    <Clock className="h-3 w-3" />
                                    Current
                                </h4>
                                <div className="space-y-2">
                                    {currentOffers.map((offer) => (
                                        <button
                                            key={offer.id}
                                            onClick={() =>
                                                handleOfferSelection(offer.id)
                                            }
                                            className={`w-full rounded-lg border p-3 text-left transition-all ${
                                                selectedOfferId === offer.id
                                                    ? "border-primary bg-primary/10"
                                                    : "border-border bg-background hover:border-primary/50"
                                            }`}
                                        >
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex-1 min-w-0">
                                                    <p className="truncate text-sm font-medium text-foreground">
                                                        {offer.title}
                                                    </p>
                                                    <p className="truncate text-xs text-muted-foreground">
                                                        {offer.amount}
                                                    </p>
                                                </div>
                                                <Badge
                                                    variant="secondary"
                                                    className="flex-shrink-0 text-xs"
                                                >
                                                    {offer.status}
                                                </Badge>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Previous Offers Section */}
                        {previousOffers.length > 0 && (
                            <div className="space-y-2 border-t border-border pt-4">
                                <h4 className="flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
                                    <CheckCircle2 className="h-3 w-3" />
                                    Previous
                                </h4>
                                <div className="space-y-2">
                                    {previousOffers.map((offer) => (
                                        <button
                                            key={offer.id}
                                            onClick={() =>
                                                onSelectOffer(offer.id)
                                            }
                                            className={`w-full rounded-lg border p-3 text-left transition-all ${
                                                selectedOfferId === offer.id
                                                    ? "border-primary bg-primary/10"
                                                    : "border-border bg-background hover:border-primary/50"
                                            }`}
                                        >
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex-1 min-w-0">
                                                    <p className="truncate text-sm font-medium text-foreground">
                                                        {offer.title}
                                                    </p>
                                                    <p className="truncate text-xs text-muted-foreground">
                                                        {offer.amount}
                                                    </p>
                                                </div>
                                                <Badge
                                                    variant="outline"
                                                    className="flex-shrink-0 text-xs"
                                                >
                                                    {offer.status}
                                                </Badge>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <AddOfferModal
                            open={addPopupOpen}
                            onOpenChange={setAddPopupOpen}
                            onAddOffer={(offer) => {
                                setOffers((prev) => [...prev, offer]);
                            }}
                        />
                    </CardContent>
                </Card>
            </div>
        </>
    );
};
export default OfferSidebar;
