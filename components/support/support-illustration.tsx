import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export function SupportIllustration() {
    return (
        <div className="hidden lg:flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
                {/* Background Circle */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-red-200 dark:from-orange-900/30 dark:to-red-900/30 rounded-md transform rotate-6 scale-101"></div>

                {/* Illustration Container */}
                <Card className="relative shadow-lg">
                    <CardContent className="flex items-center justify-center p-6">
                        <Image 
                            src="/donation.svg" 
                            alt="Support illustration showing people making donations"
                            width={300}
                            height={200}
                            className="w-full h-auto max-w-xs"
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
