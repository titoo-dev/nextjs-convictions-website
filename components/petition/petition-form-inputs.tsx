import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { User } from '@/schemas/user';
import { useTranslations } from 'next-intl';
import RenderWhen from '../render-when';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type PetitionFormInputsProps = {
	currentUser: User | null;
	disabled?: boolean;
};

export function PetitionFormInputs({
	disabled = false,
	currentUser,
}: PetitionFormInputsProps) {
	const t = useTranslations('petition.signForm');

	return (
		<>
			<RenderWhen condition={currentUser === null}>
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
			</RenderWhen>

			<RenderWhen condition={currentUser !== null}>
				<div className="flex items-center gap-3 mb-4 ">
					{/* Avatar */}
					<div>
						<Avatar>
							<AvatarImage
								src={
									currentUser?.pictureUrl ||
									(typeof currentUser?.picture === 'string'
										? currentUser?.picture
										: currentUser?.picture?.id
										? `/api/files/${currentUser?.picture.id}`
										: undefined)
								}
								className="object-cover"
								alt={currentUser?.name}
							/>
							<AvatarFallback>
								{currentUser?.name
									? currentUser.name
											.split(' ')
											.map((n) => n[0])
											.join('')
											.toUpperCase()
									: 'U'}
							</AvatarFallback>
						</Avatar>
					</div>
					<div>
						<div className="font-medium">{currentUser?.name}</div>
						<div className="text-sm text-muted-foreground">
							{currentUser?.email}
						</div>
					</div>
				</div>
			</RenderWhen>

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
