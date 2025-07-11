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
                <CardTitle className="text-lg sm:text-xl">
                    Détails de la pétition
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start space-x-3">
                        <Target className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 shrink-0" />
                        <div className="min-w-0 flex-1">
                            <p className="font-medium text-xs sm:text-sm text-gray-500">
                                Objectif
                            </p>
                            <p className="text-sm break-words">
                                {petition.objective}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3">
                        <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 shrink-0" />
                        <div className="min-w-0 flex-1">
                            <p className="font-medium text-xs sm:text-sm text-gray-500">
                                Destination
                            </p>
                            <p className="text-sm break-words">
                                {petition.destination}
                            </p>
                        </div>
                    </div>
                </div>
                {petition.category && (
                    <div>
                        <Badge variant="secondary" className="text-xs">
                            {petition.category}
                        </Badge>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
