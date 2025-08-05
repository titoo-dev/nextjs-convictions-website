'use client';

import { Card, CardContent } from '@/components/ui/card';
import { PublicPetition } from '@/schemas/petition';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import { Flag } from 'lucide-react';
import { useTranslations } from 'next-intl';
import RenderWhen from '../render-when';
import { ReportDialog } from './report-dialog';
import { User } from '@/schemas/user';
import { LoginDialog } from '../header/login-dialog';

type PetitionContentProps = {
	petition: PublicPetition;
	currentUser: User | null;
};

export function PetitionContent({
	petition,
	currentUser,
}: PetitionContentProps) {
	const t = useTranslations('petition.author');

	const parseContent = (content: string) => {
		try {
			const deltaOps = JSON.parse(content);
			const converter = new QuillDeltaToHtmlConverter(deltaOps, {});
			return converter.convert();
		} catch (error) {
			console.error('Failed to parse petition content:', error);
			return content;
		}
	};

	const htmlContent = parseContent(petition.content);

	const ReportButton = (
		<span
			className="w-full md:w-max md:ml-auto self-end sm:self-auto text-xs sm:text-sm whitespace-nowrap cursor-pointer underline inline-flex items-center text-gray-600 hover:text-gray-800"
			tabIndex={0}
			role="button"
		>
			<Flag className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
			{t('reportPolicy')}
		</span>
	);

	return (
		<Card className="shadow-none">
			<CardContent className="space-y-3">
				<div
					className="prose prose-sm max-w-none text-sm sm:text-base text-gray-700 leading-relaxed"
					dangerouslySetInnerHTML={{ __html: htmlContent }}
				/>
				<RenderWhen condition={!!currentUser}>
					<ReportDialog petitionId={petition.id}>
						{ReportButton}
					</ReportDialog>
				</RenderWhen>

				<RenderWhen condition={!currentUser}>
					<LoginDialog trigger={ReportButton} />
				</RenderWhen>
			</CardContent>
		</Card>
	);
}
