'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarIcon, Clock, Info } from 'lucide-react';
import { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type PetitionData = {
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

type PublishStepProps = {
	formData: PetitionData;
	updateFormData: (updates: Partial<PetitionData>) => void;
};

export function PublishStep({ formData, updateFormData }: PublishStepProps) {
	const t = useTranslations('petition.form.publishStep');
	const [publishNow, setPublishNow] = useState(formData.publishNow ?? true);
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);

	const imagePreviewUrl = useMemo(() => {
		if (formData.picture) {
			return URL.createObjectURL(formData.picture);
		}
		return undefined;
	}, [formData.picture]);

	const handlePublishOptionChange = (isNow: boolean) => {
		setPublishNow(isNow);
		updateFormData({ publishNow: isNow });
	};

	const handleDateSelect = (date: Date | undefined) => {
		if (date) {
			updateFormData({ scheduledDate: format(date, 'yyyy-MM-dd') });
			setIsCalendarOpen(false);
		}
	};

	const selectedDate = formData.scheduledDate
		? new Date(formData.scheduledDate)
		: undefined;
	const today = new Date();
	const minDate = new Date(today.getTime() + 24 * 60 * 60 * 1000); // Tomorrow

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold mb-2">{t('title')}</h2>
				<p className="text-gray-600 mb-4">{t('description')}</p>
				<p className="text-gray-600">{t('subDescription')}</p>
			</div>

			{/* Publication Options */}
			<div className="space-y-4">
				<div className="space-y-3">
					<label className="flex items-center space-x-3 cursor-pointer group">
						<input
							type="radio"
							name="publishOption"
							checked={publishNow}
							onChange={() => handlePublishOptionChange(true)}
							className="h-4 w-4 text-orange-500 border-gray-300 focus:ring-orange-500"
						/>
						<span className="text-gray-900 group-hover:text-gray-700 transition-colors font-medium">
							{t('publishNow')}
						</span>
					</label>

					<label className="flex items-center space-x-3 cursor-pointer group">
						<input
							type="radio"
							name="publishOption"
							checked={!publishNow}
							onChange={() => handlePublishOptionChange(false)}
							className="h-4 w-4 text-orange-500 border-gray-300 focus:ring-orange-500"
						/>
						<span className="text-gray-900 group-hover:text-gray-700 transition-colors font-medium">
							{t('publishLater')}
						</span>
					</label>
				</div>

				{/* Scheduled Publishing Form */}
				{!publishNow && (
					<div className="ml-7 space-y-4 border-l-2 border-gray-200 pl-4">
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div className="space-y-2">
								<label className="text-sm font-medium text-gray-700 flex items-center gap-2">
									<CalendarIcon className="w-4 h-4" />
									{t('date')}
								</label>
								<Popover
									open={isCalendarOpen}
									onOpenChange={setIsCalendarOpen}
								>
									<PopoverTrigger asChild>
										<Button
											variant="outline"
											className={cn(
												'w-full justify-start text-left font-normal',
												!selectedDate &&
													'text-muted-foreground'
											)}
										>
											<CalendarIcon className="mr-2 h-4 w-4" />
											{selectedDate ? (
												format(selectedDate, 'PPP')
											) : (
												<span>{t('pickDate')}</span>
											)}
										</Button>
									</PopoverTrigger>
									<PopoverContent
										className="w-auto p-0"
										align="start"
									>
										<Calendar
											mode="single"
											selected={selectedDate}
											onSelect={handleDateSelect}
											disabled={(date) => date < minDate}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
							</div>
							<div className="space-y-2">
								<label className="text-sm font-medium text-gray-700 flex items-center gap-2">
									<Clock className="w-4 h-4" />
									{t('time')}
								</label>
								<Input
									type="time"
									value={formData.scheduledTime || ''}
									onChange={(e) =>
										updateFormData({
											scheduledTime: e.target.value,
										})
									}
									className="w-full"
								/>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Advice Alert */}
			<Alert className="bg-orange-50 border-orange-200">
				<Info className="h-4 w-4 text-orange-600" />
				<AlertDescription className="text-orange-700">
					<strong>{t('advice')}</strong> {t('adviceText')}
				</AlertDescription>
			</Alert>

			{/* Petition Preview Summary */}
			<div className="space-y-4">
				<h3 className="text-lg font-semibold text-gray-900">
					{t('summary.title')}
				</h3>
				<Card className="border-gray-200 shadow-none">
					<CardHeader className="pb-3">
						<div className="space-y-1">
							<CardTitle className="text-lg leading-tight">
								{formData.title || t('summary.untitled')}
							</CardTitle>
							<CardDescription className="text-sm">
								{t('summary.category')}:{' '}
								{formData.category || t('summary.notSpecified')}
							</CardDescription>
						</div>
						{imagePreviewUrl && (
							<div className="rounded-lg border overflow-hidden relative w-full h-48">
								<Image
									src={imagePreviewUrl}
									alt="Petition image preview"
									fill
									className="object-cover"
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									unoptimized={true}
									onError={() => {
										console.error(
											'Failed to load petition image preview'
										);
									}}
								/>
							</div>
						)}
					</CardHeader>

					<CardContent className="space-y-3 pt-0">
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
							<div>
								<span className="font-medium text-gray-900">
									{t('summary.destination')}:
								</span>
								<p className="text-gray-600 mt-1">
									{formData.destination ||
										t('summary.notSpecified')}
								</p>
							</div>
							<div>
								<span className="font-medium text-gray-900">
									{t('summary.signatureGoal')}:
								</span>
								<p className="text-gray-600 mt-1">
									{formData.signatureGoal?.toLocaleString() ||
										t('summary.notSet')}{' '}
									{t('summary.signatures')}
								</p>
							</div>
						</div>
						{formData.objective && (
							<div className="text-sm">
								<span className="font-medium text-gray-900">
									{t('summary.objective')}:
								</span>
								<p className="text-gray-600 mt-1 line-clamp-3">
									{formData.objective}
								</p>
							</div>
						)}
						{formData.videoYoutubeUrl && (
							<div className="text-sm space-y-2">
								<span className="font-medium text-gray-900">
									{t('summary.video')}:
								</span>
								<p className="text-blue-600 mt-1 truncate">
									{formData.videoYoutubeUrl}
								</p>
								{/* YouTube video preview */}
								{(() => {
									const match =
										formData.videoYoutubeUrl.match(
											/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
										);
									const videoId = match
										? match[1]
										: undefined;
									return videoId ? (
										<div className="rounded-lg border overflow-hidden bg-gray-100 relative w-full h-48">
											<iframe
												src={`https://www.youtube.com/embed/${videoId}`}
												title="YouTube video preview"
												className="w-full h-full"
												allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
												allowFullScreen
											/>
										</div>
									) : null;
								})()}
							</div>
						)}
					</CardContent>
				</Card>
			</div>

			{/* Publishing Info */}
			<div className="bg-gray-50 rounded-lg p-4 border">
				<div className="flex items-start gap-3">
					<Info className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
					<div className="text-sm text-gray-600">
						<p className="font-medium text-gray-900 mb-1">
							{t('publishing.title')}
						</p>
						<p>
							{publishNow
								? t('publishing.publishNowText')
								: t('publishing.publishLaterText', {
										date: selectedDate
											? t('publishing.onDate', {
													date: format(
														selectedDate,
														'PPP'
													),
											  })
											: '',
										time: formData.scheduledTime
											? t('publishing.atTime', {
													time: formData.scheduledTime,
											  })
											: '',
								  })}
						</p>
						<p className="mt-2">{t('publishing.description')}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

// Add validation function for publish step
export function validatePublishStep(
	formData: Pick<
		PetitionData,
		'publishNow' | 'scheduledDate' | 'scheduledTime'
	>
): boolean {
	if (formData.publishNow === false) {
		// If scheduled, both date and time are required
		return !!(formData.scheduledDate && formData.scheduledTime);
	}
	// If publishing now, no additional validation needed
	return true;
}
