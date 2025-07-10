import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
    return (
		<footer className="bg-slate-900 text-slate-300">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* Quick Links */}
					<div>
						<h3 className="text-lg font-semibold text-white mb-4">
							Quick link
						</h3>
						<ul className="space-y-2">
							<li>
								<a
									href="/"
									className="hover:text-white transition-colors"
								>
									Home
								</a>
							</li>
							<li>
								<a
									href="/create"
									className="hover:text-white transition-colors"
								>
									Create a petition
								</a>
							</li>
							<li>
								<a
									href="/support"
									className="hover:text-white transition-colors"
								>
									Support Us
								</a>
							</li>
						</ul>
					</div>

					{/* Community */}
					<div>
						<h3 className="text-lg font-semibold text-white mb-4">
							Community
						</h3>
						<ul className="space-y-2">
							<li>
								<a
									href="#"
									className="flex items-center hover:text-white transition-colors"
								>
									<Facebook className="w-4 h-4 mr-2" />
									Facebook
								</a>
							</li>
							<li>
								<a
									href="#"
									className="flex items-center hover:text-white transition-colors"
								>
									<Instagram className="w-4 h-4 mr-2" />
									Instagram
								</a>
							</li>
							<li>
								<a
									href="#"
									className="flex items-center hover:text-white transition-colors"
								>
									<Twitter className="w-4 h-4 mr-2" />
									X.com
								</a>
							</li>
						</ul>
					</div>

					{/* Security */}
					<div>
						<h3 className="text-lg font-semibold text-white mb-4">
							Security
						</h3>
						<ul className="space-y-2">
							<li>
								<a
									href="/privacy"
									className="hover:text-white transition-colors"
								>
									Data policy
								</a>
							</li>
							<li>
								<a
									href="/terms"
									className="hover:text-white transition-colors"
								>
									Terms of use
								</a>
							</li>
						</ul>
					</div>
				</div>

				{/* Copyright */}
				<div className="border-t border-slate-700 mt-8 pt-8 text-center">
					<p className="text-sm">
						© 2025 My convictions. All rights reserved
					</p>
				</div>
			</div>
		</footer>
	);
}