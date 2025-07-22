'use client';

import { Heart } from 'lucide-react';

type LikeButtonProps = {
	isLiked: boolean;
	likesNumber: number;
	onClick: () => void;
};

export function LikeButton({ isLiked, likesNumber, onClick }: LikeButtonProps) {
	return (
		<button
			onClick={onClick}
			className="flex items-center gap-1 text-xs text-muted-foreground hover:text-red-500 transition-colors cursor-pointer"
			aria-pressed={isLiked}
			type="button"
		>
			<Heart
				className={`w-3 h-3 transition-all duration-200 ${
					isLiked
						? 'fill-red-500 text-red-500 scale-110'
						: 'hover:scale-105'
				}`}
			/>
			<span>{likesNumber}</span>
		</button>
	);
}
