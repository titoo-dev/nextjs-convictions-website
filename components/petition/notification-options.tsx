import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useTranslations } from 'next-intl';

type NotificationOptionsProps = {
	disabled?: boolean;
};

export function NotificationOptions({
	disabled = false,
}: NotificationOptionsProps) {
	const t = useTranslations('petition.signForm.notifications');

	return (
		<div className="transition-all duration-300 ease-in-out">
			<RadioGroup name="notifications" defaultValue="yes" disabled={disabled}>
				<div className="flex items-center space-x-2 transition-all duration-200 hover:bg-gray-50 p-2 rounded-md">
					<RadioGroupItem value="yes" id="yes" disabled={disabled} />
					<Label htmlFor="yes" className="text-sm cursor-pointer">
						{t('yes')}
					</Label>
				</div>
				<div className="flex items-center space-x-2 transition-all duration-200 hover:bg-gray-50 p-2 rounded-md">
					<RadioGroupItem value="no" id="no" disabled={disabled} />
					<Label htmlFor="no" className="text-sm cursor-pointer">
						{t('no')}
					</Label>
				</div>
			</RadioGroup>
		</div>
	);
}