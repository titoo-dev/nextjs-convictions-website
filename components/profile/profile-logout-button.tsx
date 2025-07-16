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
import { useTransition } from 'react';
import { LogOut, Loader2 } from 'lucide-react';
import { logout } from '@/actions/logout';

export function ProfileLogoutButton() {
	const t = useTranslations('profile');
	const [isPending, startTransition] = useTransition();

	const handleLogout = () => {
		startTransition(async () => {
			await logout();
		});
	};

	return (
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
	);
}
