import { CheckCircle, XCircle } from 'lucide-react';

type ValidationIconProps = {
	validation: { isValid: boolean; error?: string } | null;
	isLoading?: boolean;
};

export function ValidationIcon({ validation, isLoading = false }: ValidationIconProps) {
	if (isLoading)
		return (
			<div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
		);
	if (!validation) return null;
	return validation.isValid ? (
		<CheckCircle className="w-4 h-4 text-green-500" />
	) : (
		<XCircle className="w-4 h-4 text-red-500" />
	);
}
