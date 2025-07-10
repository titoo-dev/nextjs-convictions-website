import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Image } from 'lucide-react';

type PetitionData = {
    mediaType: 'PICTURE' | 'VIDEO_YOUTUBE';
    pictureUrl?: string;
    videoYoutubeUrl?: string;
};

type MediaStepProps = {
    formData: PetitionData;
    updateFormData: (updates: Partial<PetitionData>) => void;
};

export function MediaStep({ formData, updateFormData }: MediaStepProps) {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Add media (optional)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card
                    className={`cursor-pointer transition-colors ${
                        formData.mediaType === 'PICTURE'
                            ? 'border-primary bg-primary/5'
                            : ''
                    }`}
                    onClick={() => updateFormData({ mediaType: 'PICTURE' })}
                >
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Image className="w-5 h-5" />
                            Picture
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Input
                            placeholder="Image URL"
                            value={formData.pictureUrl || ''}
                            onChange={(e) => updateFormData({ pictureUrl: e.target.value })}
                            disabled={formData.mediaType !== 'PICTURE'}
                        />
                    </CardContent>
                </Card>

                <Card
                    className={`cursor-pointer transition-colors ${
                        formData.mediaType === 'VIDEO_YOUTUBE'
                            ? 'border-primary bg-primary/5'
                            : ''
                    }`}
                    onClick={() => updateFormData({ mediaType: 'VIDEO_YOUTUBE' })}
                >
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            📺 YouTube Video
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Input
                            placeholder="YouTube URL"
                            value={formData.videoYoutubeUrl || ''}
                            onChange={(e) => updateFormData({ videoYoutubeUrl: e.target.value })}
                            disabled={formData.mediaType !== 'VIDEO_YOUTUBE'}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
