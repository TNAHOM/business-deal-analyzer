import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, ArrowRight } from "lucide-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import NavLink from "@/Components/NavLink";
import ProblemStatement from "./ProblemStatement";
import RecommendedSolution from "./RecommendedSolution";

export default function SolutionsPage({ solutionsData }) {
    console.log("Solutions Data:", solutionsData);

    if (!solutionsData || !solutionsData.data) {
        return (
            <AuthenticatedLayout>
                <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background px-4 py-8 sm:px-6 lg:px-8">
                    <p className="text-muted-foreground">
                        No solutions data available.
                    </p>
                </div>
            </AuthenticatedLayout>
        );
    }

    const problemStatement = solutionsData.data.problemStatement;
    const rootCauses = solutionsData.data.rootCauses;

    const solutions = solutionsData.data.solutions || [];

    return (
        <AuthenticatedLayout>
            <div className="min-h-[calc(100vh-4rem)] bg-background px-4 py-8 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-8">
                        <h1 className="font-sans text-3xl font-bold text-foreground">
                            Problem & Solution Analysis
                        </h1>
                        <p className="mt-2 text-muted-foreground">
                            AI-generated solutions tailored to your business
                            challenge
                        </p>
                    </div>

                    <ProblemStatement
                        problemStatement={problemStatement}
                        rootCauses={rootCauses}
                    />

                    <div className="mb-6">
                        <h2 className="mb-4 font-sans text-2xl font-bold text-foreground">
                            Recommended Solutions
                        </h2>
                        <p className="text-muted-foreground">
                            {solutions.length} strategic solutions ranked by
                            priority and potential impact
                        </p>
                    </div>

                    <div className="space-y-6">
                        {solutions.map((solution) => (
                            <RecommendedSolution solution={solution} />
                        ))}
                    </div>

                    <div className="mt-6 grid gap-6 md:grid-cols-2">
                        <Card className="border-border bg-card">
                            <CardContent className="flex items-center justify-between p-6">
                                <div>
                                    <h3 className="font-semibold text-card-foreground">
                                        Need Custom Solutions?
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Discuss your specific needs with our AI
                                        assistant
                                    </p>
                                </div>
                                <NavLink href={route("chat.index")}>
                                    <Button className="gap-2">
                                        Chat Now
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </NavLink>
                            </CardContent>
                        </Card>

                        <Card className="border-border bg-card">
                            <CardContent className="flex items-center justify-between p-6">
                                <div>
                                    <h3 className="font-semibold text-card-foreground">
                                        Assess Related Risks
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Understand potential risks of
                                        implementation
                                    </p>
                                </div>
                                <NavLink
                                    href={route("analysis.risk-opportunity")}
                                >
                                    <Button
                                        variant="outline"
                                        className="gap-2 bg-transparent"
                                    >
                                        View Risks
                                        <TrendingUp className="h-4 w-4" />
                                    </Button>
                                </NavLink>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
