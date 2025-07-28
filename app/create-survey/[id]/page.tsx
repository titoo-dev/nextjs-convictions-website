'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import {
	createSurveyPayloadSchema,
	CreateSurveyPayload,
} from '@/schemas/create-survey-payload';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { createSurvey } from '@/actions/create-survey';

export default function CreateSurveyPage() {
	const { id: petitionId } = useParams<{ id: string }>();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isPending, startTransition] = useTransition();
	const [options, setOptions] = useState<string[]>(['', '']);

	const addOption = () => {
		setOptions([...options, '']);
	};

	const removeOption = (index: number) => {
		if (options.length > 2) {
			setOptions(options.filter((_, i) => i !== index));
		}
	};

	const updateOption = (index: number, value: string) => {
		const newOptions = [...options];
		newOptions[index] = value;
		setOptions(newOptions);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!petitionId) {
			setError('Petition ID is required');
			toast.error('Petition ID is required');
			return;
		}

		const formData = new FormData(e.currentTarget);
		const title = formData.get('title') as string;
		const description = formData.get('description') as string;
		const isMultipleChoice = formData.get('isMultipleChoice') === 'on';
		const filteredOptions = options.filter(
			(option) => option.trim() !== ''
		);

		if (filteredOptions.length < 2) {
			setError('At least two options are required');
			toast.error('At least two options are required');
			return;
		}

		startTransition(async () => {
			setIsLoading(true);
			setError(null);

			try {
				const payload: CreateSurveyPayload = {
					title: title.trim(),
					description: description.trim(),
					options: filteredOptions,
					isMultipleChoice,
					petitionId,
				};

				const validatedPayload =
					createSurveyPayloadSchema.parse(payload);

				const result = await createSurvey(validatedPayload);

				if (result.success) {
					toast.success('Survey created successfully!');
				} else {
					setError(result.error || 'Failed to create survey');
					toast.error(result.error);
				}
			} catch (err: any) {
				if (err.issues) {
					setError(err.issues[0].message);
					toast.error(err.issues[0].message);
				} else {
					setError('Failed to create survey. Please try again.');
					toast.error('Failed to create survey. Please try again.');
				}
			} finally {
				setIsLoading(false);
			}
		});
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-4xl">
				<div className="mb-4 sm:mb-6">
					<Link
						href="/"
						className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 group"
					>
						<ArrowLeft className="w-4 h-4" />
						<span className="text-sm font-medium">Back</span>
					</Link>
				</div>

				<Card className="shadow-none">
					<CardHeader>
						<CardTitle className="text-xl sm:text-2xl">
							Create Survey
						</CardTitle>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-6">
							<div className="space-y-2">
								<Label htmlFor="title">Survey Title</Label>
								<Input
									id="title"
									name="title"
									type="text"
									placeholder="Enter survey title"
									required
									disabled={isLoading}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="description">Description</Label>
								<Textarea
									id="description"
									name="description"
									placeholder="Enter survey description"
									rows={4}
									required
									disabled={isLoading}
								/>
							</div>

							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<Label>Survey Options</Label>
								</div>

								<div className="space-y-3">
									{options.map((option, index) => (
										<Card
											key={index}
											className="p-3 rounded-sm shadow-none"
										>
											<div className="flex items-center gap-3">
												<Input
													placeholder={`Option ${
														index + 1
													}`}
													value={option}
													onChange={(e) =>
														updateOption(
															index,
															e.target.value
														)
													}
													disabled={isLoading}
													className="flex-1"
												/>
												<Button
													type="button"
													variant="outline"
													size="sm"
													onClick={() =>
														removeOption(index)
													}
													disabled={
														isLoading ||
														options.length <= 2
													}
													className="text-red-600 hover:text-red-700 hover:bg-red-50"
												>
													<X className="w-4 h-4" />
												</Button>
											</div>
										</Card>
									))}
								</div>
								<Button
									type="button"
									variant="outline"
									size="sm"
									onClick={addOption}
									disabled={isLoading}
									className="flex items-center gap-2"
								>
									<Plus className="w-4 h-4" />
									Add Option
								</Button>
							</div>

							<div className="flex items-center space-x-2">
								<Switch
									id="isMultipleChoice"
									name="isMultipleChoice"
									disabled={isLoading}
								/>
								<Label htmlFor="isMultipleChoice">
									Allow multiple choice
								</Label>
							</div>

							{error && (
								<div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
									{error}
								</div>
							)}

							<Button
								type="submit"
								disabled={isLoading || isPending}
								className="w-full"
							>
								{isLoading
									? 'Creating Survey...'
									: 'Create Survey'}
							</Button>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
