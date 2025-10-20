import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { useForm } from "@inertiajs/react";

export function AddOfferModal({ onAddOffer }) {
    const [open, setOpen] = useState(false);
    const [formErrors, setFormErrors] = useState("");
    const {
        data: formData,
        setData: setFormData,
        post,
        errors,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        title: "",
        investor: "",
        amount: "",
        equity: "",
        postMoneyValuation: "",
        offerDate: "",
        status: "pending",
        type: "current",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(name, value);
    };

    const handleSelectChange = (value) => {
        setFormData("status", value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !formData.title ||
            !formData.investor ||
            !formData.amount ||
            !formData.equity ||
            !formData.postMoneyValuation ||
            !formData.offerDate ||
            !formData.type
        ) {
            setFormErrors("Please fill in all required fields");
            return;
        }

        setFormErrors("");

        post(route("offers.store"), {
            onSuccess: () => {
                if (onAddOffer) onAddOffer(formData);
            },
            onFinish: () => {
                // keep modal open until recentlySuccessful triggers the effect
            },
            preserveState: false,
        });
    };

    // Reset form and close modal when inertia reports a successful submission
    useEffect(() => {
        if (recentlySuccessful) {
            reset();
            setOpen(false);
        }
    }, [recentlySuccessful, reset]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full gap-2 border-border bg-transparent"
                >
                    <PlusCircle className="h-4 w-4" />
                    Add New Offer
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl border-border bg-card">
                <DialogHeader>
                    <DialogTitle className="text-card-foreground">
                        Add New Offer
                    </DialogTitle>
                    <DialogDescription>
                        Create a new investment offer for your business
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Offer Title */}
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-foreground">
                            Offer Title <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="title"
                            name="title"
                            placeholder="e.g., Series A Investment Offer"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="border-border bg-background text-foreground"
                        />
                        {errors.title && (
                            <p className="text-sm text-red-500">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    {/* Investor Name */}
                    <div className="space-y-2">
                        <Label htmlFor="investor" className="text-foreground">
                            Investor / Source{" "}
                            <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="investor"
                            name="investor"
                            placeholder="e.g., Venture Capital Partners"
                            value={formData.investor}
                            onChange={handleInputChange}
                            className="border-border bg-background text-foreground"
                        />
                        {errors.investor && (
                            <p className="text-sm text-red-500">
                                {errors.investor}
                            </p>
                        )}
                    </div>

                    {/* Investment Amount and Equity */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="amount" className="text-foreground">
                                Investment Amount{" "}
                                <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="amount"
                                type="number"
                                name="amount"
                                placeholder="e.g., $2,500,000"
                                value={formData.amount}
                                onChange={handleInputChange}
                                className="border-border bg-background text-foreground"
                            />
                            {errors.amount && (
                                <p className="text-sm text-red-500">
                                    {errors.amount}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="equity" className="text-foreground">
                                Equity Stake{" "}
                                <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="equity"
                                name="equity"
                                type="number"
                                placeholder="e.g., 15%"
                                value={formData.equity}
                                onChange={handleInputChange}
                                className="border-border bg-background text-foreground"
                            />
                            {errors.equity && (
                                <p className="text-sm text-red-500">
                                    {errors.equity}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Valuation and Date */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label
                                htmlFor="postMoneyValuation"
                                className="text-foreground"
                            >
                                Post-Money Valuation{" "}
                                <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="postMoneyValuation"
                                name="postMoneyValuation"
                                type="number"
                                placeholder="e.g., $16,666,667"
                                value={formData.postMoneyValuation}
                                onChange={handleInputChange}
                                className="border-border bg-background text-foreground"
                            />
                            {errors.postMoneyValuation && (
                                <p className="text-sm text-red-500">
                                    {errors.postMoneyValuation}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label
                                htmlFor="offerDate"
                                className="text-foreground"
                            >
                                Offer Date{" "}
                                <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="offerDate"
                                name="offerDate"
                                type="date"
                                value={formData.offerDate}
                                onChange={handleInputChange}
                                className="border-border bg-background text-foreground"
                            />
                            {errors.offerDate && (
                                <p className="text-sm text-red-500">
                                    {errors.offerDate}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Status */}
                    <div className="space-y-2">
                        <Label htmlFor="status" className="text-foreground">
                            Status
                        </Label>
                        <Select
                            value={formData.status}
                            onValueChange={handleSelectChange}
                        >
                            <SelectTrigger className="border-border bg-background text-foreground">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="border-border bg-card">
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="underReview">
                                    Under Review
                                </SelectItem>
                                <SelectItem value="accepted">
                                    Accepted
                                </SelectItem>
                                <SelectItem value="declined">
                                    Declined
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.status && (
                            <p className="text-sm text-red-500">
                                {errors.status}
                            </p>
                        )}
                    </div>

                    {/* type */}
                    <div className="space-y-2">
                        <Label htmlFor="type" className="text-foreground">
                            Type
                        </Label>
                        <Select
                            value={formData.type}
                            onValueChange={handleSelectChange}
                        >
                            <SelectTrigger className="border-border bg-background text-foreground">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="border-border bg-card">
                                <SelectItem value="current">Current</SelectItem>
                                <SelectItem value="previous">
                                    Previous
                                </SelectItem>
                                <SelectItem value="declined">
                                    Declined
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.type && (
                            <p className="text-sm text-red-500">
                                {errors.type}
                            </p>
                        )}
                    </div>

                    {/* Form Actions */}
                    <div className="flex gap-3 justify-end pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className="bg-transparent border-border"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="gap-2"
                            disabled={processing}
                        >
                            <PlusCircle className="h-4 w-4" />
                            {processing ? "Adding..." : "Add Offer"}
                        </Button>
                    </div>
                </form>

                {formErrors && (
                    <div className="mt-4 text-sm text-red-500">
                        {formErrors}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
