'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { CreateSurveyPayload } from '@/schemas/create-survey-payload';

import Link from 'next/link';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { createSurvey } from '@/actions/create-survey';
import { ZodError } from 'zod';
import { SurveyImageUpload } from '@/components/survey/survey-image-upload';
import RenderWhen from '@/components/render-when';
import { useRouter } from 'next/navigation';
import { LoginDialog } from '@/components/header/login-dialog';
import { User } from '@/schemas/user';
import { useTranslations } from 'next-intl';

type CreateSurveyClientProps = {
	currentUser: User | null;
};

export function CreateSurveyClient({ currentUser }: CreateSurveyClientProps) {
	const t = useTranslations('surveys');
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isPending, startTransition] = useTransition();
	const [options, setOptions] = useState<string[]>(['', '']);
	const [image, setImage] = useState<File | null>(null);
	const [formQuestion, setFormQuestion] = useState<string>('');
	const [formDescription, setFormDescription] = useState<string>('');
	const [isMultipleChoice, setIsMultipleChoice] = useState<boolean>(false);

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

	const handleSubmit = async () => {
		const question = formQuestion;
		const description = formDescription;
		const filteredOptions = options.filter(
			(option) => option.trim() !== ''
		);

		if (filteredOptions.length < 2) {
			setError(t('create.errors.minOptionsRequired'));
			toast.error(t('create.errors.minOptionsRequired'));
			return;
		}

		startTransition(async () => {
			setIsLoading(true);
			setError(null);

			try {
				const payload: CreateSurveyPayload = {
					question: question.trim(),
					description: description.trim(),
					options: filteredOptions,
					isMultipleChoice,
					picture: image,
				};

				const result = await createSurvey(payload);

				if (result.success) {
					toast.success(t('create.success'));
					router.push(result.data?.urlSurvey ?? '/');
				} else {
					setError(
						result.error || t('create.errors.failedToCreateGeneric')
					);
					toast.error(result.error);
				}
			} catch (err) {
				if (err instanceof ZodError) {
					setError(err.issues[0].message);
					toast.error(err.issues[0].message);
				} else {
					setError(t('create.errors.failedToCreate'));
					toast.error(t('create.errors.failedToCreate'));
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
						<span className="text-sm font-medium">
							{t('page.back')}
						</span>
					</Link>
				</div>

				<Card className="shadow-none">
					<CardHeader>
						<CardTitle className="text-xl sm:text-2xl">
							{t('create.title')}
						</CardTitle>
						<RenderWhen condition={!currentUser}>
							<p className="text-sm text-muted-foreground">
								{t('create.loginRequired')}
							</p>
						</RenderWhen>
					</CardHeader>
					<CardContent>
						<div className="space-y-6">
							<div className="space-y-2">
								<Label htmlFor="question">
									{t('create.question')}
								</Label>
								<Input
									id="question"
									type="text"
									placeholder={t(
										'create.questionPlaceholder'
									)}
									disabled={isLoading}
									value={formQuestion}
									onChange={(e) =>
										setFormQuestion(e.target.value)
									}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="description">
									{t('create.description')}
								</Label>
								<Textarea
									id="description"
									placeholder={t(
										'create.descriptionPlaceholder'
									)}
									rows={4}
									disabled={isLoading}
									value={formDescription}
									onChange={(e) =>
										setFormDescription(e.target.value)
									}
								/>
							</div>

							<div className="space-y-2">
								<Label>{t('create.image')}</Label>
								<SurveyImageUpload
									question={formQuestion}
									description={formDescription}
									onImageChange={setImage}
								/>
							</div>

							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<Label>{t('create.options')}</Label>
								</div>

								<div className="space-y-3">
									{options.map((option, index) => (
										<Card
											key={index}
											className="p-3 rounded-sm shadow-none"
										>
											<div className="flex items-center gap-3">
												<Input
													placeholder={t(
														'create.optionPlaceholder',
														{ number: index + 1 }
													)}
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
									{t('create.addOption')}
								</Button>
							</div>

							<div className="flex items-center space-x-2">
								<Switch
									id="isMultipleChoice"
									checked={isMultipleChoice}
									onCheckedChange={setIsMultipleChoice}
									disabled={isLoading}
								/>
								<Label htmlFor="isMultipleChoice">
									{t('create.allowMultipleChoice')}
								</Label>
							</div>

							{error && (
								<div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
									{error}
								</div>
							)}

							<RenderWhen
								condition={!currentUser}
								fallback={
									<Button
										onClick={handleSubmit}
										disabled={isLoading || isPending}
										className="w-full"
									>
										<RenderWhen
											condition={isLoading || isPending}
										>
											<div className="flex items-center gap-2">
												<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
												{t('create.creating')}
											</div>
										</RenderWhen>
										<RenderWhen
											condition={!isLoading && !isPending}
										>
											{t('create.createButton')}
										</RenderWhen>
									</Button>
								}
							>
								<LoginDialog
									onLoginSuccess={handleSubmit}
									trigger={
										<Button
											onClick={handleSubmit}
											disabled={isLoading || isPending}
											className="w-full"
										>
											{t('create.createButton')}
										</Button>
									}
								/>
							</RenderWhen>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
