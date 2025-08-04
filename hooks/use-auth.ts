'use client';

import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
	isAuthenticated: boolean;
	isLoading: boolean;
	user: any | null;
	login: (email: string, password: string) => Promise<boolean>;
	logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [user, setUser] = useState<any | null>(null);
	const router = useRouter();

	useEffect(() => {
		checkAuthStatus();
	}, []);

	const checkAuthStatus = async () => {
		try {
			const response = await fetch('/api/auth/status');
			if (response.ok) {
				const data = await response.json();
				setIsAuthenticated(true);
				setUser(data.user);
			} else {
				setIsAuthenticated(false);
				setUser(null);
			}
		} catch (error) {
			setIsAuthenticated(false);
			setUser(null);
		} finally {
			setIsLoading(false);
		}
	};

	const login = async (email: string, password: string): Promise<boolean> => {
		try {
			const formData = new FormData();
			formData.append('email', email);
			formData.append('password', password);

			const response = await fetch('/api/auth/signin', {
				method: 'POST',
				body: formData,
			});

			if (response.ok) {
				await checkAuthStatus();
				router.refresh();
				return true;
			}
			return false;
		} catch (error) {
			return false;
		}
	};

	const logout = async () => {
		try {
			await fetch('/api/auth/logout', { method: 'POST' });
			setIsAuthenticated(false);
			setUser(null);
			router.refresh();
		} catch (error) {
			console.error('Logout error:', error);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				isLoading,
				user,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}
