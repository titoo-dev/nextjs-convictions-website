import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPetitionsGrid } from './user-petition-grid';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export async function ProfilePetitionsTab() {
	const t = await getTranslations('profile');

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle className="flex items-center gap-2">
					{t('petitions-description')}
				</CardTitle>
				<Button asChild>
					<Link href="/petition/new">{t('create-petition')}</Link>
				</Button>
			</CardHeader>
			<CardContent>
				<UserPetitionsGrid />
			</CardContent>
		</Card>
	);
}
