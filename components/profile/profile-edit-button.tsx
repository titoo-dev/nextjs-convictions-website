'use client';

import { useTranslations } from 'next-intl';
import { Button } from '../ui/button';
import { useState } from 'react';
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
	const [name, setName] = useState(user.name);
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState(
		user.picture || '/placeholder-avatar.jpg'
	);

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setSelectedImage(file);
			const url = URL.createObjectURL(file);
			setPreviewUrl(url);
		}
	};

	const handleSave = () => {
		onSave?.({
			name,
			...(selectedImage && { picture: selectedImage.name }),
		});
		setIsOpen(false);
	};

	const handleCancel = () => {
		setName(user.name);
		setSelectedImage(null);
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

			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>{t('editProfile')}</DialogTitle>
					</DialogHeader>

					<div className="space-y-6">
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
									htmlFor="image-upload"
									className="absolute -bottom-1 -right-1 flex size-7 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md hover:bg-primary/90"
								>
									<Camera className="size-3" />
								</label>
								<input
									id="image-upload"
									type="file"
									accept="image/*"
									className="hidden"
									onChange={handleImageChange}
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
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder={t('enterName')}
							/>
						</div>
					</div>

					<DialogFooter>
						<Button variant="outline" onClick={handleCancel}>
							{t('cancel')}
						</Button>
						<Button onClick={handleSave}>{t('save')}</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
