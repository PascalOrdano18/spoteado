import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Map, Camera, Waves, Upload, MapPin, Clock, Users } from "lucide-react";
import { marDelPlataSpots } from "@/data/surfing-spots";

export default function Home() {
  const featuredSpots = marDelPlataSpots.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 surf-gradient opacity-90" />
        <div className="absolute inset-0 wave-pattern" />
        <div className="container relative z-10 mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">SPOTEADO</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover and share the best surfing spots in Mar del Plata. 
            Connect with local photographers and find your perfect wave.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/map">
                <Map className="mr-2 h-5 w-5" />
                Explore Map
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link href="/gallery">
                <Camera className="mr-2 h-5 w-5" />
                View Gallery
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Everything You Need to Find Your Wave
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Map className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>Interactive Map</CardTitle>
                <CardDescription>
                  Explore all surfing spots along the Mar del Plata coast with real-time conditions
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Camera className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>Photo Gallery</CardTitle>
                <CardDescription>
                  Browse photos from local photographers and find yourself surfing
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Upload className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>Share Your Shots</CardTitle>
                <CardDescription>
                  Upload photos of surfers and help build the community gallery
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Spots */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Featured Surf Spots
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredSpots.map((spot) => (
              <Card key={spot.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-primary" />
                      {spot.name}
                    </CardTitle>
                    <Badge variant="secondary">{spot.difficulty}</Badge>
                  </div>
                  <CardDescription>{spot.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Waves className="h-4 w-4 mr-2" />
                      {spot.waveType}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {spot.facilities.slice(0, 3).map((facility) => (
                        <Badge key={facility} variant="outline" className="text-xs">
                          {facility}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link href="/spots">View All Spots</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">8+</div>
              <div className="text-muted-foreground">Surf Spots</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Real-time Updates</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">Local</div>
              <div className="text-muted-foreground">Community Driven</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Join the Community?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start exploring Mar del Plata's surf spots and connect with fellow surfers and photographers.
          </p>
          <Button asChild size="lg" className="text-lg px-8">
            <Link href="/upload">
              <Upload className="mr-2 h-5 w-5" />
              Upload Your First Photo
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
