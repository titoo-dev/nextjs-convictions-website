import { QuickLinks } from "./quick-links";
import { CommunityLinks } from "./community-links";
import { SecurityLinks } from "./security-links";
import { useTranslations } from 'next-intl';

export function Footer() {
	const t = useTranslations('footer');

	return (
		<footer className="bg-slate-900 text-slate-300">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<QuickLinks />
					<CommunityLinks />
					<SecurityLinks />
				</div>

				{/* Copyright */}
				<div className="border-t border-slate-700 mt-8 pt-8 text-center">
					<p className="text-sm">
						{t('copyright')}
					</p>
				</div>
			</div>
		</footer>
	);
}