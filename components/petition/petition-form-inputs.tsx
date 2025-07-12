import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTranslations } from 'next-intl';

type PetitionFormInputsProps = {
	disabled?: boolean;
};

export function PetitionFormInputs({
    disabled = false,
}: PetitionFormInputsProps) {
    const t = useTranslations('petition.signForm');

    return (
        <>
            <div>
                <Input
                    type="email"
                    name="email"
                    placeholder={t('emailPlaceholder')}
                    required
                    disabled={disabled}
                    className="w-full"
                />
            </div>

            <div>
                <Input
                    type="text"
                    name="name"
                    placeholder={t('namePlaceholder')}
                    disabled={disabled}
                    className="w-full"
                />
            </div>

            <div>
                <Textarea
                    name="comment"
                    placeholder={t('commentPlaceholder')}
                    disabled={disabled}
                    className="w-full min-h-[100px] resize-none"
                />
            </div>
        </>
    );
}
