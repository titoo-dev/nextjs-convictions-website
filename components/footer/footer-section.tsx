type FooterSectionProps = {
	title: string;
	children: React.ReactNode;
};

export function FooterSection({ title, children }: FooterSectionProps) {
	return (
		<div>
			<h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
			<ul className="space-y-2">{children}</ul>
		</div>
	);
}
