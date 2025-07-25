'use client';

import { UserPetition } from '@/schemas/user-petition';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
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
import { useTransition } from 'react';
import { deletePetition } from '@/actions/delete-petition';
import { PetitionMedia } from '../popular-petition-section/petition-media';

export function UserPetitionCard({ petition }: { petition: UserPetition }) {
	const t = useTranslations('profile.petitions');
	const [isPending, startTransition] = useTransition();

	const handleEdit = (id: string) => {
		console.log('Edit petition with ID:', id);
	};

	const handleDelete = (id: string) => {
		startTransition(async () => {
			const result = await deletePetition(id);
			if (!result.success) {
				console.error('Failed to delete petition:', result.error);
				// You might want to show a toast notification here
			}
		});
	};

	return (
		<Card className="flex flex-col h-full">
			<CardHeader className="flex-1">
				<PetitionMedia
					mediaType={petition.mediaType}
					videoYoutubeUrl={petition.videoYoutubeUrl}
					pictureUrl={petition.pictureUrl}
					title={petition.title}
				/>
				<CardTitle className="text-xl line-clamp-2 min-h-[3.5rem]">
					{petition.title}
				</CardTitle>
				<p className="text-muted-foreground line-clamp-3">
					{petition.objective}
				</p>
			</CardHeader>
			<CardContent className="pt-0">
				<div className="flex items-center justify-between">
					<div className="text-sm text-muted-foreground">
						{t('signatures-count', {
							count: petition.usersSignedNumber,
						})}
					</div>
					<div className="flex gap-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => handleEdit(petition.id)}
							className="h-8 w-8 p-0"
							disabled={isPending}
						>
							<Edit className="h-4 w-4" />
						</Button>
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button
									variant="outline"
									size="sm"
									className="h-8 w-8 p-0 text-destructive hover:text-destructive"
									disabled={isPending}
								>
									<Trash2 className="h-4 w-4" />
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>
										{t('delete-confirmation.title')}
									</AlertDialogTitle>
									<AlertDialogDescription>
										{t('delete-confirmation.description')}
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel disabled={isPending}>
										{t('delete-confirmation.cancel')}
									</AlertDialogCancel>
									<AlertDialogAction
										onClick={() =>
											handleDelete(petition.id)
										}
										className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
										disabled={isPending}
									>
										{isPending
											? t('delete-confirmation.deleting')
											: t('delete-confirmation.confirm')}
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
