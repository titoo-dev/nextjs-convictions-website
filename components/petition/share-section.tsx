'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Share2 } from 'lucide-react';

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
                        className="flex-1"
                    >
                        Facebook
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                    >
                        Twitter
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                    >
                        WhatsApp
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
