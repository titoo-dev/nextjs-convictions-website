'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Share2 } from 'lucide-react';
import { Facebook, Twitter, MessageCircle } from 'lucide-react';

export function ShareSection() {
    return (
        <Card className="shadow-none">
            <CardHeader>
                <CardTitle className="text-lg flex items-center">
                    <Share2 className="h-5 w-5 mr-2" />
                    Share to your friends
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex space-x-3">
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 flex items-center justify-center gap-2"
                    >
                        <Facebook className="h-4 w-4" />
                        Facebook
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 flex items-center justify-center gap-2"
                    >
                        <Twitter className="h-4 w-4" />
                        Twitter
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 flex items-center justify-center gap-2"
                    >
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
