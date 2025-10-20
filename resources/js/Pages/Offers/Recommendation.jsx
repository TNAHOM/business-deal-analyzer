import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2 } from "lucide-react";

const Recommendation = ({ investmentAnalysis }) => {
    return (
        <Card className="mb-6 border-border bg-card">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div>
                        <CardTitle className="text-card-foreground">
                            Investment Needs Analysis
                        </CardTitle>
                        <CardDescription>
                            AI-powered assessment of your funding requirements
                        </CardDescription>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <span className="font-sans text-lg font-bold text-primary">
                            {investmentAnalysis.confidence}%
                        </span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Investment Decision */}
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                    <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-semibold text-foreground">
                                Your business needs investment
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                {investmentAnalysis.reason}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Recommended Amount */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg border border-border bg-background p-4">
                        <p className="text-sm text-muted-foreground">
                            Recommended Investment Amount
                        </p>
                        <p className="mt-2 text-2xl font-bold text-primary">
                            {investmentAnalysis.approximateAmount}
                        </p>
                    </div>
                    <div className="rounded-lg border border-border bg-background p-4">
                        <p className="text-sm text-muted-foreground">
                            Current Runway
                        </p>
                        <p className="mt-2 text-2xl font-bold text-foreground">
                            ~8 months
                        </p>
                    </div>
                </div>

                {/* Rationale */}
                <div className="space-y-3">
                    <h4 className="font-semibold text-card-foreground">
                        Why you need investment
                    </h4>
                    <ul className="space-y-2">
                        {investmentAnalysis.rationale.map((reason, index) => (
                            <li
                                key={index}
                                className="flex gap-2 text-sm text-muted-foreground"
                            >
                                <span className="text-primary">•</span>
                                <span>{reason}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Use of Funds */}
                <div className="space-y-3">
                    <h4 className="font-semibold text-card-foreground">
                        Recommended use of funds
                    </h4>
                    <div className="space-y-3">
                        {investmentAnalysis.useOfFunds.map((fund, index) => (
                            <div key={index} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        {fund}
                                    </span>
                                </div>
                                <Progress
                                    value={[40, 35, 15, 10][index]}
                                    className="h-2"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default Recommendation;
