'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { PublicPetition } from '@/schemas/public-petition';
import { MessageCircle, Heart, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { likeComment } from '@/actions/like-comment';
import { toast } from 'sonner';

type PetitionCommentsProps = {
	petition: PublicPetition;
};

export function PetitionComments({ petition }: PetitionCommentsProps) {
	const t = useTranslations('petition.comments');
	const [commentStates, setCommentStates] = useState<
		Record<string, { isLiked: boolean; likesNumber: number }>
	>({});

	const handleLikeComment = async (
		commentId: string,
		currentIsLiked: boolean,
		currentLikesNumber: number
	) => {
		// Optimistic update
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

		// Don't await the request for immediate UI feedback
		likeComment(commentId)
			.then((result) => {
				if (!result.success) {
					// Revert on error
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
				// Revert on error
				setCommentStates((prev) => ({
					...prev,
					[commentId]: {
						isLiked: currentIsLiked,
						likesNumber: currentLikesNumber,
					},
				}));
				toast.error('Failed to like comment');
			});
	};

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
							<div
								key={comment.id}
								className="p-3 sm:p-4 bg-muted/50 rounded-lg border-l-2 border-primary/20"
							>
								<div className="flex items-start gap-2 sm:gap-3 mb-2">
									<Avatar className="w-6 h-6 sm:w-8 sm:h-8 shrink-0">
										<AvatarImage
											src={comment.author.pictureUrl}
											alt={comment.author.name}
											className="object-cover"
										/>
										<AvatarFallback>
											<User className="w-3 h-3 sm:w-4 sm:h-4" />
										</AvatarFallback>
									</Avatar>
									<div className="flex-1 min-w-0">
										<div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
											<span className="font-medium text-xs sm:text-sm truncate">
												{comment.author.name}
											</span>
											<span className="text-xs text-muted-foreground">
												{new Date(
													comment.createdAt
												).toLocaleDateString()}
											</span>
										</div>
										<p className="text-xs sm:text-sm text-foreground leading-relaxed break-words">
											{comment.content}
										</p>
									</div>
								</div>
								<div className="flex items-center gap-2 mt-2 ml-8 sm:ml-11">
									<button
										onClick={() =>
											handleLikeComment(
												comment.id,
												isLiked,
												likesNumber
											)
										}
										className="flex items-center gap-1 text-xs text-muted-foreground hover:text-red-500 transition-colors cursor-pointer"
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
									{comment.isMine && (
										<span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded whitespace-nowrap">
											{t('yourComment')}
										</span>
									)}
								</div>
							</div>
						);
					})}
				</div>
			</CardContent>
		</Card>
	);
}
