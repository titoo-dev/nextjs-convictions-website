import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

type NotificationOptionsProps = {
	value: string;
	onValueChange: (value: string) => void;
	disabled?: boolean;
};

export function NotificationOptions({
	value,
	onValueChange,
	disabled = false,
}: NotificationOptionsProps) {
	return (
		<div className="transition-all duration-300 ease-in-out">
			<RadioGroup value={value} onValueChange={onValueChange} disabled={disabled}>
				<div className="flex items-center space-x-2 transition-all duration-200 hover:bg-gray-50 p-2 rounded-md">
					<RadioGroupItem value="yes" id="yes" disabled={disabled} />
					<Label htmlFor="yes" className="text-sm cursor-pointer">
						Yes, keep me informed if this petition succeeds, and tell me how I
						can contribute
					</Label>
				</div>
				<div className="flex items-center space-x-2 transition-all duration-200 hover:bg-gray-50 p-2 rounded-md">
					<RadioGroupItem value="no" id="no" disabled={disabled} />
					<Label htmlFor="no" className="text-sm cursor-pointer">
						No, I do not want to be informed of this petition or future
						initiatives
					</Label>
				</div>
			</RadioGroup>
		</div>
	);
}
