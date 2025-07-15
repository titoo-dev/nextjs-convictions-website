'use server';
import { createPetitionRequestSchema } from '@/schemas/create-petition-request';
import {
	createPetitionResponseSchema,
	type CreatePetitionResponse,
} from '@/schemas/create-petition-response';

type ActionResult = {
	success: boolean;
	data?: CreatePetitionResponse;
	error?: string;
};

export async function createPetition(
	formData: FormData
): Promise<ActionResult> {
	try {
		// Extract form data
		const category = formData.get('category') as string;
		const title = formData.get('title') as string;
		const objective = formData.get('objective') as string;
		const destination = formData.get('destination') as string;
		const content = formData.get('content') as string;
		const languageOrigin = formData.get('languageOrigin') as string;
		const creationStep = Number(formData.get('creationStep'));
		const mediaType = formData.get('mediaType') as string;
		const videoYoutubeUrl = formData.get('videoYoutubeUrl') as string;
		const pictureId = formData.get('pictureId') as string;
		const picture = formData.get('picture') as File;
		const signatureGoal = Number(formData.get('signatureGoal'));
		const publishedAt = formData.get('publishedAt') as string;
		const isPublished = formData.get('isPublished') === 'true';

		// Validate form data (excluding file for initial validation)
		const validatedData = createPetitionRequestSchema.parse({
			category,
			title,
			objective,
			destination,
			content,
			languageOrigin,
			creationStep,
			mediaType: mediaType || undefined,
			videoYoutubeUrl: videoYoutubeUrl || undefined,
			pictureId: pictureId || undefined,
			signatureGoal,
			publishedAt: publishedAt || undefined,
			isPublished,
		});

		// Prepare multipart form data for API request
		const apiFormData = new FormData();

		// Append all validated fields
		Object.entries(validatedData).forEach(([key, value]) => {
			if (value !== undefined && value !== '') {
				apiFormData.append(key, String(value));
			}
		});

		// Append file if present
		if (picture && picture.size > 0) {
			apiFormData.append('picture', picture);
		}

		// Make API request
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/petition`,
			{
				method: 'POST',
				body: apiFormData,
			}
		);

		if (response.status !== 201) {
			return {
				success: false,
				error: `Request failed with status ${response.status}`,
			};
		}

		const responseData = await response.json();

		// Validate response data
		const validatedResponse =
			createPetitionResponseSchema.parse(responseData);

		return {
			success: true,
			data: validatedResponse,
		};
	} catch (error) {
		if (error instanceof Error) {
			return {
				success: false,
				error: error.message,
			};
		}

		return {
			success: false,
			error: 'An unexpected error occurred',
		};
	}
}
