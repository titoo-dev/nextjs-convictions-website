import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPetitionsGrid } from './user-petition-grid';
import { getTranslations } from 'next-intl/server';

export async function ProfilePetitionsTab() {
	const t = await getTranslations('profile');

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle className="flex items-center gap-2">
					{t('petitions-description')}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<UserPetitionsGrid />
			</CardContent>
		</Card>
	);
}
