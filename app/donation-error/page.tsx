import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function DonationErrorPage() {
	const t = await getTranslations('donationError');
	return (
		<div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				<div className="bg-white rounded-lg p-8 text-center">
					{/* Error Icon */}
					<div className="mb-6 flex justify-center">
						<div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center">
							<AlertTriangle className="w-12 h-12 text-white" />
						</div>
					</div>

					{/* Header */}
					<div className="mb-6">
						<h1 className="text-2xl font-bold text-gray-900 mb-2">
							{t('title')}
						</h1>
					</div>

					{/* Error Messages */}
					<div className="mb-8 space-y-4 text-gray-600">
						<p className="text-base">{t('errorMessage')}</p>
						<p className="text-sm">{t('contactMessage')}</p>
					</div>

					{/* Continue Button */}
					<div className="w-full">
						<Button
							asChild
							className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-md"
						>
							<Link href="/">{t('continue')}</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
