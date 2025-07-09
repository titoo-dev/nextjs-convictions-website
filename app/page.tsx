import { Header } from "@/components/header/header";
import { HeroSection } from "@/components/hero-section/hero-section";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      <HeroSection />
      
      {/* Pétitions populaires */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pétitions populaires
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez les causes qui mobilisent notre communauté et rejoignez le mouvement
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Pétition 1 */}
            <Card className="hover:shadow-lg transition-shadow flex flex-col h-full">
              <CardHeader className="flex-1">
                <div className="aspect-video bg-green-100 rounded-lg mb-4 overflow-hidden">
                  <Image 
                    src="https://images.pexels.com/photos/5841242/pexels-photo-5841242.jpeg" 
                    alt="Pour un avenir vert et durable"
                    width={400}
                    height={225}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-xl line-clamp-2 min-h-[3.5rem]">Pour un avenir vert et durable</CardTitle>
                <CardDescription className="line-clamp-3">
                  Engageons-nous pour préserver notre planète. Aujourd'hui, nous faisons appel à votre 
                  conscience écologique et votre sens des responsabilités...
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">1 Signatures</span>
                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                    I sign
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Pétition 2 */}
            <Card className="hover:shadow-lg transition-shadow flex flex-col h-full">
              <CardHeader className="flex-1">
                <div className="aspect-video bg-green-100 rounded-lg mb-4 overflow-hidden">
                  <Image 
                    src="https://images.pexels.com/photos/7219005/pexels-photo-7219005.jpeg" 
                    alt="Non à la destruction de notre environnement"
                    width={400}
                    height={225}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-xl line-clamp-2 min-h-[3.5rem]">Non à la destruction de notre environnement !</CardTitle>
                <CardDescription className="line-clamp-3">
                  Citoyens engagés pour la préservation de notre planète. Face à la menace grandissante 
                  qui pèse sur notre environnement...
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">1 Signatures</span>
                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                    I sign
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Pétition 3 */}
            <Card className="hover:shadow-lg transition-shadow flex flex-col h-full">
              <CardHeader className="flex-1">
                <div className="aspect-video bg-blue-100 rounded-lg mb-4 overflow-hidden">
                  <Image 
                    src="https://images.pexels.com/photos/1692984/pexels-photo-1692984.jpeg" 
                    alt="Non à la réforme injuste de l'éducation"
                    width={400}
                    height={225}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-xl line-clamp-2 min-h-[3.5rem]">Non à la réforme injuste de l'éducation</CardTitle>
                <CardDescription className="line-clamp-3">
                  Chers citoyens, nous, les signataires, nous opposons fermement à la réforme 
                  éducative récemment annoncée...
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">New</span>
                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                    I sign
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Voir toutes les pétitions
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
