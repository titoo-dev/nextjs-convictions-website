import { SignJWT } from 'jose';

type TokenData = {
	id: number;
	server: {
		id: string;
		loc: string;
	};
};

export async function generateToken(): Promise<string> {
	// Token payload (equivalent to your Dart JWT payload)
	const payload: TokenData = {
		id: 123,
		server: {
			id: '3e4fc296',
			loc: 'euw-2',
		},
	};

	// Secret key based on environment (equivalent to HiveStorage platform check)
	const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET;

	// Convert secret to Uint8Array for jose
	const secret = new TextEncoder().encode(secretKey);

	// Generate JWT token with 15 minutes expiration
	const token = await new SignJWT(payload)
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime('15m')
		.setIssuer('https://github.com/jonasroussel/dart_jsonwebtoken')
		.sign(secret);

	return token;
}
