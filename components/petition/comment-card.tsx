'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User as UserIcon, Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { User } from '@/schemas/user';
import { PublicPetition } from '@/schemas/petition';
import { LoginDialog } from '@/components/header/login-dialog';
import RenderWhen from '../render-when';
import { cn } from '@/lib/utils';
import { LikeButton } from './like-button';
import { DeleteCommentButton } from './delete-comment-button';

type Comment = PublicPetition['comments'][number];

type CommentCardProps = {
	currentUser: User | null;
	comment: Comment;
	isLiked: boolean;
	likesNumber: number;
	onLike: (commentId: string, isLiked: boolean, likesNumber: number) => void;
	t: ReturnType<typeof useTranslations>;
};

export function CommentCard({
	currentUser,
	comment,
	isLiked,
	likesNumber,
	onLike,
	t,
}: CommentCardProps) {
	const handleLikeClick = () => {
		onLike(comment.id, isLiked, likesNumber);
	};

	return (
		<div className="p-3 sm:p-4 bg-muted/50 rounded-lg border-l-2 border-primary/20">
			<div className="flex items-start gap-2 sm:gap-3 mb-2">
				<Avatar className="w-6 h-6 sm:w-8 sm:h-8 shrink-0">
					<AvatarImage
						src={comment.author.pictureUrl}
						alt={comment.author.name}
						className="object-cover"
					/>
					<AvatarFallback>
						<UserIcon className="w-3 h-3 sm:w-4 sm:h-4" />
					</AvatarFallback>
				</Avatar>
				<div className="flex-1 min-w-0">
					<div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
						<span className="font-medium text-xs sm:text-sm truncate">
							{comment.author.name}
						</span>
						<span className="text-xs text-muted-foreground">
							{new Date(comment.createdAt).toLocaleDateString()}
						</span>
					</div>
					<p className="text-xs sm:text-sm text-foreground leading-relaxed break-words">
						{comment.content}
					</p>
				</div>
				<RenderWhen condition={comment.isMine}>
					<DeleteCommentButton t={t} commentId={comment.id} />
				</RenderWhen>
			</div>
			<div
				className={cn(
					'flex items-center gap-2 mt-2',
					currentUser ? 'ml-8 sm:ml-11' : 'ml-10'
				)}
			>
				<RenderWhen condition={!!currentUser}>
					<LikeButton
						isLiked={isLiked}
						likesNumber={likesNumber}
						onClick={handleLikeClick}
					/>
				</RenderWhen>

				<RenderWhen condition={!currentUser}>
					<LoginDialog
						trigger={
							<button
								className="flex items-center gap-1 text-xs text-muted-foreground hover:text-red-500 transition-colors cursor-pointer"
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
						}
					/>
				</RenderWhen>

				<RenderWhen condition={comment.isMine}>
					<span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded whitespace-nowrap">
						{t('yourComment')}
					</span>
				</RenderWhen>
			</div>
		</div>
	);
}
