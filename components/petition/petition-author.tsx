'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Flag, Calendar } from 'lucide-react';
import { PublicPetition } from '@/schemas/public-petition';

type PetitionAuthorProps = {
    petition: PublicPetition;
};

export function PetitionAuthor({ petition }: PetitionAuthorProps) {
    return (
        <Card className="shadow-none">
            <CardContent>
                <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={petition.author.pictureUrl} />
                        <AvatarFallback>
                            {petition.author.name
                                .substring(0, 2)
                                .toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <p className="font-semibold text-lg">
                            {petition.author.name}
                        </p>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(petition.publishedAt).toLocaleDateString('fr-FR', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </div>
                    </div>
                    <Button variant="outline" size="sm">
                        <Flag className="h-4 w-4 mr-2" />
                        Report policy
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
