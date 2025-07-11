'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Share2 } from 'lucide-react';
import { Facebook, Twitter, MessageCircle } from 'lucide-react';

export function ShareSection() {
    return (
        <Card className="shadow-none">
            <CardHeader>
                <CardTitle className="text-base sm:text-lg flex items-center">
                    <Share2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Share to your friends
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center justify-center gap-2 text-xs sm:text-sm"
                    >
                        <Facebook className="h-3 w-3 sm:h-4 sm:w-4" />
                        Facebook
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center justify-center gap-2 text-xs sm:text-sm"
                    >
                        <Twitter className="h-3 w-3 sm:h-4 sm:w-4" />
                        Twitter
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center justify-center gap-2 text-xs sm:text-sm"
                    >
                        <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                        WhatsApp
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
