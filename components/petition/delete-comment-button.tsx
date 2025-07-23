'use client';

import { Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '../ui/button';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '../ui/alert-dialog';
import { useTransition, useState } from 'react';
import { deleteComment } from '@/actions/delete-comment';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type DeleteCommentButtonProps = {
	t: ReturnType<typeof useTranslations>;
	commentId: string;
	onDeleted?: () => void;
};

export function DeleteCommentButton({
	t,
	commentId,
	onDeleted,
}: DeleteCommentButtonProps) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [isOpen, setIsOpen] = useState(false);

	const handleDelete = () => {
		startTransition(async () => {
			const result = await deleteComment({ commentId });
			if (result.success) {
				toast.success(
					t('deleteSuccess', { defaultValue: 'Comment deleted' })
				);
				setIsOpen(false);
				onDeleted?.();
				router.refresh();
			} else {
				toast.error(
					t('deleteError', {
						defaultValue:
							result.error || 'Failed to delete comment',
					})
				);
			}
		});
	};

	return (
		<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
			<AlertDialogTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="h-6 w-6 sm:h-7 sm:w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
					title={t('deleteComment')}
					disabled={isPending}
				>
					<Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						{t('deleteConfirmTitle')}
					</AlertDialogTitle>
					<AlertDialogDescription>
						{t('deleteConfirmDescription')}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={isPending}>
						{t('cancel')}
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleDelete}
						disabled={isPending}
						className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
					>
						{isPending
							? t('deleting', { defaultValue: 'Deleting...' })
							: t('delete')}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
