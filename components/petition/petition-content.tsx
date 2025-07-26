'use client';

import { Card, CardContent } from '@/components/ui/card';
import { PublicPetition } from '@/schemas/petition';
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
			const {
				QuillDeltaToHtmlConverter,
			} = require('quill-delta-to-html');
			const deltaOps = JSON.parse(content);
			const converter = new QuillDeltaToHtmlConverter(deltaOps, {});
			return converter.convert();
		} catch (error) {
			console.error('Failed to parse petition content:', error);
			return content;
		}
	};

	const htmlContent = parseContent(petition.content);

	return (
		<Card className="shadow-none">
			<CardContent>
				<div
					className="prose prose-sm max-w-none text-sm sm:text-base text-gray-700 leading-relaxed"
					dangerouslySetInnerHTML={{ __html: htmlContent }}
				/>
			</CardContent>
		</Card>
	);
}
