import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';

type SuccessDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export function SuccessDialog({ open, onOpenChange }: SuccessDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-md text-center">
				<DialogHeader className="space-y-4">
					<div className="mx-auto w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
						<div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
							<svg
								className="w-6 h-6 text-white"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
					</div>
					<DialogTitle className="text-xl font-semibold">
						Your commitment doesn't stop here!
					</DialogTitle>
					<DialogDescription className="text-base text-muted-foreground">
						The true engine of change, it's our collective action. Help this
						petition reach more people committed to a better world.
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4">
					<p className="text-sm font-medium">
						Do you want to contribute 7€ to strengthen its visibility in the
						media?
					</p>

					<div className="space-y-3">
						<Button
							className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3"
							onClick={() => onOpenChange(false)}
						>
							Yes, I want to donate 7€ to help the petition reach its goal
						</Button>

						<Button
							variant="ghost"
							className="w-full text-gray-600 hover:text-gray-800"
							onClick={() => onOpenChange(false)}
						>
							No, I prefer to share it
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
