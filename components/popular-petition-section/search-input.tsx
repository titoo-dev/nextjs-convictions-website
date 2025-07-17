'use client';

import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '../ui/input';

export function SearchInput() {
	const t = useTranslations('search');
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const handleSearch = useDebouncedCallback((term: string) => {
		const params = new URLSearchParams(searchParams);

		if (term) {
			params.set('search', term);
		} else {
			params.delete('search');
		}

		replace(`${pathname}?${params.toString()}`, { scroll: false });
	}, 150);

	return (
		<div className="mb-8 max-w-2xl mx-auto">
			<div className="relative">
				<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
				<Input
					placeholder={t('placeholder')}
					onChange={(e) => handleSearch(e.target.value)}
					defaultValue={searchParams.get('search')?.toString()}
					className="pl-10 h-12 text-base"
				/>
			</div>
		</div>
	);
}
