'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
	PenTool,
	Target,
	FileText,
	Image as ImageIcon,
	Users,
	Globe,
	ArrowLeft,
	RotateCcw,
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
import {
	petitionLocalStorage,
	type PetitionFormData,
} from '@/lib/local-storage';

type Step =
	| 'title'
	| 'objective'
	| 'writing'
	| 'media'
	| 'signatures'
	| 'publish';

type PetitionData = {
	category: string;
	title: string;
	objective: string;
	content: string;
	destination: string;
	mediaType: 'PICTURE' | 'VIDEO_YOUTUBE';
	pictureUrl?: string;
	videoYoutubeUrl?: string;
	signatureGoal: number;
	publishNow?: boolean;
	scheduledDate?: string;
	scheduledTime?: string;
};

export default function NewPetitionPage() {
	const tPage = useTranslations('petition.form.page');
	const tSteps = useTranslations('petition.form.steps');

	const [currentStep, setCurrentStep] = useState<Step>('title');
	const [formData, setFormData] = useState<PetitionData>({
		category: '',
		title: '',
		objective: '',
		content: '',
		destination: '',
		mediaType: 'PICTURE',
		signatureGoal: 1000,
	});
	const [hasLoadedFromStorage, setHasLoadedFromStorage] = useState(false);
	const [showDraftRestored, setShowDraftRestored] = useState(false);

	// Load form data from localStorage on component mount
	useEffect(() => {
		const savedData = petitionLocalStorage.load();
		if (savedData) {
			setFormData({
				category: savedData.category || '',
				title: savedData.title || '',
				objective: savedData.objective || '',
				content: savedData.content || '',
				destination: savedData.destination || '',
				mediaType: savedData.mediaType || 'PICTURE',
				pictureUrl: savedData.pictureUrl,
				videoYoutubeUrl: savedData.videoYoutubeUrl,
				signatureGoal: savedData.signatureGoal || 1000,
				publishNow: savedData.publishNow,
				scheduledDate: savedData.scheduledDate,
				scheduledTime: savedData.scheduledTime,
			});

			// Restore current step if available
			if (
				savedData.currentStep &&
				steps.some((step) => step.id === savedData.currentStep)
			) {
				setCurrentStep(savedData.currentStep as Step);
			}

			setShowDraftRestored(true);

			// Hide the notification after 5 seconds
			setTimeout(() => setShowDraftRestored(false), 5000);
		}
		setHasLoadedFromStorage(true);
	}, []);

	// Save form data to localStorage whenever formData changes (but only after initial load)
	useEffect(() => {
		if (hasLoadedFromStorage) {
			const dataToSave: PetitionFormData = {
				...formData,
				currentStep,
			};
			petitionLocalStorage.save(dataToSave);
		}
	}, [formData, currentStep, hasLoadedFromStorage]);

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

	const updateFormData = (updates: Partial<PetitionData>) => {
		setFormData((prev) => ({ ...prev, ...updates }));
	};

	const handlePublish = () => {
		console.log('Publish petition', formData);

		// Clear the draft from localStorage after successful publish
		petitionLocalStorage.clear();

		// Here you would typically redirect to the published petition or success page
		// For now, we'll just log the action
		console.log('Draft cleared from localStorage after publish');
	};

	const handleClearDraft = () => {
		petitionLocalStorage.clear();
		setFormData({
			category: '',
			title: '',
			objective: '',
			content: '',
			destination: '',
			mediaType: 'PICTURE',
			signatureGoal: 1000,
		});
		setCurrentStep('title');
		setShowDraftRestored(false);
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
				{/* Back Navigation */}
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

				{/* Draft Restored Notification */}
				{showDraftRestored && (
					<Alert className="flex items-center mb-6 bg-blue-50 border-blue-200">
						<RotateCcw className="h-4 w-4 text-blue-600" />
						<AlertDescription className="flex flex-row text-blue-700 items-center justify-between w-full">
							<span>{tPage('draftRestored')}</span>

							<Button
								variant="outline"
								size="sm"
								onClick={handleClearDraft}
								className="ml-4 text-blue-600 border-blue-300 hover:bg-blue-100"
							>
								{tPage('startFresh')}
							</Button>
						</AlertDescription>
					</Alert>
				)}

				{/* Progress Header */}
				<div className="mb-4">
					<div className="flex items-center justify-between mb-4">
						<h1 className="text-3xl font-bold">{tPage('title')}</h1>
					</div>

					<StepIndicator
						steps={steps}
						currentStepIndex={currentStepIndex}
					/>
				</div>

				{/* Step Content */}
				<Card className="mb-8 shadow-none">
					<CardContent className="p-6">
						{renderStepContent()}
					</CardContent>
				</Card>

				{/* Navigation */}
				<div className="flex justify-between">
					<Button
						variant="outline"
						onClick={handlePrevious}
						disabled={currentStepIndex === 0}
						className="flex items-center gap-2"
					>
						{tPage('previous')}
					</Button>

					<Button
						onClick={
							currentStep === 'publish'
								? handlePublish
								: handleNext
						}
						disabled={!isCurrentStepValid()}
						className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{currentStep === 'publish'
							? tPage('publishPetition')
							: tPage('next')}
					</Button>
				</div>
			</div>
		</div>
	);
}
