import { useQuery } from '@tanstack/react-query';
import { fetchCurrentUser } from '../lib/api';
import { User } from '../schemas/user';

/**
 * Hook to fetch and manage the current authenticated user
 * @param accessToken The user's access token
 * @returns Query result containing the current user data
 */
export const useGetCurrentUser = () => {
    return useQuery<User | null, Error>({
        queryKey: ['currentUser'],
        queryFn: () => fetchCurrentUser(),
    });
};