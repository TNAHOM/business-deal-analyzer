import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    Calendar,
    Users,
    AlertCircle,
    CheckCircle2,
    ArrowRight,
} from "lucide-react";
import NavLink from "@/Components/NavLink";

const SelectedOffer = ({ selectedOffer, financialMetrics, pros, cons }) => {
    return (
        <>
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="font-sans text-3xl font-bold text-foreground">
                            {selectedOffer.title}
                        </h1>
                        <p className="mt-2 text-muted-foreground">
                            AI-powered analysis of your investment offer
                        </p>
                    </div>
                    <Badge variant="secondary" className="text-sm">
                        {selectedOffer.status}
                    </Badge>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <Card className="border-border bg-card lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-card-foreground">
                            Offer Overview
                        </CardTitle>
                        <CardDescription>
                            Key details and financial metrics
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                    <DollarSign className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Investment Amount
                                    </p>
                                    <p className="text-xl font-semibold text-foreground">
                                        {selectedOffer.amount}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                    <TrendingUp className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Equity Stake
                                    </p>
                                    <p className="text-xl font-semibold text-foreground">
                                        {selectedOffer.equity}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                    <Users className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Investor
                                    </p>
                                    <p className="text-sm font-semibold text-foreground">
                                        {selectedOffer.investor}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                    <Calendar className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Offer Date
                                    </p>
                                    <p className="text-sm font-semibold text-foreground">
                                        {selectedOffer.offerDate}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-semibold text-card-foreground">
                                Financial Impact
                            </h3>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {financialMetrics.map((metric) => (
                                    <div
                                        key={metric.label}
                                        className="space-y-2"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">
                                                {metric.label}
                                            </span>
                                            <div className="flex items-center gap-1">
                                                {metric.positive ? (
                                                    <TrendingUp className="h-3 w-3 text-green-500" />
                                                ) : (
                                                    <TrendingDown className="h-3 w-3 text-yellow-500" />
                                                )}
                                                <span className="text-xs text-muted-foreground">
                                                    {metric.change}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-lg font-semibold text-foreground">
                                            {metric.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border bg-card">
                    <CardHeader>
                        <CardTitle className="text-card-foreground">
                            AI Recommendation
                        </CardTitle>
                        <CardDescription>
                            Overall assessment score
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="text-center">
                            <div className="mb-4 inline-flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                                <span className="font-sans text-3xl font-bold text-primary">
                                    {selectedOffer?.overallScore || 85}
                                </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Out of 100
                            </p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                    Overall Score
                                </span>
                                <span className="font-medium text-foreground">
                                    {selectedOffer?.overallScore || 85}%
                                </span>
                            </div>
                            <Progress
                                value={selectedOffer?.overallScore || 85}
                                className="h-2"
                            />
                        </div>

                        <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                            <p className="text-center font-semibold text-foreground">
                                {selectedOffer?.recommendation || "Strong Buy"}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Button className="w-full gap-2">
                                Accept Offer
                                <CheckCircle2 className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full bg-transparent"
                            >
                                Request Modifications
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-6 w-full">
                <Card className="border-border bg-card">
                    <CardHeader>
                        <CardTitle className="text-card-foreground">
                            Pros & Cons Analysis
                        </CardTitle>
                        <CardDescription>
                            Balanced evaluation of the offer
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 grid gap-6 lg:grid-cols-2">
                        <div className="space-y-3">
                            <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Advantages
                            </h4>
                            <ul className="space-y-2">
                                {pros.map((pro, index) => (
                                    <li
                                        key={index}
                                        className="flex gap-2 text-sm text-muted-foreground"
                                    >
                                        <span className="text-green-500">
                                            •
                                        </span>
                                        <span>{pro}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                                <AlertCircle className="h-4 w-4 text-yellow-500" />
                                Considerations
                            </h4>
                            <ul className="space-y-2">
                                {cons.map((con, index) => (
                                    <li
                                        key={index}
                                        className="flex gap-2 text-sm text-muted-foreground"
                                    >
                                        <span className="text-yellow-500">
                                            •
                                        </span>
                                        <span>{con}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-6">
                <Card className="border-border bg-card">
                    <CardContent className="flex items-center justify-between p-6">
                        <div>
                            <h3 className="font-semibold text-card-foreground">
                                Need more insights?
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Chat with our AI to explore this offer in detail
                            </p>
                        </div>
                        <NavLink href="/chat">
                            <Button className="gap-2">
                                Ask Questions
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </NavLink>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default SelectedOffer;
