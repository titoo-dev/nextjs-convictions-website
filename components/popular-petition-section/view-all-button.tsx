import Link from "next/link";
import { Button } from "../ui/button";
import { useTranslations } from 'next-intl';

export function ViewAllButton() {
	const t = useTranslations('petitions');

    return (
        <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
                <Link href="/petitions">
                    {t('viewAll')}
                </Link>
            </Button>
        </div>
    );
}