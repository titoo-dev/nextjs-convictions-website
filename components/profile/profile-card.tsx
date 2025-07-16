'use client';

import { Card, CardContent } from '../ui/card';
import { ProfileAvatar } from './profile-avatar';
import { ProfileEditButton } from './profile-edit-button';
import { ProfileInfo } from './profile-info';
import { ProfileLogoutButton } from './profile-logout-button';

type ProfileCardProps = {
	username: string;
	email: string;
	avatarUrl?: string;
};

export function ProfileCard({ username, email, avatarUrl }: ProfileCardProps) {
	return (
		<Card>
			<CardContent className="pt-6">
				<div className="flex flex-col items-center space-y-4">
					<ProfileAvatar username={username} avatarUrl={avatarUrl} />
					<ProfileInfo username={username} email={email} />
					<div className="w-full space-y-2">
						<ProfileEditButton
							user={{ name: username, picture: avatarUrl ?? '' }}
						/>
						<ProfileLogoutButton />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
