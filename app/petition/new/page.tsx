'use client';

import { useState, useEffect, useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
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
import { petitionLocalStorage } from '@/lib/local-storage';
import { imageIndexedDB } from '@/lib/indexed-db';
import { createPetition } from '@/actions/create-petition';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';

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
	pictureId: string | null; // Optional ID for IndexedDB
	currentStep?: Step;
	videoYoutubeUrl?: string;
	signatureGoal: number;
	publishNow?: boolean;
	scheduledDate?: string;
	scheduledTime?: string;
};

export default function NewPetitionPage() {
	const tPage = useTranslations('petition.form.page');
	const tSteps = useTranslations('petition.form.steps');
	const locale = useLocale().toUpperCase();
	const [isPending, startTransition] = useTransition();

	const [currentStep, setCurrentStep] = useState<Step>('title');
	const [formData, setFormData] = useState<PetitionFormData>({
		category: '',
		title: '',
		objective: '',
		content: '',
		destination: '',
		mediaType: 'PICTURE',
		signatureGoal: 1000,
		picture: null,
		pictureId: null, // Initialize with null
	});
	const [hasLoadedFromStorage, setHasLoadedFromStorage] = useState(false);
	const [showDraftRestored, setShowDraftRestored] = useState(false);

	// Load form data from localStorage on component mount
	useEffect(() => {
		const loadFormData = async () => {
			const savedData = petitionLocalStorage.load();
			if (savedData) {
				// Restore the picture file from IndexedDB if we have an ID
				let pictureFile = null;

				if (savedData.pictureId) {
					try {
						pictureFile = await imageIndexedDB.getImage(
							savedData.pictureId
						);
					} catch (error) {
						console.error(
							'Failed to restore image from IndexedDB:',
							error
						);
					}
				}

				const restoredFormData: PetitionFormData = {
					category: savedData.category || '',
					title: savedData.title || '',
					objective: savedData.objective || '',
					content: savedData.content || '',
					destination: savedData.destination || '',
					mediaType: savedData.mediaType || 'PICTURE',
					videoYoutubeUrl: savedData.videoYoutubeUrl,
					signatureGoal: savedData.signatureGoal || 1000,
					publishNow: savedData.publishNow,
					scheduledDate: savedData.scheduledDate,
					scheduledTime: savedData.scheduledTime,
					picture: pictureFile,
					pictureId: savedData.pictureId || null, // Restore the ID
				};

				setFormData(restoredFormData);

				// Restore current step if available
				if (
					savedData.currentStep &&
					steps.some((step) => step.id === savedData.currentStep)
				) {
					setCurrentStep(savedData.currentStep as Step);
				}

				setShowDraftRestored(true);

				// Hide the notification after 10 seconds
				setTimeout(() => setShowDraftRestored(false), 10 * 1000);
			}
			setHasLoadedFromStorage(true);
		};

		loadFormData();
	}, []);

	// Save form data to localStorage whenever formData changes (but only after initial load)
	useEffect(() => {
		if (hasLoadedFromStorage) {
			const saveData = async () => {
				// Save form data without the File object
				const dataToSave: PetitionFormData = {
					...formData,
					currentStep,
				};

				await imageIndexedDB.clearAllImages(); // Clear previous images

				if (formData.picture && formData.picture instanceof File) {
					try {
						const pictureId = await imageIndexedDB.storeImage(
							formData.picture
						);
						dataToSave.pictureId = pictureId; // Update the ID in the data to save
					} catch (error) {
						console.error(
							'Failed to store image in IndexedDB:',
							error
						);
					}
				}

				petitionLocalStorage.save(dataToSave);
			};

			saveData();
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

	const handlePublish = () => {
		const dataToSend = {
			category: mapCategoryToAPI(formData.category),
			title: formData.title,
			objective: formData.objective,
			destination: formData.destination,
			content: formData.content,
			languageOrigin: locale,
			creationStep: 6,
			mediaType: formData.mediaType,
			videoYoutubeUrl: formData.videoYoutubeUrl ?? '',
			pictureId: '',
			signatureGoal: formData.signatureGoal,
			publishedAt: new Date().toISOString(),
			isPublished: true,
		};

		startTransition(async () => {
			try {
				// Show loading toast
				const loadingToast = toast.loading(tPage('publishing'));

				const result = await createPetition({
					data: dataToSend,
					picture: formData.picture,
				});

				// Dismiss loading toast
				toast.dismiss(loadingToast);

				if (!result) {
					// Handle no access token case
					toast.error(tPage('authRequired'));
					return;
				}

				if (result.success) {
					// Clear the draft from localStorage after successful publish
					petitionLocalStorage.clear();
					await imageIndexedDB.clearAllImages();

					// Show success toast
					toast.success(tPage('publishSuccess'));

					// Redirect to petition page or show success message
					console.log('Petition created successfully:', result.data);
				} else {
					// Handle error
					toast.error(result.error || tPage('publishError'));
				}
			} catch (error) {
				console.error(
					'Unexpected error during petition creation:',
					error
				);
				const { toast } = await import('sonner');
				toast.error(tPage('unexpectedError'));
			}
		});
	};

	const handleClearDraft = () => {
		petitionLocalStorage.clear();
		imageIndexedDB.clearAllImages();
		setFormData({
			category: '',
			title: '',
			objective: '',
			content: '',
			destination: '',
			mediaType: 'PICTURE',
			signatureGoal: 1000,
			picture: null,
			pictureId: null,
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
						disabled={currentStepIndex === 0 || isPending}
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
						disabled={!isCurrentStepValid() || isPending}
						className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isPending && currentStep === 'publish' ? (
							<>
								<div className="w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
								{tPage('publishing')}
							</>
						) : currentStep === 'publish' ? (
							tPage('publishPetition')
						) : (
							tPage('next')
						)}
					</Button>
				</div>
			</div>
		</div>
	);
}
