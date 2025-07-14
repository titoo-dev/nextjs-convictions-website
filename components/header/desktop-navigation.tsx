'use client'

import { LanguageSelector } from './language-selector';
import { NavigationButton } from './navigation-button';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EyeIcon, EyeOffIcon } from 'lucide-react';


export function DesktopNavigation() {
	const t = useTranslations('navigation');
	const [showPassword, setShowPassword] = useState(false);
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	
	return (
		<nav className="hidden md:flex items-center space-x-4">
			<NavigationButton href="/petition/new">
				{t('createPetition')}
			</NavigationButton>
			<NavigationButton href="/support-us">
				{t('supportUs')}
			</NavigationButton>

			<Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
				<DialogTrigger asChild>
					<Button
						variant="outline"
						size="default"
						className="border-none shadow-none cursor-pointer"
					>
						{t('login')}
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-md">
					<DialogHeader className="space-y-4">
						<DialogTitle className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mr-auto">
							Welcome Back
						</DialogTitle>
						<div className="space-y-2">
							<div className="h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-full w-20 mr-auto" />
							<p className="text-gray-600 text-sm leading-relaxed max-w-sm mr-auto text-left">
								Sign in to your account to create petitions,
								support causes, and make your voice heard in the
								community.
							</p>
						</div>
					</DialogHeader>

					<div className="space-y-4">
						<div className="flex flex-col space-y-2">
							<label
								htmlFor="email"
								className="text-sm font-medium text-gray-700"
							>
								Email
							</label>
							<Input
								id="email"
								type="email"
								placeholder="Enter your email"
								className="w-full"
							/>
						</div>

						<div className="flex flex-col space-y-2">
							<label
								htmlFor="password"
								className="text-sm font-medium text-gray-700"
							>
								Password
							</label>
							<div className="relative">
								<Input
									id="password"
									type={showPassword ? 'text' : 'password'}
									placeholder="********"
									className="w-full pr-10"
								/>
								<button
									type="button"
									onClick={() =>
										setShowPassword(!showPassword)
									}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
								>
									{showPassword ? (
										<EyeOffIcon className="h-4 w-4" />
									) : (
										<EyeIcon className="h-4 w-4" />
									)}
								</button>
							</div>
						</div>

						<Button
							variant="outline"
							className="w-full bg-orange-500 hover:bg-orange-600 text-white mt-2"
						>
							Login
						</Button>

						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<span className="w-full border-t border-gray-300" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-white px-2 text-gray-500">
									or
								</span>
							</div>
						</div>

						<Button variant="outline" className="w-full">
							<svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
								<path
									fill="#4285F4"
									d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
								/>
								<path
									fill="#34A853"
									d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
								/>
								<path
									fill="#FBBC05"
									d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
								/>
								<path
									fill="#EA4335"
									d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
								/>
							</svg>
							Continue with Google
						</Button>

						<p className="text-center text-sm text-gray-600">
							You don't have an account yet ?{' '}
							<button className="text-orange-500 hover:text-orange-600 font-medium">
								Register
							</button>
						</p>
					</div>
				</DialogContent>
			</Dialog>

			<LanguageSelector />
		</nav>
	);
}
