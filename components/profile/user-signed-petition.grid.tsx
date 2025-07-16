import { getUserSignedPetitions } from "@/actions/get-user-singed-petitions";
import { getTranslations } from "next-intl/server";
import { Button } from "../ui/button";
import { UserSignedPetitionCard } from "./user-signed-petition-card";

export async function UserSignedPetitionsGrid() {
    const t = await getTranslations('profile.petitions');

    const signedPetitions = await getUserSignedPetitions();

    if (!signedPetitions || signedPetitions.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">
                    {t('no-signed-petitions')}
                </p>
                <Button className="mt-4">
                    {t('browse-petitions')}
                </Button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {signedPetitions.map((petition) => (
                <UserSignedPetitionCard
                    key={petition.id}
                    petition={petition}
                />
            ))}
        </div>
    );
}