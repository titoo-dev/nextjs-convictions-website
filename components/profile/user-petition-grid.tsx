import { UserPetitionCard } from "./user-petition-card";
import { getUserPetitions } from "@/actions/get-user-petitions";
import { getTranslations } from "next-intl/server";
import { Button } from "../ui/button";

export async function UserPetitionsGrid() {

    const t = await getTranslations('profile.petitions');

    const petitions = await getUserPetitions();

    if (!petitions || petitions.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">
                    {t('no-petitions-created')}
                </p>
                <Button className="mt-4">
                    {t('create-petition')}
                </Button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {petitions.map((petition) => (
                <UserPetitionCard
                    key={petition.id}
                    petition={petition}
                />
            ))}
        </div>
    );
}