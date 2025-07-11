import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PublicPetition } from '@/schemas/public-petition';
import { MessageCircle, Heart, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type PetitionCommentsProps = {
    petition: PublicPetition;
};

export function PetitionComments({ petition }: PetitionCommentsProps) {
    if (!petition.comments || petition.comments.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                        <CardTitle className="text-lg sm:text-xl">Comments</CardTitle>
                    </div>
                    <CardDescription className="text-sm">
                        No comments yet. Be the first to share your thoughts!
                    </CardDescription>
                </CardHeader>
            </Card>
        );
    }

    return (
        <Card className='shadow-none'>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                    <CardTitle className="text-lg sm:text-xl">Comments ({petition.comments.length})</CardTitle>
                </div>
                <CardDescription className="text-sm">
                    Read what others are saying about this petition
                </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                <div className="space-y-3 sm:space-y-4">
                    {petition.comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="p-3 sm:p-4 bg-muted/50 rounded-lg border-l-2 border-primary/20"
                        >
                            <div className="flex items-start gap-2 sm:gap-3 mb-2">
                                <Avatar className="w-6 h-6 sm:w-8 sm:h-8 shrink-0">
                                    <AvatarImage src={comment.author.pictureUrl} alt={comment.author.name} />
                                    <AvatarFallback>
                                        <User className="w-3 h-3 sm:w-4 sm:h-4" />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                                        <span className="font-medium text-xs sm:text-sm truncate">{comment.author.name}</span>
                                        <span className="text-xs text-muted-foreground">
                                            {new Date(comment.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-foreground leading-relaxed break-words">
                                        {comment.content}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-2 ml-8 sm:ml-11">
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Heart className={`w-3 h-3 ${comment.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                                    <span>{comment.likesNumber}</span>
                                </div>
                                {comment.isMine && (
                                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded whitespace-nowrap">
                                        Your comment
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
