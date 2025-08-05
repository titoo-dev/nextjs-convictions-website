import { getTokens, refreshAccessToken } from '@/lib/cookies-storage';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const tokens = await getTokens();

		if (!tokens) {
			console.log('No tokens found');
			return NextResponse.json({ authenticated: false }, { status: 401 });
		}

		// Try to fetch user data with current access token
		let response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`,
			{
				headers: {
					Authorization: `Bearer ${tokens.accessToken}`,
				},
			}
		);

		// If access token is expired, try to refresh it
		if (response.status === 401) {
			console.log('Access token is expired');
			const newTokens = await refreshAccessToken();

			if (newTokens) {
				// Retry with new access token
				response = await fetch(
					`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`,
					{
						headers: {
							Authorization: `Bearer ${newTokens.accessToken}`,
						},
					}
				);
			}
		}

		if (response.status !== 200) {
			console.log('User not found');
			return NextResponse.json({ authenticated: false }, { status: 401 });
		}

		const userData = await response.json();
		return NextResponse.json({
			authenticated: true,
			user: userData,
		});
	} catch (error) {
		console.error('Auth status error:', error);
		return NextResponse.json({ authenticated: false }, { status: 401 });
	}
}
