'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, MapPin } from 'lucide-react';
import { PublicPetition } from '@/schemas/public-petition';

type PetitionDetailsProps = {
    petition: PublicPetition;
};

export function PetitionDetails({ petition }: PetitionDetailsProps) {
    return (
        <Card className="shadow-none">
            <CardHeader>
                <CardTitle className="text-xl">
                    Détails de la pétition
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                        <Target className="h-5 w-5 mt-0.5" />
                        <div>
                            <p className="font-medium text-sm text-gray-500">
                                Objectif
                            </p>
                            <p className="text-sm">
                                {petition.objective}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3">
                        <MapPin className="h-5 w-5 mt-0.5" />
                        <div>
                            <p className="font-medium text-sm text-gray-500">
                                Destination
                            </p>
                            <p className="text-sm">
                                {petition.destination}
                            </p>
                        </div>
                    </div>
                </div>
                {petition.category && (
                    <div>
                        <Badge variant="secondary">
                            {petition.category}
                        </Badge>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
