'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PublicPetition } from '@/schemas/public-petition';

type SignatureCounterProps = {
    petition: PublicPetition;
};

export function SignatureCounter({ petition }: SignatureCounterProps) {
    const progressPercentage = Math.min((petition.usersSignedNumber / petition.signatureGoal) * 100, 100);
    const signaturesNeeded = petition.signatureGoal - petition.usersSignedNumber;

    return (
        <Card className="shadow-none">
            <CardContent className="p-4 sm:p-6 text-center">
                <div className="relative">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                        {petition.usersSignedNumber.toLocaleString()}
                    </div>
                    <Badge variant="secondary" className="mb-3 sm:mb-4 text-xs">
                        Verified signatures
                    </Badge>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3 sm:mb-4">
                        <div
                            className="bg-green-600 h-2 rounded-full transition-all duration-300"
                            style={{
                                width: `${progressPercentage}%`,
                            }}
                        />
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed px-2">
                        {signaturesNeeded > 0 
                            ? `${signaturesNeeded.toLocaleString()} signatures needed to reach ${petition.signatureGoal.toLocaleString()}`
                            : `Goal of ${petition.signatureGoal.toLocaleString()} signatures reached!`
                        }
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
