import { Input } from "@/components/ui/input";

type CustomAmountInputProps = {
    value: string;
    onChange: (value: string) => void;
};

export function CustomAmountInput({ value, onChange }: CustomAmountInputProps) {
    const handleInputChange = (inputValue: string) => {
        // Remove any non-numeric characters except decimal point
        const cleanValue = inputValue.replace(/[^0-9.]/g, "");

        // Prevent multiple decimal points
        const parts = cleanValue.split(".");
        if (parts.length > 2) {
            return;
        }

        // Limit decimal places to 2
        if (parts[1] && parts[1].length > 2) {
            return;
        }

        // Convert to number to check if positive
        const numValue = parseFloat(cleanValue);

        // Only allow positive numbers or empty string
        if (cleanValue === "" || numValue > 0) {
            onChange(cleanValue);
        }
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Other amount
            </label>
            <div className="relative">
                <Input
                    type="text"
                    placeholder="Enter amount"
                    value={value}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className="pr-8"
                    inputMode="decimal"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    €
                </span>
            </div>
        </div>
    );
}
