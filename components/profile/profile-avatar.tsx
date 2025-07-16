import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { User } from 'lucide-react';

type ProfileAvatarProps = {
	username: string;
	avatarUrl?: string;
};

export function ProfileAvatar({ username, avatarUrl }: ProfileAvatarProps) {
	return (
		<Avatar className="size-20">
			<AvatarImage
				src={avatarUrl || '/placeholder-avatar.jpg'}
				alt={username}
				className="object-cover"
			/>
			<AvatarFallback className="bg-orange-500 text-white text-lg">
				<User className="size-8" />
			</AvatarFallback>
		</Avatar>
	);
}
