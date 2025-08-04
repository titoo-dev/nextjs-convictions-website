import { getTokens } from '@/lib/cookies-storage';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	try {
		const tokens = await getTokens();

		if (!tokens) {
			return NextResponse.json({ authenticated: false }, { status: 401 });
		}

		// Optionally fetch user data from your API
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`,
			{
				headers: {
					Authorization: `Bearer ${tokens.accessToken}`,
				},
			}
		);

		if (!response.ok) {
			return NextResponse.json({ authenticated: false }, { status: 401 });
		}

		const userData = await response.json();
		return NextResponse.json({
			authenticated: true,
			user: userData,
		});
	} catch (error) {
		return NextResponse.json({ authenticated: false }, { status: 401 });
	}
}
