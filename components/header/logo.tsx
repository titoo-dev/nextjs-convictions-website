import Link from 'next/link';


export function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <div className="flex items-center space-x-2">
        <span className="text-xl font-bold text-gray-900">My convictions</span>
      </div>
    </Link>
  );
}