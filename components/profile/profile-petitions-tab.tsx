import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserPetitionsGrid } from "./user-petition-grid"

type Props = {
    t: (key: string) => string
}

export async function ProfilePetitionsTab({ t }: Props) {

    return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle className="flex items-center gap-2">
					{t('petitions-description')}
				</CardTitle>
				<Button>{t('create-petition')}</Button>
			</CardHeader>
			<CardContent>
				<UserPetitionsGrid />
			</CardContent>
		</Card>
	);
}
