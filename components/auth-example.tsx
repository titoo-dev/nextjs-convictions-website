'use client';

import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export function AuthExample() {
	const { isAuthenticated, isLoading, user, login, logout } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		const success = await login(email, password);
		if (success) {
			setEmail('');
			setPassword('');
		}
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isAuthenticated) {
		return (
			<div className="space-y-4">
				<h2>Welcome, {user?.email || 'User'}!</h2>
				<Button onClick={logout}>Logout</Button>
			</div>
		);
	}

	return (
		<form onSubmit={handleLogin} className="space-y-4">
			<div>
				<Input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
			</div>
			<div>
				<Input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
			</div>
			<Button type="submit">Login</Button>
		</form>
	);
}
