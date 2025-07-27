'use server';

import {
	openaiImagePayloadSchema,
	OpenaiImagePayload,
} from '@/schemas/openai-image-payload';
import {
	openaiResponseSchema,
	OpenaiResponse,
} from '@/schemas/openai-response';

type GetOpenaiImageResult =
	| {
			success: true;
			data: OpenaiResponse;
	  }
	| {
			success: false;
			error: string;
	  };

export async function getOpenaiImage(
	payload: OpenaiImagePayload
): Promise<GetOpenaiImageResult> {
	try {
		const validatedPayload = openaiImagePayloadSchema.parse(payload);

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/openai/image`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(validatedPayload),
			}
		);

		if (response.status !== 201) {
			return {
				success: false,
				error: `Failed to generate image: ${response.status} ${response.statusText}`,
			};
		}

		const responseData = await response.json();
		const validatedResponse = openaiResponseSchema.parse(responseData);

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
			error: 'An unexpected error occurred while generating the image',
		};
	}
}
