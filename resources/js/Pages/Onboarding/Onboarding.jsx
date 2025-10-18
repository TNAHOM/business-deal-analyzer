import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Building2 } from "lucide-react";
import { router } from "@inertiajs/react";

export default function Onboarding() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        sector: "",
        problems: "",
        financials: {
            revenue: "",
            expenses: "",
            profitMargin: "",
            burnRatePerMonth: "",
            bankBalance: "",
        },
    });

    const handleChange = (a, b) => {
        if (a && a.target) {
            const { name, value } = a.target;
            return updateByPath(name, value);
        }

        return updateByPath(a, b);
    };

    const updateByPath = (path, value) => {
        if (!path) return;

        if (!path.includes(".")) {
            setFormData((prev) => ({ ...prev, [path]: value }));
            return;
        }

        const parts = path.split(".");
        setFormData((prev) => {
            const next = { ...prev };
            let cur = next;

            for (let i = 0; i < parts.length; i++) {
                const key = parts[i];
                if (i === parts.length - 1) {
                    cur[key] = value;
                } else {
                    cur[key] = cur[key] ? { ...cur[key] } : {};
                    cur = cur[key];
                }
            }
            return next;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        console.log("Submitting form data:", formData);
        router.post("/onboarding", formData, {
            onFinish: () => setIsSubmitting(false),
        });
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-background px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                        <Building2 className="h-8 w-8 text-primary" />
                    </div>
                    <h1 className="font-sans text-4xl font-bold text-foreground">
                        Tell us about your business
                    </h1>
                    <p className="mt-3 text-lg text-muted-foreground">
                        Help us understand your business so we can provide
                        better insights
                    </p>
                </div>

                <Card className="border-border bg-card">
                    <CardHeader>
                        <CardTitle className="text-card-foreground">
                            Business Information
                        </CardTitle>
                        <CardDescription>
                            This information will help our AI provide more
                            accurate analysis
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label
                                    htmlFor="name"
                                    className="text-card-foreground"
                                >
                                    Business Name
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Acme Corporation"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="bg-background text-foreground"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="sector"
                                    className="text-card-foreground"
                                >
                                    Industry
                                </Label>
                                <Select
                                    value={formData.sector}
                                    onValueChange={(value) =>
                                        handleChange("sector", value)
                                    }
                                    required
                                >
                                    <SelectTrigger
                                        id="sector"
                                        className="bg-background text-foreground"
                                    >
                                        <SelectValue placeholder="Select your sector" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="technology">
                                            Technology
                                        </SelectItem>
                                        <SelectItem value="retail">
                                            Retail
                                        </SelectItem>
                                        <SelectItem value="manufacturing">
                                            Manufacturing
                                        </SelectItem>
                                        <SelectItem value="healthcare">
                                            Healthcare
                                        </SelectItem>
                                        <SelectItem value="finance">
                                            Finance
                                        </SelectItem>
                                        <SelectItem value="real-estate">
                                            Real Estate
                                        </SelectItem>
                                        <SelectItem value="hospitality">
                                            Hospitality
                                        </SelectItem>
                                        <SelectItem value="education">
                                            Education
                                        </SelectItem>
                                        <SelectItem value="other">
                                            Other
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="description"
                                    className="text-card-foreground"
                                >
                                    Business Description
                                </Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="Tell us about your business, what you do, and your main challenges..."
                                    rows={4}
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    className="bg-background text-foreground"
                                />
                            </div>

                            {/* Problems section */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="problems"
                                    className="text-card-foreground"
                                >
                                    Business Problems
                                </Label>
                                <Textarea
                                    id="problems"
                                    name="problems"
                                    placeholder="What are the main challenges your business is facing?"
                                    rows={4}
                                    value={formData.problems}
                                    onChange={handleChange}
                                    required
                                    className="bg-background text-foreground"
                                />
                            </div>

                            {/* Financials section */}
                            <div className="grid grid-cols-2 gap-6 w-full">
                                <div className="w-full">
                                    <Label
                                        htmlFor="revenue"
                                        className="text-card-foreground"
                                    >
                                        Annual Revenue
                                    </Label>
                                    <Select
                                        value={formData.financials.revenue}
                                        onValueChange={(value) =>
                                            handleChange(
                                                "financials.revenue",
                                                value
                                            )
                                        }
                                        required
                                    >
                                        <SelectTrigger
                                            id="revenue"
                                            className="bg-background text-foreground"
                                        >
                                            <SelectValue placeholder="Select range" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="0-100k">
                                                $0 - $100K
                                            </SelectItem>
                                            <SelectItem value="100k-500k">
                                                $100K - $500K
                                            </SelectItem>
                                            <SelectItem value="500k-1m">
                                                $500K - $1M
                                            </SelectItem>
                                            <SelectItem value="1m-5m">
                                                $1M - $5M
                                            </SelectItem>
                                            <SelectItem value="5m-10m">
                                                $5M - $10M
                                            </SelectItem>
                                            <SelectItem value="10m+">
                                                $10M+
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="w-full">
                                    <Label
                                        htmlFor="burnRatePerMonth"
                                        className="text-card-foreground"
                                    >
                                        Burn rate (per month)
                                    </Label>
                                    <Input
                                        id="burnRatePerMonth"
                                        name="financials.burnRatePerMonth"
                                        type="number"
                                        placeholder="5000"
                                        min="0"
                                        value={
                                            formData.financials.burnRatePerMonth
                                        }
                                        onChange={handleChange}
                                        className="bg-background text-foreground"
                                    />
                                </div>

                                <div className="w-full">
                                    <Label
                                        htmlFor="bankBalance"
                                        className="text-card-foreground"
                                    >
                                        Balance in Bank
                                    </Label>
                                    <Input
                                        id="bankBalance"
                                        name="financials.bankBalance"
                                        type="number"
                                        placeholder="25000"
                                        min="0"
                                        value={formData.financials.bankBalance}
                                        onChange={handleChange}
                                        className="bg-background text-foreground"
                                    />
                                </div>

                                <div className="w-full">
                                    <Label
                                        htmlFor="profitMargin"
                                        className="text-card-foreground"
                                    >
                                        Profit Margin
                                    </Label>
                                    <Input
                                        id="profitMargin"
                                        name="financials.profitMargin"
                                        type="number"
                                        placeholder="2000"
                                        min="0"
                                        value={formData.financials.profitMargin}
                                        onChange={handleChange}
                                        className="bg-background text-foreground"
                                    />
                                </div>

                                <div className="w-full">
                                    <Label
                                        htmlFor="expenses"
                                        className="text-card-foreground"
                                    >
                                        Expenses
                                    </Label>
                                    <Input
                                        id="expenses"
                                        name="financials.expenses"
                                        type="number"
                                        placeholder="2000"
                                        min="0"
                                        value={formData.financials.expenses}
                                        onChange={handleChange}
                                        className="bg-background text-foreground"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.push("/")}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="gap-2"
                                >
                                    {isSubmitting ? "Saving..." : "Continue"}
                                    {!isSubmitting && (
                                        <ArrowRight className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                        Your information is secure and will only be used to
                        provide personalized business insights
                    </p>
                </div>
            </div>
        </div>
    );
}
