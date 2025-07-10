import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Image, Upload, AlertTriangle, CheckCircle, XCircle, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import { validateImageUrl, validateYouTubeUrl, validateImageFile, getYouTubeThumbnail } from '@/lib/utils';

type PetitionData = {
    mediaType?: 'image' | 'youtube';
    pictureUrl?: string;
    videoYoutubeUrl?: string;
};

type MediaStepProps = {
    formData: PetitionData;
    updateFormData: (updates: Partial<PetitionData>) => void;
};

export function MediaStep({ formData, updateFormData }: MediaStepProps) {
    const [dragActive, setDragActive] = useState(false);
    const [imageValidation, setImageValidation] = useState<{ isValid: boolean; error?: string } | null>(null);
    const [youtubeValidation, setYoutubeValidation] = useState<{ isValid: boolean; error?: string; videoId?: string } | null>(null);
    const [isLoadingImage, setIsLoadingImage] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    // Clean up blob URLs when component unmounts or when new file is uploaded
    useEffect(() => {
        return () => {
            if (formData.pictureUrl && formData.pictureUrl.startsWith('blob:')) {
                URL.revokeObjectURL(formData.pictureUrl);
            }
        };
    }, [formData.pictureUrl]);

    // Validate image URL when it changes
    useEffect(() => {
        if (formData.mediaType === 'image' && formData.pictureUrl) {
            const validation = validateImageUrl(formData.pictureUrl);
            setImageValidation(validation);
            
            if (validation.isValid) {
                setIsLoadingImage(true);
                // Test if image actually loads
                const img = new window.Image();
                img.onload = () => {
                    setIsLoadingImage(false);
                    setImageValidation({ isValid: true });
                };
                img.onerror = () => {
                    setIsLoadingImage(false);
                    setImageValidation({ isValid: false, error: "Image failed to load. Please check the URL." });
                };
                img.src = formData.pictureUrl;
            }
        } else {
            setImageValidation(null);
        }
    }, [formData.pictureUrl, formData.mediaType]);

    // Validate YouTube URL when it changes
    useEffect(() => {
        if (formData.mediaType === 'youtube' && formData.videoYoutubeUrl) {
            const validation = validateYouTubeUrl(formData.videoYoutubeUrl);
            setYoutubeValidation(validation);
        } else {
            setYoutubeValidation(null);
        }
    }, [formData.videoYoutubeUrl, formData.mediaType]);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        const files = e.dataTransfer.files;
        if (files && files[0]) {
            handleFileUpload(files[0]);
        }
    };

    const handleFileUpload = (file: File) => {
        const validation = validateImageFile(file);
        
        if (!validation.isValid) {
            setImageValidation(validation);
            return;
        }

        // Clean up previous blob URL if it exists
        if (formData.pictureUrl && formData.pictureUrl.startsWith('blob:')) {
            URL.revokeObjectURL(formData.pictureUrl);
        }

        setIsLoadingImage(true);
        
        try {
            // Create blob URL for preview
            const localUrl = URL.createObjectURL(file);
            setUploadedFile(file);
            updateFormData({ pictureUrl: localUrl });
            
            // Test if the blob URL works by creating an image
            const img = new window.Image();
            img.onload = () => {
                setIsLoadingImage(false);
                setImageValidation({ isValid: true });
            };
            img.onerror = () => {
                setIsLoadingImage(false);
                setImageValidation({ isValid: false, error: "Failed to process the selected file." });
                URL.revokeObjectURL(localUrl);
            };
            img.src = localUrl;
        } catch (error) {
            setIsLoadingImage(false);
            setImageValidation({ isValid: false, error: "Failed to process the selected file." });
        }
    };

    const handleFileSelect = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.style.display = 'none';
        
        const handleFileChange = (e: Event) => {
            const target = e.target as HTMLInputElement;
            const file = target.files?.[0];
            if (file) {
                handleFileUpload(file);
            }
            // Clean up
            document.body.removeChild(input);
        };
        
        input.addEventListener('change', handleFileChange);
        document.body.appendChild(input);
        input.click();
    };

    const getValidationIcon = (validation: { isValid: boolean; error?: string } | null, isLoading: boolean = false) => {
        if (isLoading) return <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />;
        if (!validation) return null;
        return validation.isValid ? 
            <CheckCircle className="w-4 h-4 text-green-500" /> : 
            <XCircle className="w-4 h-4 text-red-500" />;
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold mb-2">Add an image or video</h2>
                <p className="text-gray-600 mb-6">
                    Make your petition more visual and impactful. Add a strong image or a short explanatory video to illustrate your cause.
                </p>
            </div>

            {/* Media Type Selection */}
            <div className="space-y-4">
                <p className="text-sm font-medium text-gray-700">I will use</p>
                
                <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <input
                            type="radio"
                            name="mediaType"
                            value="image"
                            checked={formData.mediaType === 'image'}
                            onChange={() => updateFormData({ mediaType: 'image' })}
                            className="h-4 w-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                        />
                        <span className="text-gray-900 group-hover:text-gray-700 transition-colors">An image</span>
                    </label>

                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <input
                            type="radio"
                            name="mediaType"
                            value="youtube"
                            checked={formData.mediaType === 'youtube'}
                            onChange={() => updateFormData({ mediaType: 'youtube' })}
                            className="h-4 w-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                        />
                        <span className="text-gray-900 group-hover:text-gray-700 transition-colors">A video YouTube</span>
                    </label>
                </div>
            </div>

            {/* Image Upload Section */}
            {formData.mediaType === 'image' && (
                <div className="space-y-4">
                    {/* URL Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Image URL</label>
                        <div className="relative">
                            <Input
                                placeholder="https://example.com/image.jpg"
                                value={formData.pictureUrl || ''}
                                onChange={(e) => updateFormData({ pictureUrl: e.target.value })}
                                className={`pr-10 ${
                                    imageValidation && !imageValidation.isValid ? 'border-red-300 focus:border-red-500 focus:ring-red-500' :
                                    imageValidation && imageValidation.isValid ? 'border-green-300 focus:border-green-500 focus:ring-green-500' :
                                    ''
                                }`}
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                {getValidationIcon(imageValidation, isLoadingImage)}
                            </div>
                        </div>
                        {imageValidation && imageValidation.error && (
                            <p className="text-sm text-red-600 flex items-center gap-1">
                                <XCircle className="w-3 h-3" />
                                {imageValidation.error}
                            </p>
                        )}
                    </div>

                    {/* OR Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">or</span>
                        </div>
                    </div>

                    {/* File Upload */}
                    <div
                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                            dragActive 
                                ? 'border-orange-400 bg-orange-50 scale-105' 
                                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                <Image className="w-8 h-8 text-gray-400" />
                            </div>
                            <div className="flex flex-col items-center space-y-2 text-center">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex items-center gap-2 hover:bg-orange-50 hover:border-orange-300"
                                    onClick={handleFileSelect}
                                >
                                    <Upload className="w-4 h-4" />
                                    Select a file
                                </Button>
                                <p className="text-sm text-gray-500">or drag and drop it here</p>
                                <p className="text-xs text-gray-400">JPG, PNG, GIF, WebP, SVG (max 10MB)</p>
                            </div>
                        </div>
                    </div>

                    {/* Image Preview */}
                    {formData.pictureUrl && imageValidation?.isValid && (
                        <div className="space-y-2">
                            <div className="rounded-lg border overflow-hidden">
                                <img 
                                    src={formData.pictureUrl} 
                                    alt="Preview" 
                                    className="w-full h-48 object-cover"
                                    onError={() => {
                                        setImageValidation({ isValid: false, error: "Failed to load image preview" });
                                        if (formData.pictureUrl && formData.pictureUrl.startsWith('blob:')) {
                                            URL.revokeObjectURL(formData.pictureUrl);
                                        }
                                    }}
                                    onLoad={() => {
                                        // Image loaded successfully
                                        if (!imageValidation?.isValid) {
                                            setImageValidation({ isValid: true });
                                        }
                                    }}
                                />
                            </div>
                            {uploadedFile && (
                                <div className="text-xs text-gray-500 flex items-center justify-between">
                                    <span>File: {uploadedFile.name}</span>
                                    <span>Size: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* YouTube Video Section */}
            {formData.mediaType === 'youtube' && (
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">YouTube URL</label>
                        <div className="relative">
                            <Input
                                placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                                value={formData.videoYoutubeUrl || ''}
                                onChange={(e) => updateFormData({ videoYoutubeUrl: e.target.value })}
                                className={`pr-10 ${
                                    youtubeValidation && !youtubeValidation.isValid ? 'border-red-300 focus:border-red-500 focus:ring-red-500' :
                                    youtubeValidation && youtubeValidation.isValid ? 'border-green-300 focus:border-green-500 focus:ring-green-500' :
                                    ''
                                }`}
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                {getValidationIcon(youtubeValidation)}
                            </div>
                        </div>
                        {youtubeValidation && youtubeValidation.error && (
                            <p className="text-sm text-red-600 flex items-center gap-1">
                                <XCircle className="w-3 h-3" />
                                {youtubeValidation.error}
                            </p>
                        )}
                        {youtubeValidation && youtubeValidation.isValid && (
                            <p className="text-sm text-green-600 flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" />
                                Valid YouTube URL detected
                            </p>
                        )}
                    </div>

                    {/* YouTube Preview */}
                    {youtubeValidation?.isValid && youtubeValidation.videoId && (
                        <div className="space-y-3">
                            <div className="rounded-lg border overflow-hidden bg-gray-100">
                                <img 
                                    src={getYouTubeThumbnail(youtubeValidation.videoId, 'medium')} 
                                    alt="YouTube video thumbnail" 
                                    className="w-full h-48 object-cover"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        target.parentElement!.innerHTML = '<div class="w-full h-48 flex items-center justify-center text-gray-500"><div class="text-center"><div class="w-12 h-12 mx-auto mb-2 bg-gray-200 rounded-lg flex items-center justify-center"><svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg></div><p class="text-sm">Thumbnail not available</p></div></div>';
                                    }}
                                />
                            </div>
                            <a 
                                href={formData.videoYoutubeUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                            >
                                <ExternalLink className="w-3 h-3" />
                                View on YouTube
                            </a>
                        </div>
                    )}
                </div>
            )}

            {/* Advisory Alert */}
            <Alert className="bg-orange-50 border-orange-200">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-700">
                    <strong>Advice</strong>
                    Use a free image or personal image. Avoid blurry or generic visuals. High-quality images get more engagement.
                </AlertDescription>
            </Alert>
        </div>
    );
}
