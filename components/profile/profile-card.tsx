'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
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
import { useTransition } from 'react';
import { Edit3, LogOut, User, Loader2 } from 'lucide-react';
import { logout } from '@/actions/logout';

type ProfileCardProps = {
	username: string;
	email: string;
	avatarUrl?: string;
};

export function ProfileCard({ username, email, avatarUrl }: ProfileCardProps) {
	const t = useTranslations('profile');
	const [isPending, startTransition] = useTransition();

	const handleLogout = () => {
		startTransition(async () => {
			await logout();
		});
	};

	return (
		<Card>
			<CardContent className="pt-6">
				<div className="flex flex-col items-center space-y-4">
					<Avatar className="size-20">
						<AvatarImage
							src={avatarUrl || '/placeholder-avatar.jpg'}
							alt={username}
						/>
						<AvatarFallback className="bg-orange-500 text-white text-lg">
							<User className="size-8" />
						</AvatarFallback>
					</Avatar>

					<div className="text-center">
						<h2 className="text-xl font-semibold">{username}</h2>
						<p className="text-muted-foreground text-sm">{email}</p>
					</div>

					<div className="w-full space-y-2">
						<Button
							variant="outline"
							className="w-full justify-start"
						>
							<Edit3 className="size-4" />
							{t('modify')}
						</Button>

						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button
									variant="outline"
									className="w-full justify-start"
									disabled={isPending}
								>
									{isPending ? (
										<Loader2 className="size-4 animate-spin" />
									) : (
										<LogOut className="size-4" />
									)}
									{t('logout')}
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>
										{t('logoutConfirmTitle')}
									</AlertDialogTitle>
									<AlertDialogDescription>
										{t('logoutConfirmDescription')}
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel disabled={isPending}>
										{t('cancel')}
									</AlertDialogCancel>
									<AlertDialogAction
										onClick={handleLogout}
										disabled={isPending}
									>
										{isPending && (
											<Loader2 className="size-4 animate-spin mr-2" />
										)}
										{t('logout')}
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
