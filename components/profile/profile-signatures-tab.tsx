import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getTranslations } from "next-intl/server"
import { UserSignedPetitionsGrid } from "./user-signed-petition.grid";

export async function ProfileSignaturesTab() {
    const t = await getTranslations('profile');

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('my-signatures')}</CardTitle>
            </CardHeader>
            <CardContent>
                <UserSignedPetitionsGrid />
            </CardContent>
        </Card>
    )
}
