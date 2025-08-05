'use client';

import { useEffect, useState } from 'react';
import { OwnerEmptyDialog } from './owner-empty-dialog';

type OwnerEmptyClientProps = {
	petitionId: string;
	isOwner: boolean;
	signatureCount: number;
};

export function OwnerEmptyClient({
	petitionId,
	isOwner,
	signatureCount,
}: OwnerEmptyClientProps) {
	const [showDialog, setShowDialog] = useState(false);

	useEffect(() => {
		// Show dialog if user is owner and has 0 signatures
		if (isOwner && signatureCount === 0) {
			// Small delay to ensure the page is fully loaded
			const timer = setTimeout(() => {
				setShowDialog(true);
			}, 1000);

			return () => clearTimeout(timer);
		}
	}, [isOwner, signatureCount]);

	return (
		<OwnerEmptyDialog
			open={showDialog}
			onOpenChange={setShowDialog}
			petitionId={petitionId}
		/>
	);
}
