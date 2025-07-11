import Link from 'next/link';
import Image from 'next/image';


export function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <div className="flex items-center space-x-2">
        <Image 
          src="/icon.png" 
          alt="My convictions logo" 
          width={32} 
          height={32} 
          className="h-8 w-8" 
        />
        <span className="text-xl font-bold text-gray-900">My convictions</span>
      </div>
    </Link>
  );
}