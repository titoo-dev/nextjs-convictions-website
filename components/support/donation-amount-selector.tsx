import { Button } from "@/components/ui/button";

type DonationAmount = 5 | 10 | 20 | 50;

type DonationAmountSelectorProps = {
    amounts: DonationAmount[];
    selectedAmount: DonationAmount | null;
    onAmountSelect: (amount: DonationAmount) => void;
};

export function DonationAmountSelector({
    amounts,
    selectedAmount,
    onAmountSelect,
}: DonationAmountSelectorProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {amounts.map((amount) => (
                <Button
                    key={amount}
                    variant={selectedAmount === amount ? "default" : "outline"}
                    size="lg"
                    onClick={() => onAmountSelect(amount)}
                    className="h-12 text-lg font-semibold"
                >
                    {amount} €
                </Button>
            ))}
        </div>
    );
}
