import { clearTokens } from '@/lib/cookies-storage';
import { NextResponse } from 'next/server';

export async function POST() {
	try {
		await clearTokens();
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Logout error:', error);
		return NextResponse.json(
			{ success: false, error: 'Internal server error' },
			{ status: 500 }
		);
	}
}
