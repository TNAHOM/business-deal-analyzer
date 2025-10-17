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
    AlertTriangle,
    TrendingUp,
    Shield,
    Target,
    ArrowRight,
    ChevronRight,
} from "lucide-react";
import RiskCard from "./RiskCard";
import OpportunityCard from "./OpportunityCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function RiskOpportunityPage({
    riskAnalysis,
    opportunityAnalysis,
}) {
    if (!riskAnalysis || !opportunityAnalysis) {
        return (
            <AuthenticatedLayout>
                <div className="min-h-[calc(100vh-4rem)] bg-background px-4 py-8 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-8">
                            <h1 className="font-sans text-3xl font-bold text-foreground">
                                There is no Risk and Opportunity Analysis
                                available at this moment.
                            </h1>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    const overallAssessment = {
        riskScore: riskAnalysis ? riskAnalysis?.data?.risk_score : 0,
        opportunityScore: opportunityAnalysis
            ? opportunityAnalysis?.data?.opportunity_score
            : 0,
        status: "Favorable Outlook",
    };

    return (
        <AuthenticatedLayout>
            <div className="min-h-[calc(100vh-4rem)] bg-background px-4 py-8 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-8">
                        <h1 className="font-sans text-3xl font-bold text-foreground">
                            Risk & Opportunity Analysis
                        </h1>
                        <p className="mt-2 text-muted-foreground">
                            Comprehensive assessment of threats and growth
                            potential
                        </p>
                    </div>

                    <div className="mb-6 grid gap-6 md:grid-cols-3">
                        <Card className="border-border bg-card">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-card-foreground">
                                    <Shield className="h-5 w-5 text-primary" />
                                    Risk Score
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="text-3xl font-bold text-foreground">
                                        {overallAssessment.riskScore}/100
                                    </div>
                                    <Progress
                                        value={overallAssessment.riskScore}
                                        className="h-2"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Lower is better
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-border bg-card">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-card-foreground">
                                    <Target className="h-5 w-5 text-primary" />
                                    Opportunity Score
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="text-3xl font-bold text-foreground">
                                        {overallAssessment.opportunityScore}/100
                                    </div>
                                    <Progress
                                        value={
                                            overallAssessment.opportunityScore
                                        }
                                        className="h-2"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Higher is better
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-border bg-card">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-card-foreground">
                                    <TrendingUp className="h-5 w-5 text-primary" />
                                    Overall Outlook
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex h-full items-center">
                                    <Badge
                                        variant="secondary"
                                        className="text-sm"
                                    >
                                        {overallAssessment.status}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">
                        <div className="space-y-6">
                            <Card className="border-border bg-card">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-card-foreground">
                                        <AlertTriangle className="h-5 w-5 text-red-500" />
                                        Identified Risks
                                    </CardTitle>
                                    <CardDescription>
                                        Potential threats requiring attention
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {riskAnalysis?.data?.items.map(
                                        (risk, index) => (
                                            <RiskCard key={index} risk={risk} />
                                        )
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-6">
                            <Card className="border-border bg-card">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-card-foreground">
                                        <TrendingUp className="h-5 w-5 text-green-500" />
                                        Growth Opportunities
                                    </CardTitle>
                                    <CardDescription>
                                        Strategic opportunities for expansion
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {opportunityAnalysis?.data?.items.map(
                                        (opportunity, index) => (
                                            <OpportunityCard
                                                key={index}
                                                opportunity={opportunity}
                                            />
                                        )
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className="mt-6 grid gap-6 md:grid-cols-2">
                        <Card className="border-border bg-card">
                            <CardContent className="flex items-center justify-between p-6">
                                <div>
                                    <h3 className="font-semibold text-card-foreground">
                                        Discuss Risk Mitigation
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Get personalized strategies from our AI
                                    </p>
                                </div>
                                {/* <Link href="/chat"> */}
                                <Button className="gap-2">
                                    Chat Now
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                                {/* </Link> */}
                            </CardContent>
                        </Card>

                        <Card className="border-border bg-card">
                            <CardContent className="flex items-center justify-between p-6">
                                <div>
                                    <h3 className="font-semibold text-card-foreground">
                                        Explore Solutions
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Find actionable solutions for your
                                        challenges
                                    </p>
                                </div>
                                {/* <Link href="/solutions"> */}
                                <Button
                                    variant="outline"
                                    className="gap-2 bg-transparent"
                                >
                                    View Solutions
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                                {/* </Link> */}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
