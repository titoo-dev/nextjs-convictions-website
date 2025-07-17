import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, Search, Mail, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';

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
	},
];

export default function BoostPlanPage() {
	const t = useTranslations('boostPlan');
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
								}`}
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
										className={`w-full ${
											plan.popular
												? 'bg-orange-600 hover:bg-orange-700 text-white'
												: 'bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900'
										} font-medium py-2.5`}
									>
										{t('plans.choosePlan')}
									</Button>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</div>
		</div>
	);
}
