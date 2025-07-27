'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { PublicPetition } from '@/schemas/petition';
import { MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { likeComment } from '@/actions/like-comment';
import { toast } from 'sonner';
import { Fragment, useCallback } from 'react';
import { User } from '@/schemas/user';
import { CommentCard } from './comment-card';

type PetitionCommentsProps = {
	currentUser: User | null;
	petition: PublicPetition;
};

type CommentState = {
	isLiked: boolean;
	likesNumber: number;
};

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

			likeComment({ comment_id: commentId })
				.then((result) => {
					if (!result.success) {
						setCommentStates((prev) => ({
							...prev,
							[commentId]: {
								isLiked: currentIsLiked,
								likesNumber: currentLikesNumber,
							},
						}));
						toast.error(result.error || 'Failed to like comment');
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
