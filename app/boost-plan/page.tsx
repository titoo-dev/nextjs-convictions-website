'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, Search, Mail, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState, useTransition } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { BoostType } from '@/schemas/create-public-boost';
import { createPublicBoost } from '@/actions/create-public-boost';

const boostPlans = [
	{
		id: 'search-priority',
		icon: Search,
		price: 3,
		titleKey: 'plans.searchPriority.title',
		descriptionKey: 'plans.searchPriority.description',
		featuresKey: 'plans.searchPriority.features',
		popular: true,
		gradient: 'from-blue-500 to-blue-600',
		lightGradient: 'from-blue-50 to-blue-100',
		accentColor: 'blue',
		type: 'BOOST_SEARCH',
	},
	{
		id: 'homepage-featured',
		icon: Home,
		price: 5,
		titleKey: 'plans.homepageFeatured.title',
		descriptionKey: 'plans.homepageFeatured.description',
		featuresKey: 'plans.homepageFeatured.features',
		popular: false,
		gradient: 'from-orange-500 to-orange-600',
		lightGradient: 'from-orange-50 to-orange-100',
		accentColor: 'orange',
		type: 'BOOST_ORDER',
	},
	{
		id: 'targeted-email',
		icon: Mail,
		price: 10,
		titleKey: 'plans.targetedEmail.title',
		descriptionKey: 'plans.targetedEmail.description',
		featuresKey: 'plans.targetedEmail.features',
		popular: false,
		gradient: 'from-purple-500 to-purple-600',
		lightGradient: 'from-purple-50 to-purple-100',
		accentColor: 'purple',
		type: 'BOOST_EMAIL',
	},
];

export default function BoostPlanPage() {
    const t = useTranslations('boostPlan');
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [emailError, setEmailError] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handlePlanSelect = (type: BoostType) => {
        setSelectedPlan(type);
        setIsDialogOpen(true);
        setEmailError('');
    };

    const handleSubmit = async (formData: FormData) => {
        setEmailError('');

        const email = formData.get('email') as string;

        if (!email) {
            setEmailError(t('dialog.emailRequired'));
            return;
        }

        if (!validateEmail(email)) {
            setEmailError(t('dialog.emailError'));
            return;
        }

        startTransition(async () => {
            try {
                // Add the selected plan type and a dummy petition ID to the form data
                formData.append('type', selectedPlan || '');
                formData.append('petitionId', 'dummy-petition-id'); // Replace with actual petition ID
                
                const result = await createPublicBoost(formData);

                if (result.success) {
                    console.log('Boost created successfully:', result.data);
                    setIsDialogOpen(false);
                } else {
                    setEmailError(result.error || t('dialog.genericError'));
                }
            } catch (error) {
                console.error('Error creating boost:', error);
                setEmailError(t('dialog.genericError'));
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="container max-w-5xl mx-auto px-4 py-16">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-xl mb-6">
                        <Zap
                            className="h-6 w-6 text-orange-600 dark:text-orange-400"
                            aria-label={t('hero.iconAlt')}
                        />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        {t('hero.title')}
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {t('hero.description')}
                    </p>
                </div>

                {/* Plans Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {boostPlans.map((plan) => {
                        const IconComponent = plan.icon;

                        return (
                            <Card
                                key={plan.id}
                                className={`relative transition-all duration-200 hover:shadow-lg border ${
                                    plan.popular
                                        ? 'border-orange-200 dark:border-orange-800 shadow-md'
                                        : 'border-gray-200 dark:border-gray-700'
                                } ${isPending ? 'opacity-50 pointer-events-none' : ''}`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-orange-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                                            {t('plans.popularBadge')}
                                        </span>
                                    </div>
                                )}

                                <CardHeader className="text-center pb-4">
                                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl mb-4">
                                        <IconComponent className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                                    </div>
                                    <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                        {t(plan.titleKey)}
                                    </CardTitle>
                                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                                        {plan.price}
                                        {t('plans.priceSuffix')}
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {t(plan.descriptionKey)}
                                    </p>
                                </CardHeader>

                                <CardContent className="pt-0">
                                    <Button
                                        onClick={() =>
                                            handlePlanSelect(
                                                plan.type as BoostType
                                            )
                                        }
                                        disabled={isPending}
                                        className={`w-full ${
                                            plan.popular
                                                ? 'bg-orange-600 hover:bg-orange-700 text-white'
                                                : 'bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900'
                                        } font-medium py-2.5 transition-all duration-200`}
                                    >
                                        {t('plans.choosePlan')}
                                    </Button>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Plan Selection Dialog */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle className="text-center">
                                {selectedPlan &&
                                    t('dialog.title', {
                                        plan: t(
                                            boostPlans.find(
                                                (p) => p.type === selectedPlan
                                            )?.titleKey || ''
                                        ),
                                    })}
                            </DialogTitle>
                        </DialogHeader>

                        <form action={handleSubmit} className="space-y-4">
                            {selectedPlan && (
                                <div className={`text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg transition-opacity duration-200 ${isPending ? 'opacity-50' : ''}`}>
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {
                                            boostPlans.find(
                                                (p) => p.type === selectedPlan
                                            )?.price
                                        }
                                        {t('plans.priceSuffix')}
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        {selectedPlan &&
                                            t(
                                                boostPlans.find(
                                                    (p) =>
                                                        p.type === selectedPlan
                                                )?.descriptionKey || ''
                                            )}
                                    </p>
                                </div>
                            )}

                            <div className="flex flex-col space-y-2">
                                <label
                                    htmlFor="email"
                                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    {t('dialog.emailLabel')}
                                </label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder={t('dialog.emailPlaceholder')}
                                    className={`transition-all duration-200 ${
                                        emailError
                                            ? 'border-red-500 focus-visible:border-red-500'
                                            : ''
                                    }`}
                                    aria-invalid={!!emailError}
                                    disabled={isPending}
                                    required
                                />
                                {emailError && (
                                    <p className="text-sm text-red-600 dark:text-red-400 animate-in slide-in-from-top-1 duration-200">
                                        {emailError}
                                    </p>
                                )}
                            </div>

                            <div className="flex gap-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsDialogOpen(false)}
                                    className="flex-1 transition-all duration-200"
                                    disabled={isPending}
                                >
                                    {t('dialog.cancel')}
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isPending}
                                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white disabled:opacity-50 transition-all duration-200"
                                >
                                    {isPending ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            {t('dialog.processing')}
                                        </div>
                                    ) : (
                                        t('dialog.confirm')
                                    )}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
