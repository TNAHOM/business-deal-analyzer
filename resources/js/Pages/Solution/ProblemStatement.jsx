import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";

const ProblemStatement = ({ problemStatement, rootCauses }) => {
    const getPriorityColor = (priority) => {
        switch (priority.toLowerCase()) {
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
        <Card className="mb-6 border-border bg-card">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <CardTitle className="flex items-center gap-2 text-card-foreground">
                            <AlertCircle className="h-5 w-5 text-red-500" />
                            {problemStatement.title}
                        </CardTitle>
                        <CardDescription className="mt-2">
                            {problemStatement.description}
                        </CardDescription>
                    </div>
                    <div className="flex gap-2">
                        {/* <Badge
                            className={getPriorityColor(
                                problemStatement.impact
                            )}
                            variant="outline"
                        >
                            {problemStatement.impact} Impact
                        </Badge> */}
                        <Badge
                            className={getPriorityColor(
                                problemStatement.urgency
                            )}
                            variant="outline"
                        >
                            {problemStatement.urgency}
                        </Badge>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <h4 className="mb-2 text-sm font-semibold text-card-foreground">
                            Affected Areas
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {problemStatement.affectedAreas.map((area) => (
                                <Badge key={area} variant="secondary">
                                    {area}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="mb-2 text-sm font-semibold text-card-foreground">
                            Root Causes Identified
                        </h4>
                        <ul className="space-y-2">
                            {rootCauses.map((cause, index) => (
                                <li
                                    key={index}
                                    className="flex gap-2 text-sm text-muted-foreground"
                                >
                                    <span className="text-red-500">•</span>
                                    <span>{cause}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProblemStatement;
