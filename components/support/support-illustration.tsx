import { Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function SupportIllustration() {
    return (
        <div className="hidden lg:flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
                {/* Background Circle */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-red-200 dark:from-orange-900/30 dark:to-red-900/30 rounded-full transform rotate-3"></div>

                {/* Illustration Container */}
                <Card className="relative shadow-lg">
                    <CardContent className="flex items-center justify-center space-x-4">
                        {/* Person 1 */}
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-gray-700 rounded-full mb-2"></div>
                            <div className="w-12 h-20 bg-gray-700 rounded-t-xl"></div>
                            <div className="flex space-x-1">
                                <div className="w-3 h-8 bg-gray-700 rounded"></div>
                                <div className="w-3 h-8 bg-gray-700 rounded"></div>
                            </div>
                        </div>

                        {/* Heart Symbol */}
                        <div className="bg-orange-500 p-4 rounded-xl shadow-lg transform rotate-12">
                            <Heart className="w-8 h-8 text-white fill-current" />
                        </div>

                        {/* Person 2 */}
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-orange-500 rounded-full mb-2"></div>
                            <div className="w-12 h-20 bg-orange-500 rounded-t-xl"></div>
                            <div className="flex space-x-1">
                                <div className="w-3 h-8 bg-gray-700 rounded"></div>
                                <div className="w-3 h-8 bg-gray-700 rounded"></div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
