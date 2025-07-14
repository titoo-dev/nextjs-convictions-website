'use client';

import { Card, CardContent } from '@/components/ui/card';
import { PublicPetition } from '@/schemas/public-petition';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

type PetitionContentProps = {
	petition: PublicPetition;
};

type ContentItem = {
	insert: string | { image: string };
};

export function PetitionContent({ petition }: PetitionContentProps) {
	const t = useTranslations('petition.content');

	const parseContent = (content: string) => {
		try {
			return JSON.parse(content);
		} catch (error) {
			console.error('Failed to parse petition content:', error);
			return [];
		}
	};

	const contentArray = parseContent(petition.content);

	return (
		<Card className="shadow-none">
			<CardContent>
				<div className="prose prose-sm max-w-none">
					{contentArray.map((item: ContentItem, index: number) => {
						if (typeof item.insert === 'string') {
							return (
								<p
									key={index}
									className="mb-3 sm:mb-4 text-sm sm:text-base text-gray-700 leading-relaxed break-words"
								>
									{item.insert}
								</p>
							);
						} else if (item.insert && typeof item.insert === 'object' && 'image' in item.insert) {
							return (
								<div key={index} className="mb-3 sm:mb-4">
									<Image
										src={item.insert.image}
										alt={t('imageAlt')}
										width={800}
										height={400}
										className="w-full h-auto rounded-md"
									/>
								</div>
							);
						}
						return null;
					})}
				</div>
			</CardContent>
		</Card>
	);
}
