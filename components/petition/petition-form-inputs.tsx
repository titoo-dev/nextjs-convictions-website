import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type PetitionFormInputsProps = {
	disabled?: boolean;
};

export function PetitionFormInputs({
    disabled = false,
}: PetitionFormInputsProps) {
    return (
        <>
            <div>
                <Input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    required
                    disabled={disabled}
                    className="w-full"
                />
            </div>

            <div>
                <Input
                    type="text"
                    name="name"
                    placeholder="Your name (optional)"
                    disabled={disabled}
                    className="w-full"
                />
            </div>

            <div>
                <Textarea
                    name="comment"
                    placeholder="Leave a comment (optional)"
                    disabled={disabled}
                    className="w-full min-h-[100px] resize-none"
                />
            </div>
        </>
    );
}
