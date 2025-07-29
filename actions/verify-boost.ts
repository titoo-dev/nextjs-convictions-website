'use server';

import { getLocale } from 'next-intl/server';
import { cookies } from 'next/headers';

export async function verifyBoost(): Promise<{
	isPaid: boolean;
}> {
	try {
		const cookieStore = await cookies();
		const locale = (await getLocale()).toUpperCase();
		const sessionId = cookieStore.get('boost-id')?.value;

		if (!sessionId) {
			return { isPaid: false };
		}

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/boost/public/verify/${sessionId}/${locale}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			}
		);

		if (response.status !== 200) {
			console.error('Failed to verify boost:', response.statusText);
			return { isPaid: false };
		}

		const data = await response.json();

		return { isPaid: data.isPaid };
	} catch (error) {
		console.error('Error verifying boost:', error);
		return { isPaid: false };
	}
}
