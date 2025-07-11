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
            <CardContent className="p-6 text-center">
                <div className="relative">
                    <div className="text-4xl font-bold mb-2">
                        {petition.usersSignedNumber}
                    </div>
                    <Badge variant="secondary" className="mb-4">
                        Verified signatures
                    </Badge>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                        <div
                            className="bg-green-600 h-2 rounded-full transition-all duration-300"
                            style={{
                                width: `${progressPercentage}%`,
                            }}
                        />
                    </div>
                    <p className="text-sm text-gray-500">
                        {signaturesNeeded > 0 
                            ? `${signaturesNeeded} signatures needed to reach ${petition.signatureGoal.toLocaleString()}`
                            : `Goal of ${petition.signatureGoal.toLocaleString()} signatures reached!`
                        }
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
