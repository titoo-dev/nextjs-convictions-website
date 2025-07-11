'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PublicPetition } from '@/schemas/public-petition';
import { signPublicPetition } from '@/actions/sign-public-petition';
import { SuccessDialog } from './success-dialog';
import { SignedState } from './signed-state';
import { PetitionFormInputs } from './petition-form-inputs';
import { NotificationOptions } from './notification-options';

type SignFormProps = {
	petition: PublicPetition;
};

export function SignForm({ petition }: SignFormProps) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [notifications, setNotifications] = useState('yes');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!petition || !email.trim()) return;

        startTransition(async () => {
            setIsLoading(true);
            setError(null);

            try {
                const result = await signPublicPetition({
                    petitionId: petition.id,
                    email: email.trim(),
                    comment: comment.trim() || undefined,
                    isOptin: true,
                    lang: 'EN',
                    name: 'Titosy',
                });

                if (result.success) {
                    setSuccess(true);
                    setShowSuccessDialog(true);
                    // Reset form
                    setEmail('');
                    setName('');
                    setComment('');
                    setNotifications('yes');
                } else {
                    setError(result.error || 'Failed to sign petition');
                }
            } catch (err) {
                console.error('Error signing petition:', err);
                setError('An unexpected error occurred');
            } finally {
                setIsLoading(false);
            }
        });
    };

    const isSubmitting = isLoading || isPending;

    return (
        <>
            <Card className="shadow-none">
                <CardHeader>
                    <CardTitle className="text-xl">
                        {petition.isISign || success
                            ? 'You already signed'
                            : 'Sign this petition'}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {petition.isISign || success ? (
                        <SignedState />
                    ) : (
                        <div className="transition-all duration-300 ease-in-out">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {error && (
                                    <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md animate-in fade-in-0 slide-in-from-top-2 duration-200">
                                        {error}
                                    </div>
                                )}

                                <PetitionFormInputs
                                    email={email}
                                    name={name}
                                    comment={comment}
                                    onEmailChange={setEmail}
                                    onNameChange={setName}
                                    onCommentChange={setComment}
                                    disabled={isSubmitting}
                                />

                                <Button
                                    type="submit"
                                    disabled={isSubmitting || !email.trim()}
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 disabled:opacity-50 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] relative"
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                                            Signing...
                                        </div>
                                    ) : (
                                        'I sign'
                                    )}
                                </Button>

                                <NotificationOptions
                                    value={notifications}
                                    onValueChange={setNotifications}
                                    disabled={isSubmitting}
                                />
                            </form>
                        </div>
                    )}
                </CardContent>
            </Card>

            <SuccessDialog
                open={showSuccessDialog}
                onOpenChange={setShowSuccessDialog}
            />
        </>
    );
}
