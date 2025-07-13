'use client';

import { useState, useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import 'react-quill-new/dist/quill.snow.css';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), {
	ssr: false,
	loading: () => (
		<div className="border rounded-lg bg-white">
			<div className="h-12 bg-gray-50 border-b animate-pulse"></div>
			<div className="h-64 p-4">
				<div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
				<div className="h-4 bg-gray-200 rounded w-1/2 mb-2 animate-pulse"></div>
				<div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
			</div>
		</div>
	),
});

type PetitionData = {
	content: string;
};

type WritingStepProps = {
	formData: PetitionData;
	updateFormData: (updates: Partial<PetitionData>) => void;
};

export function WritingStep({ formData, updateFormData }: WritingStepProps) {
	const t = useTranslations('petition.form.writingStep');
	const [editorContent, setEditorContent] = useState('');

	console.log('WritingStep rendered with content:', editorContent);

	// Custom toolbar configuration
	const modules = useMemo(
		() => ({
			toolbar: {
				container: [
					[{ header: [] }],
					['bold', 'italic', 'underline', 'strike'],
					['image', 'video'],
					[
						{ align: '' },
						{ align: 'center' },
						{ align: 'right' },
						{ align: 'justify' },
					],
					[{ size: [] }],
					[{ list: 'ordered' }, { list: 'bullet' }],
					['blockquote', 'link'],
				],
			},
			clipboard: {
				matchVisual: false,
			},
		}),
		[]
	);

	const formats = [
		'header',
		'font',
		'size',
		'bold',
		'italic',
		'underline',
		'strike',
		'blockquote',
		'list',
		'link',
		'image',
		'video',
		'align',
	];

	// Handle content changes
	const handleChange = (content: string) => {
		setEditorContent(content);
		updateFormData({ content });
	};

	// Initialize content on mount
	useEffect(() => {
		if (formData.content && formData.content !== editorContent) {
			setEditorContent(formData.content);
		}
	}, [formData.content]);

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold mb-2">{t('title')}</h2>
				<p className="text-gray-600 mb-4">
					{t('description')}
					<br />
					{t('subDescription')}
				</p>
			</div>

			{/* React Quill Editor */}
			<div className="border rounded-lg bg-white overflow-hidden">
				<style jsx global>{`
					.ql-toolbar {
						border-bottom: 1px solid #e5e7eb !important;
						border-top: none !important;
						border-left: none !important;
						border-right: none !important;
						background-color: #f9fafb !important;
						padding: 20px !important;
					}

					.ql-container {
						border: none !important;
						font-size: 16px !important;
						min-height: 300px !important;
					}

					.ql-editor {
						min-height: 300px !important;
						max-height: 500px !important;
						overflow-y: auto !important;
						padding: 16px !important;
						line-height: 1.6 !important;
					}

					.ql-editor.ql-blank::before {
						color: #9ca3af !important;
						font-style: italic !important;
					}

					.ql-toolbar .ql-formats {
						margin-right: 8px !important;
					}

					.ql-toolbar button {
						margin: 0 1px !important;
						border-radius: 4px !important;
						transition: background-color 0.2s ease !important;
					}

					.ql-toolbar button:hover {
						background-color: #e5e7eb !important;
					}

					.ql-toolbar button.ql-active {
						background-color: #e5e7eb !important;
					}

					.ql-toolbar .ql-picker {
						margin: 0 2px !important;
					}

					.ql-toolbar .ql-picker-label {
						padding: 0px 8px !important;
						border-radius: 4px !important;
						transition: background-color 0.2s ease !important;
					}

					.ql-editor h1 {
						font-size: 2em !important;
						font-weight: bold !important;
						margin-bottom: 0.5em !important;
					}

					.ql-editor h2 {
						font-size: 1.5em !important;
						font-weight: bold !important;
						margin-bottom: 0.5em !important;
					}

					.ql-editor h3 {
						font-size: 1.25em !important;
						font-weight: bold !important;
						margin-bottom: 0.5em !important;
					}

					.ql-editor blockquote {
						border-left: 4px solid #e5e7eb !important;
						padding-left: 16px !important;
						margin: 16px 0 !important;
						color: #6b7280 !important;
						font-style: italic !important;
					}

					.ql-editor ul,
					.ql-editor ol {
						margin: 16px 0 !important;
						padding-left: 24px !important;
					}

					.ql-editor a {
						color: #2563eb !important;
						text-decoration: underline !important;
					}

					.ql-editor a:hover {
						color: #1d4ed8 !important;
					}

					.ql-editor img {
						max-width: 100% !important;
						height: auto !important;
						border-radius: 8px !important;
						margin: 16px 0 !important;
					}

					@media (max-width: 640px) {
						.ql-toolbar {
							padding: 8px !important;
						}

						.ql-toolbar .ql-formats {
							margin-right: 4px !important;
						}

						.ql-toolbar button {
							padding: 3px !important;
						}

						.ql-editor {
							padding: 12px !important;
							font-size: 14px !important;
						}
					}
				`}</style>

				<ReactQuill
					theme="snow"
					value={editorContent}
					onChange={handleChange}
					modules={modules}
					formats={formats}
					placeholder={t('defaultContent')}
				/>
			</div>

			{/* AI Assistance Section */}
			<div className="bg-gray-50 rounded-lg p-4 border">
				<Button
					variant="outline"
					size="sm"
					className="flex items-center gap-2 text-blue-600 border-blue-200 hover:bg-blue-50 transition-colors"
				>
					<Sparkles className="h-4 w-4" />
					{t('toolbar.aiAssistance')}
				</Button>
			</div>

			{/* AI Usage Warning */}
			<Alert className="bg-orange-50 border-orange-200">
				<AlertDescription className="text-orange-700">
					{t('aiAdvice')}
					<br />
					{t('aiAdviceText')}{' '}
					<span className="text-red-500 font-medium">
						{t('aiUsage', { percentage: 21 })}
					</span>
				</AlertDescription>
			</Alert>
		</div>
	);
}
