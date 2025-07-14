import { useEffect, useState } from 'react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export function useAuth() {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
        const unsub = onAuthStateChanged(auth, setUser);
		return () => unsub();
	}, []);

	return { user };
}
