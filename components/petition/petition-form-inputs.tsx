import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type PetitionFormInputsProps = {
	email: string;
	name: string;
	comment: string;
	onEmailChange: (value: string) => void;
	onNameChange: (value: string) => void;
	onCommentChange: (value: string) => void;
	disabled?: boolean;
};

export function PetitionFormInputs({
    email,
    name,
    comment,
    onEmailChange,
    onNameChange,
    onCommentChange,
    disabled = false,
}: PetitionFormInputsProps) {
    return (
        <>
            <div>
                <Input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => onEmailChange(e.target.value)}
                    required
                    disabled={disabled}
                    className="w-full"
                />
            </div>

            <div>
                <Input
                    type="text"
                    placeholder="Your name (optional)"
                    value={name}
                    onChange={(e) => onNameChange(e.target.value)}
                    disabled={disabled}
                    className="w-full"
                />
            </div>

            <div>
                <Textarea
                    placeholder="Leave a comment (optional)"
                    value={comment}
                    onChange={(e) => onCommentChange(e.target.value)}
                    disabled={disabled}
                    className="w-full min-h-[100px] resize-none"
                />
            </div>
        </>
    );
}
