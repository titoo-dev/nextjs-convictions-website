import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"
import { getTranslations } from "next-intl/server"

export async function ProfileSignaturesTab() {
    const t = await getTranslations('profile');

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('my-signatures')}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-center py-12">
                    <div className="mx-auto size-16 bg-muted rounded-full flex items-center justify-center mb-4">
                        <User className="size-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">
                        {t('no-signatures')}
                    </p>
                    <Button className="mt-4">
                        {t('discover-petitions')}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
