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
                        <MessageCircle className="w-5 h-5 text-muted-foreground" />
                        <CardTitle>Comments</CardTitle>
                    </div>
                    <CardDescription>
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
                    <MessageCircle className="w-5 h-5 text-muted-foreground" />
                    <CardTitle>Comments ({petition.comments.length})</CardTitle>
                </div>
                <CardDescription>
                    Read what others are saying about this petition
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {petition.comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="p-4 bg-muted/50 rounded-lg border-l-2 border-primary/20"
                        >
                            <div className="flex items-start gap-3 mb-2">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src={comment.author.pictureUrl} alt={comment.author.name} />
                                    <AvatarFallback>
                                        <User className="w-4 h-4" />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-medium text-sm">{comment.author.name}</span>
                                        <span className="text-xs text-muted-foreground">
                                            {new Date(comment.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-sm text-foreground leading-relaxed">
                                        {comment.content}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Heart className={`w-3 h-3 ${comment.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                                    <span>{comment.likesNumber}</span>
                                </div>
                                {comment.isMine && (
                                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
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
