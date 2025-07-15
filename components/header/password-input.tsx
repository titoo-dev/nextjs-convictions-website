'use client'

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

type PasswordInputProps = {
	id?: string;
	placeholder?: string;
	className?: string;
	required?: boolean;
	disabled?: boolean;
};

export function PasswordInput({ 
	id = "password", 
	placeholder = "********",
	className = "w-full",
	required = false
}: PasswordInputProps) {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className="flex flex-col space-y-2">
			<label
				htmlFor={id}
				className="text-sm font-medium text-gray-700"
			>
				Password
			</label>
			<div className="relative">
				<Input
					id={id}
					name='password'
					type={showPassword ? 'text' : 'password'}
					placeholder={placeholder}
					className={`${className} pr-10`}
					required={required}
				/>
				<button
					type="button"
					onClick={() => setShowPassword(!showPassword)}
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
	);
}
