import { useQuery } from '@tanstack/react-query';
import { fetchCurrentUser } from '../lib/api';
import { User } from '../schemas/user';
import { authLocalStorage } from '@/lib/local-storage';

/**
 * Hook to fetch and manage the current authenticated user
 * @param accessToken The user's access token
 * @returns Query result containing the current user data
 */
export const useGetCurrentUser = () => {
    // Use the auth local storage utility to get the access token
    const accessToken = typeof window !== 'undefined' 
        ? authLocalStorage.getAccessToken()
        : null;

    return useQuery<User | null, Error>({
        queryKey: ['currentUser', accessToken],
        queryFn: () => fetchCurrentUser(accessToken),
        enabled: !!accessToken,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
    });
};