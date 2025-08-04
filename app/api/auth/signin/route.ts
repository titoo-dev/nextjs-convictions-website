import { signInWithEmail } from '@/actions/sign-in-with-email';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const formData = await request.formData();
		const result = await signInWithEmail(formData);

		if (result.success) {
			return NextResponse.json({ success: true });
		} else {
			return NextResponse.json(
				{ success: false, error: result.error },
				{ status: 400 }
			);
		}
	} catch (error) {
		return NextResponse.json(
			{ success: false, error: 'Internal server error' },
			{ status: 500 }
		);
	}
}
