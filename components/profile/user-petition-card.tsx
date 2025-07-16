'use client';

import { UserPetition } from '@/schemas/user-petition';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';

export function UserPetitionCard({ petition }: { petition: UserPetition }) {
	const t = useTranslations('profile.petitions');

	const handleEdit = (id: string) => {
		console.log('Edit petition with ID:', id);
	};

	const handleDelete = (id: string) => {
		console.log('Delete petition with ID:', id);
	};

	return (
		<Card className="flex flex-col h-full">
			<CardHeader className="flex-1">
				<div className="relative">
					{petition.mediaType === 'PICTURE' && petition.pictureUrl ? (
						<Image
							src={petition.pictureUrl}
							alt={petition.title}
							width={400}
							height={192}
							className="w-full h-48 object-cover rounded-md"
						/>
					) : petition.mediaType === 'VIDEO_YOUTUBE' &&
					  petition.videoYoutubeUrl ? (
						<div className="w-full h-48 bg-muted rounded-md flex items-center justify-center">
							<span className="text-muted-foreground">
								YouTube Video
							</span>
						</div>
					) : (
						<div className="w-full h-48 bg-muted rounded-md flex items-center justify-center">
							<span className="text-muted-foreground">
								{t('no-media')}
							</span>
						</div>
					)}
				</div>
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
						>
							<Edit className="h-4 w-4" />
						</Button>
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button
									variant="outline"
									size="sm"
									className="h-8 w-8 p-0 text-destructive hover:text-destructive"
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
									<AlertDialogCancel>
										{t('delete-confirmation.cancel')}
									</AlertDialogCancel>
									<AlertDialogAction
										onClick={() => handleDelete(petition.id)}
										className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
									>
										{t('delete-confirmation.confirm')}
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
