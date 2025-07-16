import { UserPetitionCardSkeleton } from "./user-petition-card-skeleton";

export function UserPetitionsGridSkeleton({ count = 4 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Array.from({ length: count }).map((_, index) => (
                <UserPetitionCardSkeleton key={index} />
            ))}
        </div>
    );
}