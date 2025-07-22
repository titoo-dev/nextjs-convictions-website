'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { PublicPetition } from '@/schemas/public-petition';
import { MessageCircle, Heart, User as UserIcon, Trash2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { likeComment } from '@/actions/like-comment';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Fragment, useCallback } from 'react';
import { User } from '@/schemas/user';
import { LoginDialog } from '@/components/header/login-dialog';
import RenderWhen from '../render-when';
import { cn } from '@/lib/utils';

type PetitionCommentsProps = {
	currentUser: User | null;
	petition: PublicPetition;
};

type CommentState = {
	isLiked: boolean;
	likesNumber: number;
};

type Comment = PublicPetition['comments'][number];

type CommentCardProps = {
	currentUser: User | null;
	comment: Comment;
	isLiked: boolean;
	likesNumber: number;
	onLike: (commentId: string, isLiked: boolean, likesNumber: number) => void;
	t: ReturnType<typeof useTranslations>;
};

function CommentCard({
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
					<DeleteCommentButton t={t} />
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

type LikeButtonProps = {
	isLiked: boolean;
	likesNumber: number;
	onClick: () => void;
};

function LikeButton({ isLiked, likesNumber, onClick }: LikeButtonProps) {
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

type DeleteCommentButtonProps = {
	t: ReturnType<typeof useTranslations>;
};

function DeleteCommentButton({ t }: DeleteCommentButtonProps) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="h-6 w-6 sm:h-7 sm:w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
					title={t('deleteComment')}
				>
					<Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						{t('deleteConfirmTitle')}
					</AlertDialogTitle>
					<AlertDialogDescription>
						{t('deleteConfirmDescription')}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
					<AlertDialogAction
						onClick={() => {
							// handleDeleteComment(comment.id)
						}}
						className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
					>
						{t('delete')}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export function PetitionComments({
	petition,
	currentUser,
}: PetitionCommentsProps) {
	const t = useTranslations('petition.comments');
	const [commentStates, setCommentStates] = useState<
		Record<string, CommentState>
	>({});

	const handleLikeComment = useCallback(
		async (
			commentId: string,
			currentIsLiked: boolean,
			currentLikesNumber: number
		) => {
			const newIsLiked = !currentIsLiked;
			const newLikesNumber = newIsLiked
				? currentLikesNumber + 1
				: currentLikesNumber - 1;

			setCommentStates((prev) => ({
				...prev,
				[commentId]: {
					isLiked: newIsLiked,
					likesNumber: newLikesNumber,
				},
			}));

			likeComment(commentId)
				.then((result) => {
					if (!result.success) {
						setCommentStates((prev) => ({
							...prev,
							[commentId]: {
								isLiked: currentIsLiked,
								likesNumber: currentLikesNumber,
							},
						}));
						toast.error(result.message || 'Failed to like comment');
					}
				})
				.catch(() => {
					setCommentStates((prev) => ({
						...prev,
						[commentId]: {
							isLiked: currentIsLiked,
							likesNumber: currentLikesNumber,
						},
					}));
					toast.error('Failed to like comment');
				});
		},
		[]
	);

	if (!petition.comments || petition.comments.length === 0) {
		return (
			<Card>
				<CardHeader>
					<div className="flex items-center gap-2">
						<MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
						<CardTitle className="text-lg sm:text-xl">
							{t('title')}
						</CardTitle>
					</div>
					<CardDescription className="text-sm">
						{t('empty')}
					</CardDescription>
				</CardHeader>
			</Card>
		);
	}

	return (
		<Card className="shadow-none">
			<CardHeader>
				<div className="flex items-center gap-2">
					<MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
					<CardTitle className="text-lg sm:text-xl">
						{t('titleWithCount', {
							count: petition.comments.length,
						})}
					</CardTitle>
				</div>
				<CardDescription className="text-sm">
					{t('description')}
				</CardDescription>
			</CardHeader>
			<CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
				<div className="space-y-3 sm:space-y-4">
					{petition.comments.map((comment) => {
						const commentState = commentStates[comment.id];
						const isLiked =
							commentState?.isLiked ?? comment.isLiked;
						const likesNumber =
							commentState?.likesNumber ?? comment.likesNumber;

						return (
							<Fragment key={comment.id}>
								<CommentCard
									currentUser={currentUser}
									comment={comment}
									isLiked={isLiked}
									likesNumber={likesNumber}
									onLike={handleLikeComment}
									t={t}
								/>
							</Fragment>
						);
					})}
				</div>
			</CardContent>
		</Card>
	);
}
