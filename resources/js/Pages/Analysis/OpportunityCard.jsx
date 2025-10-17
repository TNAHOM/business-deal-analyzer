import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

const OpportunityCard = ({ index, opportunity }) => {
    const getPotentialColor = (potential) => {
        switch (potential.toLowerCase()) {
            case "high":
                return "bg-green-500/10 text-green-500 border-green-500/20";
            case "medium":
                return "bg-blue-500/10 text-blue-500 border-blue-500/20";
            case "low":
                return "bg-gray-500/10 text-gray-500 border-gray-500/20";
            default:
                return "bg-muted text-muted-foreground";
        }
    };
    return (
        <Card key={index} className="border-border bg-background">
            <CardContent className="p-4">
                <div className="mb-3 flex items-start justify-between">
                    <div className="flex-1">
                        <h4 className="font-semibold text-foreground">
                            {opportunity.title}
                        </h4>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {opportunity.description}
                        </p>
                    </div>
                    <Badge
                        className={getPotentialColor(opportunity.potential)}
                        variant="outline"
                    >
                        {opportunity.potential}
                    </Badge>
                </div>

                <div className="space-y-2 rounded-lg border border-border bg-card p-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-card-foreground">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Recommended Action
                    </div>
                    <p className="text-sm text-muted-foreground">
                        {opportunity.recommended_actions}
                    </p>
                </div>

                {/* <div className="mt-3 flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs">
                          {opportunity.impact}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{opportunity.timeframe}</span>
                      </div> */}
            </CardContent>
        </Card>
    );
};

export default OpportunityCard;
