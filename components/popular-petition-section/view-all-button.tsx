import Link from "next/link";
import { Button } from "../ui/button";

export function ViewAllButton() {
    return (
        <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
                <Link href="/petitions">
                    Voir toutes les pétitions
                </Link>
            </Button>
        </div>
    );
}