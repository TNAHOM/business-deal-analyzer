import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Lightbulb,
    Target,
    Clock,
    DollarSign,
    Users,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";

const RecommendedSolution = ({ solution }) => {
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

    const getImpactColor = (impact) => {
        switch (impact.toLowerCase()) {
            case "very high":
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
        <Card key={solution.id} className="border-border bg-card">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <CardTitle className="flex items-center gap-2 text-card-foreground">
                            <Lightbulb className="h-5 w-5 text-primary" />
                            {solution.title}
                        </CardTitle>
                        <CardDescription className="mt-2">
                            {solution.description}
                        </CardDescription>
                    </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                    <Badge
                        className={getPriorityColor(solution.priority)}
                        variant="outline"
                    >
                        {solution.priority} Priority
                    </Badge>
                    <Badge
                        className={getImpactColor(solution.impact)}
                        variant="outline"
                    >
                        {solution.impact} Impact
                    </Badge>
                    <Badge variant="secondary">{solution.category}</Badge>
                </div>
            </CardHeader>

            <CardContent>
                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="steps">Implementation</TabsTrigger>
                        <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
                        <TabsTrigger value="risks">Risks</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-4">
                                <Clock className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Timeline
                                    </p>
                                    <p className="text-sm font-semibold text-foreground">
                                        {solution.timeline}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-4">
                                <DollarSign className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Estimated Cost
                                    </p>
                                    <p className="text-sm font-semibold text-foreground">
                                        {solution.cost}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-4">
                                <Users className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Effort Level
                                    </p>
                                    <p className="text-sm font-semibold text-foreground">
                                        {solution.effort}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="steps" className="space-y-3">
                        <h4 className="text-sm font-semibold text-card-foreground">
                            Implementation Steps
                        </h4>
                        <ol className="space-y-3">
                            {solution.steps.map((step, index) => (
                                <li key={index} className="flex gap-3">
                                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                                        {index + 1}
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                        {step}
                                    </span>
                                </li>
                            ))}
                        </ol>
                    </TabsContent>

                    <TabsContent value="outcomes" className="space-y-3">
                        <h4 className="text-sm font-semibold text-card-foreground">
                            Expected Outcomes
                        </h4>
                        <ul className="space-y-2">
                            {solution.expectedOutcomes.map((outcome, index) => (
                                <li
                                    key={index}
                                    className="flex gap-2 text-sm text-muted-foreground"
                                >
                                    <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500" />
                                    <span>{outcome}</span>
                                </li>
                            ))}
                        </ul>
                    </TabsContent>

                    <TabsContent value="risks" className="space-y-3">
                        <h4 className="text-sm font-semibold text-card-foreground">
                            Potential Risks
                        </h4>
                        <ul className="space-y-2">
                            {solution.risks.map((risk, index) => (
                                <li
                                    key={index}
                                    className="flex gap-2 text-sm text-muted-foreground"
                                >
                                    <AlertCircle className="h-4 w-4 shrink-0 text-yellow-500" />
                                    <span>{risk}</span>
                                </li>
                            ))}
                        </ul>
                    </TabsContent>
                </Tabs>

                <div className="mt-6 flex gap-3">
                    <Button className="gap-2">
                        <Target className="h-4 w-4" />
                        Start Implementation
                    </Button>
                    <Button variant="outline">Save for Later</Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default RecommendedSolution;
