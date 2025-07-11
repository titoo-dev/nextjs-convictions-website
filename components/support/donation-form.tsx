"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DonationAmountSelector } from "./donation-amount-selector";
import { CustomAmountInput } from "./custom-amount-input";

type DonationAmount = 5 | 10 | 20 | 50;

export function DonationForm() {
    const [selectedAmount, setSelectedAmount] = useState<DonationAmount | null>(null);
    const [customAmount, setCustomAmount] = useState("");

    const donationAmounts: DonationAmount[] = [5, 10, 20, 50];

    const handleAmountSelect = (amount: DonationAmount) => {
        setSelectedAmount(amount);
        setCustomAmount("");
    };

    const handleCustomAmountChange = (value: string) => {
        setCustomAmount(value);
        setSelectedAmount(null);
    };

    const getFinalAmount = () => {
        if (customAmount) return parseFloat(customAmount);
        return selectedAmount;
    };

    return (
        <Card className="shadow-none">
            <CardHeader>
                <CardTitle>Choose your contribution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <DonationAmountSelector
                    amounts={donationAmounts}
                    selectedAmount={selectedAmount}
                    onAmountSelect={handleAmountSelect}
                />

                <CustomAmountInput
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                />

                <Button
                    size="lg"
                    className="w-full h-12 text-lg font-semibold bg-orange-500 hover:bg-orange-600 text-white"
                    disabled={!getFinalAmount() || getFinalAmount()! <= 0}
                >
                    <Heart className="w-5 h-5 mr-2" />
                    Pay {getFinalAmount() ? `${getFinalAmount()} €` : ""}
                </Button>
            </CardContent>
        </Card>
    );
}
