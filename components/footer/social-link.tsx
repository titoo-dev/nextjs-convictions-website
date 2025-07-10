import { LucideIcon } from "lucide-react";

type SocialLinkProps = {
	href: string;
	icon: LucideIcon;
	label: string;
};

export function SocialLink({ href, icon: Icon, label }: SocialLinkProps) {
	return (
		<a
			href={href}
			className="flex items-center hover:text-white transition-colors"
			target="_blank"
			rel="noopener noreferrer"
		>
			<Icon className="w-4 h-4 mr-2" />
			{label}
		</a>
	);
}
