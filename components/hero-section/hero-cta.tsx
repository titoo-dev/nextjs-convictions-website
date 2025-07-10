import Link from 'next/link';
import { Button } from '../ui/button';

export function HeroCTA() {
	return (
		<Button
			size="lg"
			className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl"
			asChild
		>
			<Link href="/petition/new">Créer une pétition</Link>
		</Button>
	);
}
