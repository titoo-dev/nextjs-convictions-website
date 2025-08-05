import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslations } from 'next-intl';
import {
	CheckCircle,
	Clock,
	Users,
	Target,
	FileText,
	Image as ImageIcon,
	Video,
} from 'lucide-react';
import Image from 'next/image';

type PetitionFormData = {
	category: string;
	title: string;
	objective: string;
	content: string;
	destination: string;
	mediaType: 'PICTURE' | 'VIDEO_YOUTUBE';
	picture: File | null;
	videoYoutubeUrl?: string;
	signatureGoal: number;
	publishNow?: boolean;
	scheduledDate?: string;
	scheduledTime?: string;
};

type PetitionSummaryProps = {
	formData: PetitionFormData;
	currentStep: string;
};

export function PetitionSummary({
	formData,
	currentStep,
}: PetitionSummaryProps) {
	const t = useTranslations('petition.form.summary');

	const getCategoryLabel = (category: string) => {
		const categoryMap: Record<string, string> = {
			womenRights: t('categories.womenRights'),
			menRights: t('categories.menRights'),
			culture: t('categories.culture'),
			religion: t('categories.religion'),
			education: t('categories.education'),
			environment: t('categories.environment'),
			racism: t('categories.racism'),
			politics: t('categories.politics'),
			handicap: t('categories.handicap'),
			health: t('categories.health'),
			transport: t('categories.transport'),
			immigration: t('categories.immigration'),
			justice: t('categories.justice'),
			animals: t('categories.animals'),
		};
		return categoryMap[category] || category;
	};

	const getStepStatus = (stepId: string) => {
		const stepOrder = [
			'title',
			'objective',
			'writing',
			'media',
			'signatures',
			'publish',
		];
		const currentIndex = stepOrder.indexOf(currentStep);
		const stepIndex = stepOrder.indexOf(stepId);

		if (stepIndex < currentIndex) return 'completed';
		if (stepIndex === currentIndex) return 'current';
		return 'pending';
	};

	const isStepCompleted = (stepId: string) => {
		switch (stepId) {
			case 'title':
				return !!(formData.category && formData.title);
			case 'objective':
				return !!(formData.destination && formData.objective);
			case 'writing':
				return !!formData.content;
			case 'media':
				return formData.mediaType === 'PICTURE'
					? !!formData.picture
					: !!formData.videoYoutubeUrl;
			case 'signatures':
				return !!(formData.signatureGoal && formData.signatureGoal > 0);
			case 'publish':
				return formData.publishNow !== undefined;
			default:
				return false;
		}
	};

	const renderStepIcon = (stepId: string) => {
		const status = getStepStatus(stepId);
		const isCompleted = isStepCompleted(stepId);

		if (isCompleted || status === 'completed') {
			return <CheckCircle className="w-4 h-4 text-green-500" />;
		}

		switch (stepId) {
			case 'title':
				return <FileText className="w-4 h-4 text-gray-400" />;
			case 'objective':
				return <Target className="w-4 h-4 text-gray-400" />;
			case 'writing':
				return <FileText className="w-4 h-4 text-gray-400" />;
			case 'media':
				return formData.mediaType === 'PICTURE' ? (
					<ImageIcon className="w-4 h-4 text-gray-400" />
				) : (
					<Video className="w-4 h-4 text-gray-400" />
				);
			case 'signatures':
				return <Users className="w-4 h-4 text-gray-400" />;
			case 'publish':
				return <Clock className="w-4 h-4 text-gray-400" />;
			default:
				return null;
		}
	};

	const renderStepContent = (stepId: string) => {
		switch (stepId) {
			case 'title':
				return (
					<div className="space-y-2">
						{formData.category && (
							<Badge variant="secondary" className="text-xs">
								{getCategoryLabel(formData.category)}
							</Badge>
						)}
						{formData.title && (
							<p className="text-sm font-medium text-gray-900 line-clamp-2 lg:line-clamp-3">
								{formData.title}
							</p>
						)}
					</div>
				);
			case 'objective':
				return (
					<div className="space-y-2">
						{formData.destination && (
							<p className="text-sm text-gray-600">
								<strong>{t('destination')}:</strong>{' '}
								{formData.destination}
							</p>
						)}
						{formData.objective && (
							<p className="text-sm text-gray-600 line-clamp-2 lg:line-clamp-3">
								{formData.objective}
							</p>
						)}
					</div>
				);
			case 'writing':
				return formData.content ? (
					<div className="text-sm text-gray-600">
						<p className="line-clamp-2 lg:line-clamp-3">
							{formData.content
								.replace(/<[^>]*>/g, '')
								.substring(0, 120)}
							{formData.content.length > 120 ? '...' : ''}
						</p>
					</div>
				) : null;
			case 'media':
				if (formData.mediaType === 'PICTURE' && formData.picture) {
					return (
						<div className="space-y-2">
							<p className="text-sm text-gray-600">
								<ImageIcon className="w-4 h-4 inline mr-1" />
								{formData.picture.name}
							</p>
							<div className="relative w-full h-16 lg:h-20 rounded border overflow-hidden">
								<Image
									src={URL.createObjectURL(formData.picture)}
									alt="Preview"
									fill
									className="object-cover"
									unoptimized
								/>
							</div>
						</div>
					);
				} else if (
					formData.mediaType === 'VIDEO_YOUTUBE' &&
					formData.videoYoutubeUrl
				) {
					const videoId = formData.videoYoutubeUrl.match(
						/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
					)?.[1];
					return (
						<div className="space-y-2">
							<p className="text-sm text-gray-600">
								<Video className="w-4 h-4 inline mr-1" />
								YouTube Video
							</p>
							{videoId && (
								<div className="relative w-full h-16 lg:h-20 rounded border overflow-hidden bg-gray-100">
									<iframe
										src={`https://www.youtube.com/embed/${videoId}`}
										title="YouTube video preview"
										className="w-full h-full"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									/>
								</div>
							)}
						</div>
					);
				}
				return null;
			case 'signatures':
				return formData.signatureGoal ? (
					<div className="text-sm text-gray-600">
						<p>
							<Users className="w-4 h-4 inline mr-1" />
							{formData.signatureGoal.toLocaleString()}{' '}
							{t('signatures')}
						</p>
					</div>
				) : null;
			case 'publish':
				return (
					<div className="text-sm text-gray-600">
						{formData.publishNow ? (
							<p>{t('publishNow')}</p>
						) : formData.scheduledDate ? (
							<p>
								{formData.scheduledDate}
								{formData.scheduledTime &&
									` à ${formData.scheduledTime}`}
							</p>
						) : null}
					</div>
				);
			default:
				return null;
		}
	};

	const steps = [
		{ id: 'title', label: t('steps.title') },
		{ id: 'objective', label: t('steps.objective') },
		{ id: 'writing', label: t('steps.writing') },
		{ id: 'media', label: t('steps.media') },
		{ id: 'signatures', label: t('steps.signatures') },
		{ id: 'publish', label: t('steps.publish') },
	];

	return (
		<div className="w-full lg:w-80 lg:flex-shrink-0">
			<Card className="lg:sticky lg:top-8">
				<CardHeader>
					<CardTitle className="text-lg">{t('title')}</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					{steps.map((step) => {
						const status = getStepStatus(step.id);
						const isCompleted = isStepCompleted(step.id);

						return (
							<div
								key={step.id}
								className={`p-3 lg:p-3 rounded-lg border transition-colors ${
									status === 'current'
										? 'border-orange-300'
										: isCompleted || status === 'completed'
										? 'border-green-200'
										: 'border-gray-200 bg-gray-50'
								}`}
							>
								<div className="flex items-start gap-3">
									{renderStepIcon(step.id)}
									<div className="flex-1 min-w-0">
										<h4
											className={`text-sm font-medium ${
												status === 'current'
													? 'text-orange-700'
													: isCompleted ||
													  status === 'completed'
													? 'text-green-700'
													: 'text-gray-500'
											}`}
										>
											{step.label}
										</h4>
										{renderStepContent(step.id)}
									</div>
								</div>
							</div>
						);
					})}
				</CardContent>
			</Card>
		</div>
	);
}
