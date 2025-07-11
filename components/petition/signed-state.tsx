import { Badge } from '@/components/ui/badge';

export function SignedState() {
	return (
		<div className="text-center py-4 transition-all duration-300 ease-in-out">
			<Badge
				variant="default"
				className="bg-green-600 animate-in fade-in-0 zoom-in-95 duration-200"
			>
				✓ Signed
			</Badge>
			<p className="text-sm text-gray-500 mt-2 animate-in fade-in-0 slide-in-from-bottom-2 duration-300 delay-100">
				Thank you for your support!
			</p>
		</div>
	);
}
