'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { PublicPetition } from '@/types/public-petition';

type SignFormProps = {
    petition: PublicPetition;
};

export function SignForm({ petition }: SignFormProps) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [notifications, setNotifications] = useState('yes');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!petition) return;
        
        // Handle petition signing logic
        console.log({ 
            petitionId: petition.id,
            email, 
            name, 
            comment, 
            notifications 
        });
    };

    return (
        <Card className="shadow-none">
            <CardHeader>
                <CardTitle className="text-xl">
                    {petition.isISign ? 'You already signed' : 'Sign this petition'}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {petition.isISign ? (
                    <div className="text-center py-4">
                        <Badge variant="default" className="bg-green-600">
                            ✓ Signed
                        </Badge>
                        <p className="text-sm text-gray-500 mt-2">
                            Thank you for your support!
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Input
                                type="email"
                                placeholder="Your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full"
                            />
                        </div>

                        <div>
                            <Input
                                type="text"
                                placeholder="Your name (optional)"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full"
                            />
                        </div>

                        <div>
                            <Textarea
                                placeholder="Leave a comment (optional)"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full min-h-[100px] resize-none"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3"
                        >
                            I sign
                        </Button>

                        <RadioGroup
                            value={notifications}
                            onValueChange={setNotifications}
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="yes" />
                                <Label htmlFor="yes" className="text-sm">
                                    Yes, keep me informed if this petition succeeds, and tell me
                                    how I can contribute
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="no" />
                                <Label htmlFor="no" className="text-sm">
                                    No, I do not want to be informed of this petition or future
                                    initiatives
                                </Label>
                            </div>
                        </RadioGroup>
                    </form>
                )}
            </CardContent>
        </Card>
    );
}
