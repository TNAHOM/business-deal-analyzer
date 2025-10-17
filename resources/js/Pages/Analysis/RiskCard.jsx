import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield } from "lucide-react";

const RiskCard = ({ index, risk }) => {
    const getSeverityColor = (severity) => {
        switch (severity.toLowerCase()) {
            case "high":
                return "bg-red-500/10 text-red-500 border-red-500/20";
            case "medium":
                return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
            case "low":
                return "bg-green-500/10 text-green-500 border-green-500/20";
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
                            {risk.title}
                        </h4>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {risk.description}
                        </p>
                    </div>
                    <Badge
                        className={getSeverityColor(risk.priority)}
                        variant="outline"
                    >
                        {risk.priority}
                    </Badge>
                </div>

                <div className="mb-3 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                            Probability
                        </span>
                        <span className="font-medium text-foreground">
                            {risk.probability}%
                        </span>
                    </div>
                    <Progress value={risk.probability} className="h-1.5" />
                </div>

                <div className="space-y-2 rounded-lg border border-border bg-card p-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-card-foreground">
                        <Shield className="h-3.5 w-3.5" />
                        Mitigation Strategy
                    </div>
                    <p className="text-sm text-muted-foreground">
                        {risk.mitigation}
                    </p>
                </div>

                {/* <div className="mt-3 flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {risk.impact}
                        </Badge>
                      </div> */}
            </CardContent>
        </Card>
    );
};

export default RiskCard;
