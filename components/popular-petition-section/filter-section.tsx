'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

type CategoryFilter = {
	id: string;
	labelKey: string;
	value: string;
};

const categories: CategoryFilter[] = [
	{ id: 'all', labelKey: 'all', value: 'ALL' },
	{ id: 'culture', labelKey: 'culture', value: 'CULTURE' },
	{ id: 'religion', labelKey: 'religion', value: 'RELIGION' },
	{ id: 'women-rights', labelKey: 'womenRights', value: 'WOMEN_RIGHTS' },
	{ id: 'men-rights', labelKey: 'menRights', value: 'MEN_RIGHTS' },
	{ id: 'education', labelKey: 'education', value: 'EDUCATION' },
	{ id: 'environment', labelKey: 'environment', value: 'ENVIRONMENT' },
	{ id: 'racism', labelKey: 'racism', value: 'RACISM' },
	{ id: 'politics', labelKey: 'politics', value: 'POLITICS' },
	{ id: 'handicap', labelKey: 'handicap', value: 'HANDICAP' },
	{ id: 'health', labelKey: 'health', value: 'HEALTH' },
	{ id: 'transport', labelKey: 'transport', value: 'TRANSPORT' },
	{ id: 'immigration', labelKey: 'immigration', value: 'IMMIGRATION' },
	{ id: 'justice', labelKey: 'justice', value: 'JUSTICE' },
	{ id: 'animals', labelKey: 'animals', value: 'ANIMALS' },
];

type FilterChipProps = {
	isActive: boolean;
	href: string;
	label: string;
};

function FilterChip({ isActive, href, label }: FilterChipProps) {
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
			{label}
		</Link>
	);
}

export function FilterSection() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const activeCategory = searchParams.get('category') || 'ALL';
	const t = useTranslations('petitions.categories');

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
							isActive={activeCategory === category.value}
							href={createPageUrl(category.value)}
							label={t(category.labelKey)}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
