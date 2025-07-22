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

type DeleteCommentButtonProps = {
	t: ReturnType<typeof useTranslations>;
};

export function DeleteCommentButton({ t }: DeleteCommentButtonProps) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="h-6 w-6 sm:h-7 sm:w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
					title={t('deleteComment')}
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
					<AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
					<AlertDialogAction
						onClick={() => {
							// handleDeleteComment(comment.id)
						}}
						className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
					>
						{t('delete')}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
