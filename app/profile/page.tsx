import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit3, LogOut, User } from "lucide-react"
import { useTranslations } from "next-intl"

export default function ProfilePage() {
    const t = useTranslations('header.userProfile')

    return (
		<div className="container mx-auto px-4 py-8 max-w-7xl">
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Profile Card */}
				<div className="lg:col-span-1">
					<Card>
						<CardContent className="pt-6">
							<div className="flex flex-col items-center space-y-4">
								<Avatar className="size-20">
									<AvatarImage
										src="/placeholder-avatar.jpg"
										alt="titosy"
									/>
									<AvatarFallback className="bg-orange-500 text-white text-lg">
										<User className="size-8" />
									</AvatarFallback>
								</Avatar>

								<div className="text-center">
									<h2 className="text-xl font-semibold">
										titosy
									</h2>
									<p className="text-muted-foreground text-sm">
										titosy@yopmail.com
									</p>
								</div>

								<div className="w-full space-y-2">
									<Button
										variant="outline"
										className="w-full justify-start"
									>
										<Edit3 className="size-4" />
										{t('modify')}
									</Button>

									<Button
										variant="outline"
										className="w-full justify-start"
									>
										<LogOut className="size-4" />
										{t('logout')}
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
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
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										{t('petitions-description')}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="text-center py-12">
										<div className="mx-auto size-16 bg-muted rounded-full flex items-center justify-center mb-4">
											<User className="size-8 text-muted-foreground" />
										</div>
										<p className="text-muted-foreground">
											{t('no-petitions-created')}
										</p>
										<Button className="mt-4">
											{t('create-petition')}
										</Button>
									</div>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="signatures" className="mt-6">
							<Card>
								<CardHeader>
									<CardTitle>{t('my-signatures')}</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="text-center py-12">
										<div className="mx-auto size-16 bg-muted rounded-full flex items-center justify-center mb-4">
											<User className="size-8 text-muted-foreground" />
										</div>
										<p className="text-muted-foreground">
											{t('no-signatures')}
										</p>
										<Button className="mt-4">
											{t('discover-petitions')}
										</Button>
									</div>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
}