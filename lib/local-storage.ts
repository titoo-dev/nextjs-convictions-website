const PETITION_FORM_KEY = 'petition-form-draft';

export type PetitionFormData = {
    category: string;
    title: string;
    objective: string;
    content: string;
    destination: string;
    mediaType: 'PICTURE' | 'VIDEO_YOUTUBE';
    pictureUrl?: string;
    pictureFileData?: string; // base64 encoded file data
    pictureFileName?: string;
    pictureFileType?: string;
    pictureFileSize?: number;
    videoYoutubeUrl?: string;
    signatureGoal: number;
    publishNow?: boolean;
    scheduledDate?: string;
    scheduledTime?: string;
    lastUpdated?: string;
    currentStep?: string;
};

// Helper function to convert file to base64
export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};

// Helper function to convert base64 to file
export const base64ToFile = (base64: string, fileName: string, fileType: string): File => {
    try {
        // Handle data URLs and plain base64
        const base64Data = base64.includes(',') ? base64.split(',')[1] : base64;
        
        // Extract MIME type from data URL if present
        let mime = fileType;
        if (base64.includes(',')) {
            const mimeMatch = base64.match(/data:([^;]+)/);
            if (mimeMatch) {
                mime = mimeMatch[1];
            }
        }
        
        // Decode base64
        const bstr = atob(base64Data);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], fileName, { type: mime });
    } catch (error) {
        console.error('Error converting base64 to file:', error);
        throw new Error('Failed to convert base64 data to file');
    }
};

// Helper to get object URL from base64 data (for direct display)
export const base64ToObjectUrl = (base64: string): string => {
    try {
        // Accepts both data URLs and raw base64
        const arr = base64.includes(',') ? base64.split(',') : [ 'data:image/png;base64', base64 ];
        const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        const blob = new Blob([u8arr], { type: mime });
        return URL.createObjectURL(blob);
    } catch (error) {
        console.error('Error converting base64 to object URL:', error);
        return '';
    }
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

    saveWithFile: async (data: PetitionFormData, file?: File): Promise<void> => {
        try {
            if (typeof window === 'undefined') return;
            
            let dataToSave = { ...data };
            
            if (file && data.mediaType === 'PICTURE') {
                const base64Data = await fileToBase64(file);
                dataToSave = {
                    ...dataToSave,
                    pictureFileData: base64Data,
                    pictureFileName: file.name,
                    pictureFileType: file.type,
                    pictureFileSize: file.size,
                };
            }
            
            dataToSave.lastUpdated = new Date().toISOString();
            localStorage.setItem(PETITION_FORM_KEY, JSON.stringify(dataToSave));
        } catch (error) {
            console.warn('Failed to save petition form data with file to localStorage:', error);
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
            
            // Validate base64 data integrity
            if (data.pictureFileData && data.pictureFileName && data.pictureFileType) {
                try {
                    // Test if base64 data is valid by attempting to decode a small portion
                    const testData = data.pictureFileData.includes(',') 
                        ? data.pictureFileData.split(',')[1].substring(0, 100)
                        : data.pictureFileData.substring(0, 100);
                    atob(testData);
                } catch (error) {
                    console.warn('Corrupted base64 data detected, clearing image data');
                    data.pictureFileData = undefined;
                    data.pictureFileName = undefined;
                    data.pictureFileType = undefined;
                    data.pictureFileSize = undefined;
                    data.pictureUrl = undefined;
                }
            }
            
            return data;
        } catch (error) {
            console.warn('Failed to load petition form data from localStorage:', error);
            // Clear corrupted data
            petitionLocalStorage.clear();
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
