'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

type CategoryFilter = {
	id: string;
	label: string;
	value: string;
};

const categories: CategoryFilter[] = [
	{ id: 'all', label: 'Toutes', value: 'ALL' },
	{ id: 'culture', label: 'Culture', value: 'CULTURE' },
	{ id: 'religion', label: 'Religion', value: 'RELIGION' },
	{ id: 'women-rights', label: 'Droits des femmes', value: 'WOMEN_RIGHTS' },
	{ id: 'men-rights', label: 'Droits des hommes', value: 'MEN_RIGHTS' },
	{ id: 'education', label: 'Éducation', value: 'EDUCATION' },
	{ id: 'environment', label: 'Environnement', value: 'ENVIRONMENT' },
	{ id: 'racism', label: 'Racisme', value: 'RACISM' },
	{ id: 'politics', label: 'Politique', value: 'POLITICS' },
	{ id: 'handicap', label: 'Handicap', value: 'HANDICAP' },
	{ id: 'health', label: 'Santé', value: 'HEALTH' },
	{ id: 'transport', label: 'Transport', value: 'TRANSPORT' },
	{ id: 'immigration', label: 'Immigration', value: 'IMMIGRATION' },
	{ id: 'justice', label: 'Justice', value: 'JUSTICE' },
	{ id: 'animals', label: 'Animaux', value: 'ANIMALS' },
];

type FilterChipProps = {
	category: CategoryFilter;
	isActive: boolean;
	href: string;
};

function FilterChip({ category, isActive, href }: FilterChipProps) {
	return (
		<Link
            href={href}
            scroll={false}
			className={cn(
				'inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium',
				'border border-border focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
				'min-w-0 whitespace-nowrap transition-colors',
				isActive
					? 'bg-primary text-primary-foreground border-primary shadow-sm'
					: 'bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent'
			)}
		>
			{category.label}
		</Link>
	);
}

export function FilterSection() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const activeCategory = searchParams.get('category') || 'ALL';

	const createPageUrl = (value: string) => {
		const params = new URLSearchParams(searchParams);

		if (value === 'ALL') {
			params.delete('category');
		} else {
			params.set('category', value);
		}

		return `${pathname}?${params.toString()}`;
	};

	return (
		<div className="mb-8">
			<div className="flex flex-col gap-4">
				<div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
					{categories.map((category) => (
						<FilterChip
							key={category.id}
							category={category}
							isActive={activeCategory === category.value}
							href={createPageUrl(category.value)}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
