import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"

type Props = {
    t: (key: string) => string
}

export function ProfilePetitionsTab({ t }: Props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    {t('petitions-description')}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-center py-12">
                    <div className="mx-auto size-16 bg-muted rounded-full flex items-center justify-center mb-4">
                        <User className="size-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">
                        {t('no-petitions-created')}
                    </p>
                    <Button className="mt-4">
                        {t('create-petition')}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
