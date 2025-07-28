'use client';

import { useState, useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	PenTool,
	Target,
	FileText,
	Image as ImageIcon,
	Users,
	Globe,
	ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';

import { StepIndicator } from '@/components/petition/form/step-indicator';
import {
	TitleStep,
	validateTitleStep,
} from '@/components/petition/form/steps/title-step';
import {
	ObjectiveStep,
	validateObjectiveStep,
} from '@/components/petition/form/steps/objective-step';
import {
	WritingStep,
	validateWritingStep,
} from '@/components/petition/form/steps/writing-step';
import {
	MediaStep,
	validateMediaStep,
} from '@/components/petition/form/steps/media-step';
import {
	SignaturesStep,
	validateSignaturesStep,
} from '@/components/petition/form/steps/signatures-step';
import {
	PublishStep,
	validatePublishStep,
} from '@/components/petition/form/steps/publish-step';
import { LoginDialog } from '@/components/header/login-dialog';
import RenderWhen from '@/components/render-when';
import { User } from '@/schemas/user';
import { PetitionToUpdate } from '@/schemas/petition-to-update';

type Step =
	| 'title'
	| 'objective'
	| 'writing'
	| 'media'
	| 'signatures'
	| 'publish';

export type PetitionFormData = {
	category: string;
	title: string;
	objective: string;
	content: string;
	destination: string;
	mediaType: 'PICTURE' | 'VIDEO_YOUTUBE';
	picture: File | null;
	pictureId: string | null;
	currentStep?: Step;
	videoYoutubeUrl?: string;
	signatureGoal: number;
	publishNow?: boolean;
	scheduledDate?: string;
	scheduledTime?: string;
	editorOps?: string;
	pictureUrl?: string;
};

type EditPetitionClientProps = {
	currentUser: User | null;
	petition: PetitionToUpdate;
};

export function EditPetitionClient({
	currentUser,
	petition,
}: EditPetitionClientProps) {
	const tPage = useTranslations('petition.form.page');
	const tSteps = useTranslations('petition.form.steps');
	const locale = useLocale().toUpperCase();
	const [isPending] = useTransition();

	const [currentStep, setCurrentStep] = useState<Step>('title');
	const [formData, setFormData] = useState<PetitionFormData>({
		category: petition.category.toLowerCase(),
		title: petition.title,
		objective: petition.objective,
		content: petition.contentFr ?? '',
		destination: petition.destination,
		mediaType: petition.mediaType,
		signatureGoal: petition.signatureGoal,
		videoYoutubeUrl: petition.videoYoutubeUrl ?? '',
		picture: null,
		pictureId: null,
		pictureUrl: petition.pictureUrl,
	});

	const steps: { id: Step; title: string; icon: React.ReactNode }[] = [
		{
			id: 'title',
			title: tSteps('title'),
			icon: <PenTool className="w-4 h-4" />,
		},
		{
			id: 'objective',
			title: tSteps('objective'),
			icon: <Target className="w-4 h-4" />,
		},
		{
			id: 'writing',
			title: tSteps('writing'),
			icon: <FileText className="w-4 h-4" />,
		},
		{
			id: 'media',
			title: tSteps('media'),
			icon: <ImageIcon className="w-4 h-4" />,
		},
		{
			id: 'signatures',
			title: tSteps('signatures'),
			icon: <Users className="w-4 h-4" />,
		},
		{
			id: 'publish',
			title: tSteps('publish'),
			icon: <Globe className="w-4 h-4" />,
		},
	];

	const currentStepIndex = steps.findIndex((step) => step.id === currentStep);

	const handleNext = () => {
		const currentIndex = steps.findIndex((step) => step.id === currentStep);
		if (currentIndex < steps.length - 1) {
			const nextStep = steps[currentIndex + 1].id;
			setCurrentStep(nextStep);
		}
	};

	const handlePrevious = () => {
		const currentIndex = steps.findIndex((step) => step.id === currentStep);
		if (currentIndex > 0) {
			const prevStep = steps[currentIndex - 1].id;
			setCurrentStep(prevStep);
		}
	};

	const updateFormData = (updates: Partial<PetitionFormData>) => {
		setFormData((prev) => ({ ...prev, ...updates }));
	};

	const mapCategoryToAPI = (category: string) => {
		const categoryMap: Record<string, string> = {
			womenRights: 'WOMEN_RIGHTS',
			menRights: 'MEN_RIGHTS',
			culture: 'CULTURE',
			religion: 'RELIGION',
			education: 'EDUCATION',
			environment: 'ENVIRONMENT',
			racism: 'RACISM',
			politics: 'POLITICS',
			handicap: 'HANDICAP',
			health: 'HEALTH',
			transport: 'TRANSPORT',
			immigration: 'IMMIGRATION',
			justice: 'JUSTICE',
			animals: 'ANIMALS',
		};
		return categoryMap[category] || 'CULTURE';
	};

	const handleUpdate = () => {
		const dataToSend = {
			id: petition.id,
			category: mapCategoryToAPI(formData.category),
			title: formData.title,
			objective: formData.objective,
			destination: formData.destination,
			content: formData.editorOps ?? formData.content,
			languageOrigin: locale,
			creationStep: 6,
			mediaType: formData.mediaType,
			videoYoutubeUrl: formData.videoYoutubeUrl ?? '',
			pictureId: '',
			signatureGoal: formData.signatureGoal,
		};

		console.log(dataToSend);

		// startTransition(async () => {
		// 	try {
		// 		const loadingToast = toast.loading(tPage('updating'));

		// 		const result = await updatePetition({
		// 			data: dataToSend,
		// 			picture: formData.picture,
		// 		});

		// 		toast.dismiss(loadingToast);

		// 		if (!result) {
		// 			toast.error(tPage('authRequired'));
		// 			return;
		// 		}

		// 		if (result.success) {
		// 			toast.success(tPage('updateSuccess'));
		// 			router.push(result.data?.urlPetition ?? '/');
		// 		} else {
		// 			toast.error(result.error || tPage('updateError'));
		// 		}
		// 	} catch (error) {
		// 		console.error(
		// 			'Unexpected error during petition update:',
		// 			error
		// 		);
		// 		const { toast } = await import('sonner');
		// 		toast.error(tPage('unexpectedError'));
		// 	}
		// });
	};

	const isCurrentStepValid = (): boolean => {
		switch (currentStep) {
			case 'title':
				return validateTitleStep(formData);
			case 'objective':
				return validateObjectiveStep(formData);
			case 'writing':
				return validateWritingStep(formData);
			case 'media':
				return validateMediaStep(formData);
			case 'signatures':
				return validateSignaturesStep(formData);
			case 'publish':
				return validatePublishStep(formData);
			default:
				return false;
		}
	};

	const renderStepContent = () => {
		switch (currentStep) {
			case 'title':
				return (
					<TitleStep
						formData={formData}
						updateFormData={updateFormData}
					/>
				);
			case 'objective':
				return (
					<ObjectiveStep
						formData={formData}
						updateFormData={updateFormData}
					/>
				);
			case 'writing':
				return (
					<WritingStep
						formData={formData}
						updateFormData={updateFormData}
					/>
				);
			case 'media':
				return (
					<MediaStep
						formData={formData}
						updateFormData={updateFormData}
					/>
				);
			case 'signatures':
				return (
					<SignaturesStep
						formData={formData}
						updateFormData={updateFormData}
					/>
				);
			case 'publish':
				return (
					<PublishStep
						formData={formData}
						updateFormData={updateFormData}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="container mx-auto px-4 max-w-4xl">
				<div className="mb-6">
					<Link
						href="/"
						className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 group"
					>
						<ArrowLeft className="w-4 h-4" />
						<span className="text-sm font-medium">
							{tPage('back')}
						</span>
					</Link>
				</div>

				<div className="mb-4">
					<div className="flex items-center justify-between mb-4">
						<h1 className="text-3xl font-bold">
							{tPage('editTitle')}
						</h1>
					</div>

					<StepIndicator
						steps={steps}
						currentStepIndex={currentStepIndex}
					/>
				</div>

				<div className="flex justify-between mb-6">
					<Button
						variant="outline"
						onClick={handlePrevious}
						disabled={currentStepIndex === 0 || isPending}
						className="flex items-center gap-2"
					>
						{tPage('previous')}
					</Button>

					<RenderWhen
						condition={currentStep === 'publish' && !currentUser}
						fallback={
							<Button
								onClick={
									currentStep === 'publish'
										? handleUpdate
										: handleNext
								}
								disabled={!isCurrentStepValid() || isPending}
								className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{isPending && currentStep === 'publish' ? (
									<>
										<div className="w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
										{tPage('updating')}
									</>
								) : currentStep === 'publish' ? (
									tPage('updatePetition')
								) : (
									tPage('next')
								)}
							</Button>
						}
					>
						<LoginDialog
							trigger={
								<Button
									disabled={
										!isCurrentStepValid() || isPending
									}
									className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
								>
									{tPage('updatePetition')}
								</Button>
							}
						/>
					</RenderWhen>
				</div>

				<Card className="mb-8 shadow-none">
					<CardContent className="p-6">
						{renderStepContent()}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
