'use client';

import { useTranslations } from 'next-intl';
import { Button } from '../ui/button';
import { useState, useTransition } from 'react';
import { Edit3, Camera } from 'lucide-react';
import { Input } from '../ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import type { User } from '@/schemas/user';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from '../ui/dialog';
import { updateUser } from '@/actions/update-user';
import { toast } from 'sonner';

type ProfileEditButtonProps = {
	user: {
		name: string;
		picture: string;
	};
	onSave?: (updatedUser: Partial<User>) => void;
};

export function ProfileEditButton({ user, onSave }: ProfileEditButtonProps) {
	const t = useTranslations('profile');
	const [isOpen, setIsOpen] = useState(false);
	const [previewUrl, setPreviewUrl] = useState(
		user.picture || '/placeholder-avatar.jpg'
	);
	const [isPending, startTransition] = useTransition();

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const url = URL.createObjectURL(file);
			setPreviewUrl(url);
		}
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		startTransition(async () => {
			try {
				const formData = new FormData(event.currentTarget);
				const name = formData.get('name') as string;
				const picture = formData.get('picture') as File | null;

				const updateData: { name?: string; picture?: File } = {};

				if (name && name.trim() !== user.name) {
					updateData.name = name.trim();
				}

				if (picture && picture.size > 0) {
					updateData.picture = picture;
				}

				const result = await updateUser(updateData);

				if (!result) {
					toast.error(t('updateError'));
					return;
				}

				if (result.success) {
					toast.success(t('updateSuccess'));
					onSave?.({
						name: name || user.name,
						...(picture &&
							picture.size > 0 && { picture: picture.name }),
					});
					setIsOpen(false);
				} else {
					toast.error(result.error || t('updateError'));
				}
			} catch (error) {
				console.error('Update user error:', error);
				toast.error(t('updateError'));
			}
		});
	};

	const handleCancel = () => {
		setPreviewUrl(user.picture);
		setIsOpen(false);
	};

	return (
		<>
			<Button
				variant="outline"
				className="w-full justify-start"
				onClick={() => setIsOpen(true)}
			>
				<Edit3 className="size-4" />
				{t('modify')}
			</Button>

			<Dialog
				open={isOpen}
				onOpenChange={(state) => {
					setIsOpen(state);
					if (!state) handleCancel();
				}}
			>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>{t('editProfile')}</DialogTitle>
					</DialogHeader>

					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="flex flex-col items-center space-y-4">
							<div className="relative">
								<Avatar className="size-20">
									<AvatarImage
										src={previewUrl}
										alt={user.name}
										className="object-cover"
									/>
									<AvatarFallback>
										{user.name.charAt(0).toUpperCase()}
									</AvatarFallback>
								</Avatar>
								<label
									htmlFor="picture"
									className="absolute -bottom-1 -right-1 flex size-7 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md hover:bg-primary/90"
								>
									<Camera className="size-3" />
								</label>
								<input
									id="picture"
									name="picture"
									type="file"
									accept="image/*"
									className="hidden"
									onChange={handleImageChange}
									disabled={isPending}
								/>
							</div>
						</div>

						<div className="space-y-2">
							<label
								htmlFor="name"
								className="text-sm font-medium"
							>
								{t('name')}
							</label>
							<Input
								id="name"
								name="name"
								defaultValue={user.name}
								placeholder={t('enterName')}
								disabled={isPending}
							/>
						</div>

						<DialogFooter>
							<Button
								type="button"
								variant="outline"
								onClick={handleCancel}
								disabled={isPending}
							>
								{t('cancel')}
							</Button>
							<Button type="submit" disabled={isPending}>
								{isPending ? t('saving') : t('save')}
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
}
