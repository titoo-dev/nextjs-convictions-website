import { ProfileCard } from "@/components/profile/profile-card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { getTranslations } from "next-intl/server"
import { ProfilePetitionsTab } from "@/components/profile/profile-petitions-tab"
import { ProfileSignaturesTab } from "@/components/profile/profile-signatures-tab"

export default async function ProfilePage() {
    const t = await getTranslations('header.userProfile')

    return (
		<div className="container mx-auto px-4 py-8 max-w-7xl">
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Profile Card */}
				<div className="lg:col-span-1">
					<ProfileCard
						username="titosy"
						email="titosy@yopmail.com"
						avatarUrl="/placeholder-avatar.jpg"
					/>
				</div>

				{/* Main Content */}
				<div className="lg:col-span-2">
					<Tabs defaultValue="petitions" className="w-full">
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger
								value="petitions"
								className="text-orange-500 data-[state=active]:text-orange-600"
							>
								{t('my-petitions')}
							</TabsTrigger>
							<TabsTrigger value="signatures">
								{t('my-signatures')}
							</TabsTrigger>
						</TabsList>

						<TabsContent value="petitions" className="mt-6">
							<ProfilePetitionsTab t={t} />
						</TabsContent>

						<TabsContent value="signatures" className="mt-6">
							<ProfileSignaturesTab t={t} />
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
}