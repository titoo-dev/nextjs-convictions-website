import { useTranslations } from "next-intl";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Edit3, LogOut, User } from "lucide-react";
import { Button } from "../ui/button";

type ProfileCardProps = {
	username: string;
	email: string;
	avatarUrl?: string;
};

export function ProfileCard({ username, email, avatarUrl }: ProfileCardProps) {
	const t = useTranslations('header.userProfile');

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

						<Button
							variant="outline"
							className="w-full justify-start"
						>
							<LogOut className="size-4" />
							{t('logout')}
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
