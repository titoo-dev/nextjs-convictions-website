'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
	ChevronRight,
	PenTool,
	Target,
	FileText,
	Image,
	Users,
	Globe,
    ArrowLeft,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';

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
};

const categories = [
	'Culture',
	'Religion',
	'Women rights',
	'Men rights',
	'Education',
	'Environment',
	'Racism',
	'Politics',
	'Handicap',
	'Health',
	'Transport',
	'Immigration',
	'Justice',
	'Animals',
	'Other',
];

const steps: { id: Step; title: string; icon: React.ReactNode }[] = [
	{ id: 'title', title: 'Title', icon: <PenTool className="w-4 h-4" /> },
	{
		id: 'objective',
		title: 'Objective',
		icon: <Target className="w-4 h-4" />,
	},
	{ id: 'writing', title: 'Writing', icon: <FileText className="w-4 h-4" /> },
	{ id: 'media', title: 'Media', icon: <Image className="w-4 h-4" /> },
	{
		id: 'signatures',
		title: 'Signatures',
		icon: <Users className="w-4 h-4" />,
	},
	{ id: 'publish', title: 'Publish', icon: <Globe className="w-4 h-4" /> },
];

export default function NewPetitionPage() {
	const [currentStep, setCurrentStep] = useState<Step>('title');
	const [formData, setFormData] = useState<PetitionData>({
		category: 'Culture',
		title: '',
		objective: '',
		content: '',
		destination: '',
		mediaType: 'PICTURE',
		signatureGoal: 1000,
	});

	const currentStepIndex = steps.findIndex((step) => step.id === currentStep);

	const handleNext = () => {
		const currentIndex = steps.findIndex((step) => step.id === currentStep);
		if (currentIndex < steps.length - 1) {
			setCurrentStep(steps[currentIndex + 1].id);
		}
	};

	const handlePrevious = () => {
		const currentIndex = steps.findIndex((step) => step.id === currentStep);
		if (currentIndex > 0) {
			setCurrentStep(steps[currentIndex - 1].id);
		}
	};

	const updateFormData = (updates: Partial<PetitionData>) => {
		setFormData((prev) => ({ ...prev, ...updates }));
	};

	const renderStepContent = () => {
		switch (currentStep) {
			case 'title':
				return (
					<div className="space-y-6">
						<div>
							<h2 className="text-2xl font-bold mb-4">
								Select theme
							</h2>
							<div className="flex flex-wrap gap-2 mb-6">
								{categories.map((category) => (
									<Badge
										key={category}
										variant={
											formData.category === category
												? 'default'
												: 'outline'
										}
										className="cursor-pointer px-3 py-1 text-sm"
										onClick={() =>
											updateFormData({ category })
										}
									>
										{category}
									</Badge>
								))}
							</div>
						</div>

						<div>
							<h3 className="text-xl font-semibold mb-4">
								Title
							</h3>
							<Input
								placeholder="What change do you want?"
								value={formData.title}
								onChange={(e) =>
									updateFormData({ title: e.target.value })
								}
								className="mb-4"
							/>

							<div className="space-y-4">
								<Card className="bg-orange-50 border-orange-200 shadow-none">
									<CardHeader>
										<CardTitle className="text-orange-700 text-sm flex items-center gap-2">
											🔥 Suggestions
										</CardTitle>
										<CardDescription className="text-sm text-gray-600">
											Please write a title first
										</CardDescription>
									</CardHeader>
								</Card>

								<Alert className="bg-orange-50 border-orange-200">
									<AlertTitle className="text-orange-700">
										💡 Advice
									</AlertTitle>
									<AlertDescription className="text-gray-600">
										Use action verbs. For example: "Ban
										plastic bags in our city" or "Protect
										the forest of X". Avoid vague
										formulations.
									</AlertDescription>
								</Alert>
							</div>
						</div>
					</div>
				);

			case 'objective':
				return (
					<div className="space-y-6">
						<h2 className="text-2xl font-bold">
							What is your objective?
						</h2>
						<Textarea
							placeholder="Describe the goal of your petition in detail..."
							value={formData.objective}
							onChange={(e) =>
								updateFormData({ objective: e.target.value })
							}
							className="min-h-32"
						/>
						<div>
							<label className="block text-sm font-medium mb-2">
								Who should act?
							</label>
							<Input
								placeholder="e.g., City Council, Government, Company..."
								value={formData.destination}
								onChange={(e) =>
									updateFormData({
										destination: e.target.value,
									})
								}
							/>
						</div>
					</div>
				);

			case 'writing':
				return (
					<div className="space-y-6">
						<h2 className="text-2xl font-bold">Tell your story</h2>
						<Textarea
							placeholder="Write the full content of your petition. Explain why this change is important, provide context and evidence..."
							value={formData.content}
							onChange={(e) =>
								updateFormData({ content: e.target.value })
							}
							className="min-h-48"
						/>
					</div>
				);

			case 'media':
				return (
					<div className="space-y-6">
						<h2 className="text-2xl font-bold">
							Add media (optional)
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<Card
								className={`cursor-pointer transition-colors ${
									formData.mediaType === 'PICTURE'
										? 'border-primary bg-primary/5'
										: ''
								}`}
								onClick={() =>
									updateFormData({ mediaType: 'PICTURE' })
								}
							>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<Image className="w-5 h-5" />
										Picture
									</CardTitle>
								</CardHeader>
								<CardContent>
									<Input
										placeholder="Image URL"
										value={formData.pictureUrl || ''}
										onChange={(e) =>
											updateFormData({
												pictureUrl: e.target.value,
											})
										}
										disabled={
											formData.mediaType !== 'PICTURE'
										}
									/>
								</CardContent>
							</Card>

							<Card
								className={`cursor-pointer transition-colors ${
									formData.mediaType === 'VIDEO_YOUTUBE'
										? 'border-primary bg-primary/5'
										: ''
								}`}
								onClick={() =>
									updateFormData({
										mediaType: 'VIDEO_YOUTUBE',
									})
								}
							>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										📺 YouTube Video
									</CardTitle>
								</CardHeader>
								<CardContent>
									<Input
										placeholder="YouTube URL"
										value={formData.videoYoutubeUrl || ''}
										onChange={(e) =>
											updateFormData({
												videoYoutubeUrl: e.target.value,
											})
										}
										disabled={
											formData.mediaType !==
											'VIDEO_YOUTUBE'
										}
									/>
								</CardContent>
							</Card>
						</div>
					</div>
				);

			case 'signatures':
				return (
					<div className="space-y-6">
						<h2 className="text-2xl font-bold">Signature goal</h2>
						<div>
							<label className="block text-sm font-medium mb-2">
								How many signatures do you want to collect?
							</label>
							<Input
								type="number"
								min="1"
								value={formData.signatureGoal}
								onChange={(e) =>
									updateFormData({
										signatureGoal: Number(e.target.value),
									})
								}
							/>
							<p className="text-sm text-gray-600 mt-2">
								Setting a realistic goal helps build momentum
								for your petition.
							</p>
						</div>
					</div>
				);

			case 'publish':
				return (
					<div className="space-y-6">
						<h2 className="text-2xl font-bold">
							Review and publish
						</h2>
						<Card>
							<CardHeader>
								<CardTitle>{formData.title}</CardTitle>
								<CardDescription>
									Category: {formData.category}
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div>
									<strong>Objective:</strong>
									<p className="text-sm text-gray-600">
										{formData.objective}
									</p>
								</div>
								<div>
									<strong>Destination:</strong>
									<p className="text-sm text-gray-600">
										{formData.destination}
									</p>
								</div>
								<div>
									<strong>Signature Goal:</strong>
									<p className="text-sm text-gray-600">
										{formData.signatureGoal.toLocaleString()}
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
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
                        <span className="text-sm font-medium">Back</span>
                    </Link>
                </div>

                {/* Progress Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-3xl font-bold">
                            Create New Petition
                        </h1>
                    </div>

                    {/* Step indicators */}
                    <div className="flex flex-wrap items-center gap-2 pb-2">
                        {steps.map((step, index) => (
                            <div
                                key={step.id}
                                className="flex items-center gap-2"
                            >
                                <div
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                                        index <= currentStepIndex
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-gray-200 text-gray-600'
                                    }`}
                                >
                                    {step.icon}
                                    <span className="hidden sm:inline">
                                        {step.title}
                                    </span>
                                </div>
                                {index < steps.length - 1 && (
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Step Content */}
                <Card className="mb-8">
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
                        Previous
                    </Button>

                    <Button
                        onClick={
                            currentStep === 'publish'
                                ? () =>
                                        console.log(
                                            'Publish petition',
                                            formData
                                        )
                                : handleNext
                        }
                        className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600"
                    >
                        {currentStep === 'publish'
                            ? 'Publish Petition'
                            : 'Next'}
                    </Button>
                </div>
            </div>
        </div>
	);
}
