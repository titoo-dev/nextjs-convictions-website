const PETITION_FORM_KEY = 'petition-form-draft';

export type PetitionFormData = {
    category: string;
    title: string;
    objective: string;
    content: string;
    destination: string;
    mediaType: 'PICTURE' | 'VIDEO_YOUTUBE';
    pictureUrl?: string;
    videoYoutubeUrl?: string;
    signatureGoal: number;
    publishNow?: boolean;
    scheduledDate?: string;
    scheduledTime?: string;
    lastUpdated?: string;
    currentStep?: string;
};

export const petitionLocalStorage = {
    save: (data: PetitionFormData): void => {
        try {
            if (typeof window === 'undefined') return;
            
            const dataToSave = {
                ...data,
                lastUpdated: new Date().toISOString(),
            };
            
            localStorage.setItem(PETITION_FORM_KEY, JSON.stringify(dataToSave));
        } catch (error) {
            console.warn('Failed to save petition form data to localStorage:', error);
        }
    },

    load: (): PetitionFormData | null => {
        try {
            if (typeof window === 'undefined') return null;
            
            const saved = localStorage.getItem(PETITION_FORM_KEY);
            if (!saved) return null;
            
            const data = JSON.parse(saved) as PetitionFormData;
            
            // Check if data is not too old (e.g., 7 days)
            if (data.lastUpdated) {
                const lastUpdated = new Date(data.lastUpdated);
                const now = new Date();
                const daysDiff = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24);
                
                if (daysDiff > 7) {
                    // Data is too old, remove it
                    petitionLocalStorage.clear();
                    return null;
                }
            }
            
            return data;
        } catch (error) {
            console.warn('Failed to load petition form data from localStorage:', error);
            return null;
        }
    },

    clear: (): void => {
        try {
            if (typeof window === 'undefined') return;
            localStorage.removeItem(PETITION_FORM_KEY);
        } catch (error) {
            console.warn('Failed to clear petition form data from localStorage:', error);
        }
    },

    exists: (): boolean => {
        try {
            if (typeof window === 'undefined') return false;
            return localStorage.getItem(PETITION_FORM_KEY) !== null;
        } catch (error) {
            console.warn('Failed to check petition form data in localStorage:', error);
            return false;
        }
    },
};
