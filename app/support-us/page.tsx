"use client";

import { DonationForm } from "@/components/support/donation-form";
import { SupportIllustration } from "@/components/support/support-illustration";

export default function SupportUsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800">
            <div className="container max-w-6xl mx-auto px-4 py-8 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Left Column - Content */}
                    <div className="space-y-8">
                        <div>
                            <div className="w-16 h-1 bg-orange-500 mb-6"></div>
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                                Support Us
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                                Join the change, support the platform.
                            </p>
                            <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
                                Do you believe in the power of petitions to move
                                things? We do too. By donating, you contribute
                                to strengthening an independent platform that
                                gives a voice to everyone. Together, let's make
                                the causes that matter heard. Each donation is
                                an act of commitment.
                            </p>
                        </div>

                        <DonationForm />
                    </div>

                    {/* Right Column - Illustration */}
                    <SupportIllustration />
                </div>
            </div>
        </div>
    );
}