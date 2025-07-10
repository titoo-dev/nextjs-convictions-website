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

// YouTube URL validation
export const validateYouTubeUrl = (url: string): { isValid: boolean; error?: string; videoId?: string } => {
	if (!url.trim()) {
		return { isValid: false, error: "YouTube URL is required" };
	}

	try {
		new URL(url);
	} catch {
		return { isValid: false, error: "Invalid URL format" };
	}

	const videoId = getYouTubeVideoId(url);
	
	if (!videoId) {
		return { 
			isValid: false, 
			error: "Invalid YouTube URL. Use formats like: youtube.com/watch?v=ID or youtu.be/ID" 
		};
	}

	if (videoId.length !== 11) {
		return { isValid: false, error: "Invalid YouTube video ID format" };
	}

	return { isValid: true, videoId };
};

// File validation for uploads
export const validateImageFile = (file: File): { isValid: boolean; error?: string } => {
	const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
	if (!allowedTypes.includes(file.type)) {
		return { 
			isValid: false, 
			error: "Invalid file type. Please upload JPG, PNG, GIF, WebP, or SVG images only" 
		};
	}

	const maxSize = 10 * 1024 * 1024; // 10MB
	if (file.size > maxSize) {
		return { 
			isValid: false, 
			error: "File too large. Please upload images smaller than 10MB" 
		};
	}

	return { isValid: true };
};

// Get YouTube thumbnail
export const getYouTubeThumbnail = (videoId: string, quality: 'default' | 'medium' | 'high' | 'maxres' = 'medium'): string => {
	return `https://img.youtube.com/vi/${videoId}/${quality}default.jpg`;
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
