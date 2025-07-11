import { Input } from "@/components/ui/input";

type CustomAmountInputProps = {
    value: string;
    onChange: (value: string) => void;
};

export function CustomAmountInput({ value, onChange }: CustomAmountInputProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Other amount
            </label>
            <div className="relative">
                <Input
                    type="number"
                    placeholder="Enter amount"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="pr-8"
                    min="1"
                    step="0.01"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    €
                </span>
            </div>
        </div>
    );
}
