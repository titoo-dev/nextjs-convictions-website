import { refreshAccessToken, getTokens } from '@/lib/cookies-storage';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST() {
	try {
		const tokens = await getTokens();

		if (!tokens) {
			return NextResponse.json(
				{ error: 'No tokens found' },
				{ status: 401 }
			);
		}

		const newTokens = await refreshAccessToken();

		if (!newTokens) {
			return NextResponse.json(
				{ error: 'Failed to refresh token' },
				{ status: 401 }
			);
		}

		// Fetch updated user data
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`,
			{
				headers: {
					Authorization: `Bearer ${newTokens.accessToken}`,
				},
			}
		);

		if (response.status !== 200) {
			return NextResponse.json(
				{ error: 'Failed to fetch user data' },
				{ status: 401 }
			);
		}

		const userData = await response.json();
		revalidatePath('/');
		return NextResponse.json({
			authenticated: true,
			user: userData,
		});
	} catch (error) {
		console.error('Refresh token error:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}
