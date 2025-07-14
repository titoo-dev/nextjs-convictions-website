import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getYouTubeVideoId = (url: string) => {
	const match = url.match(
		/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
	);
	return match ? match[1] : null;
};

// Image validation
export const validateImageUrl = (url: string): { isValid: boolean; error?: string } => {
	if (!url.trim()) {
		return { isValid: false, error: "Image URL is required" };
	}

	try {
		new URL(url);
	} catch {
		return { isValid: false, error: "Invalid URL format" };
	}

	const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)(\?.*)?$/i;
	if (!imageExtensions.test(url)) {
		return { isValid: false, error: "URL must point to an image file (jpg, jpeg, png, gif, webp, svg, bmp, ico)" };
	}

	return { isValid: true };
};

/**
 * Validates a YouTube URL
 * @param url The URL to validate
 * @returns boolean indicating if the URL is a valid YouTube URL
 */
export const isValidYoutubeUrl = (url: string): boolean => {
	const regExp =
		/^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\S+)?$/;
	return regExp.test(url);
};

/**
 * Extracts the video ID from a YouTube URL
 * @param url The YouTube URL
 * @returns The video ID if found, null otherwise
 */
export const extractVideoId = (url: string): string | null => {
	const regExp =
		/^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\S+)?$/;
	const match = url.match(regExp);
	return match ? match[1] : null;
};

// YouTube utility functions
export function validateYouTubeUrl(url: string): {
	isValid: boolean;
	error?: string;
	videoId?: string;
} {
	if (!url || typeof url !== 'string') {
		return {
			isValid: false,
			error: 'URL is required',
		};
	}

	// YouTube URL patterns
	const patterns = [
		/^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
		/^https?:\/\/(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
		/^https?:\/\/youtu\.be\/([a-zA-Z0-9_-]{11})/,
		/^https?:\/\/(?:www\.)?youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
	];

	for (const pattern of patterns) {
		const match = url.match(pattern);
		if (match) {
			return {
				isValid: true,
				videoId: match[1],
			};
		}
	}

	return {
		isValid: false,
		error: 'Invalid YouTube URL format',
	};
}

export function getYouTubeThumbnail(videoId: string, quality: 'default' | 'medium' | 'high' | 'standard' | 'maxres' = 'medium'): string {
	const qualityMap = {
		default: 'default',
		medium: 'mqdefault',
		high: 'hqdefault',
		standard: 'sddefault',
		maxres: 'maxresdefault',
	};

	return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}

export function validateImageFile(file: File): {
	isValid: boolean;
	error?: string;
} {
	// Check file type
	if (!file.type.startsWith('image/')) {
		return {
			isValid: false,
			error: 'File must be an image',
		};
	}

	// Check file size (max 10MB)
	const maxSize = 10 * 1024 * 1024; // 10MB
	if (file.size > maxSize) {
		return {
			isValid: false,
			error: 'File size must be less than 10MB',
		};
	}

	// Check supported formats
	const supportedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
	if (!supportedTypes.includes(file.type)) {
		return {
			isValid: false,
			error: 'Supported formats: JPEG, PNG, GIF, WebP',
		};
	}

	return {
		isValid: true,
	};
}
