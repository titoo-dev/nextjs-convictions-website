type ProfileInfoProps = {
	username: string;
	email: string;
};

export function ProfileInfo({ username, email }: ProfileInfoProps) {
	return (
		<div className="text-center">
			<h2 className="text-xl font-semibold">{username}</h2>
			<p className="text-muted-foreground text-sm">{email}</p>
		</div>
	);
}
