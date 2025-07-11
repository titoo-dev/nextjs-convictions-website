'use client';

import { Card, CardContent } from '@/components/ui/card';
import { PublicPetition } from '@/schemas/public-petition';

type PetitionContentProps = {
    petition: PublicPetition;
};

type ContentItem = {
    insert: string;
};

export function PetitionContent({ petition }: PetitionContentProps) {
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
					{contentArray.map((item: ContentItem, index: number) => (
						<p
							key={index}
							className="mb-4 text-gray-700 leading-relaxed"
						>
							{item.insert}
						</p>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
