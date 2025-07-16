'use client';
import { User as UserIcon, LogOut, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTranslations } from 'next-intl';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User } from '@/schemas/user';
import Link from 'next/link';
import { useTransition } from 'react';
import { logout } from '@/actions/logout';
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

type UserMenuProps = {
	user?: User;
};

export function UserMenu({ user }: UserMenuProps) {
	const t = useTranslations('header');
	const [isPending, startTransition] = useTransition();

	const userInitials = user?.name
		? user.name
				.split(' ')
				.map((n) => n[0])
				.join('')
				.toUpperCase()
				.slice(0, 2)
		: 'U';

	const handleLogout = () => {
		startTransition(async () => {
			await logout();
		});
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="relative h-8 w-8 rounded-full ring-offset-background transition-all hover:ring-2 hover:ring-ring hover:ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
					<Avatar className="h-8 w-8">
						<AvatarImage
							src={user?.picture || ''}
							alt={user?.name || ''}
						/>
						<AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
							{userInitials}
						</AvatarFallback>
					</Avatar>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">
							{user?.name || t('guest')}
						</p>
						{user?.email && (
							<p className="text-xs leading-none text-muted-foreground">
								{user.email}
							</p>
						)}
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link
						href="/profile"
						className="cursor-pointer flex items-center w-full"
					>
						<UserIcon className="mr-2 h-4 w-4" />
						<span>{t('profile')}</span>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<DropdownMenuItem
							onSelect={(e) => e.preventDefault()}
							className="cursor-pointer text-red-600 focus:text-red-600"
							disabled={isPending}
						>
							<LogOut className="mr-2 h-4 w-4" />
							<span>{t('logout')}</span>
						</DropdownMenuItem>
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
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
