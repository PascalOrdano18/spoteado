"use client";

import { notFound } from "next/navigation";
import { format } from "date-fns";
import { SurfingSpot, SpotPhoto } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { 
  MapPin, 
  Waves, 
  Wind, 
  Compass, 
  Camera, 
  Calendar, 
  Heart, 
  Eye,
  ArrowLeft,
  AlertTriangle
} from "lucide-react";
import { marDelPlataSpots } from "@/data/surfing-spots";
import { samplePhotos } from "@/data/sample-photos";
import Link from "next/link";
import { useState } from "react";

interface SpotPageProps {
  params: {
    id: string;
  };
}

export default function SpotPage({ params }: SpotPageProps) {
  const spot = marDelPlataSpots.find(s => s.id === params.id);
  
  if (!spot) {
    notFound();
  }

  // Get photos for this spot
  const spotPhotos = samplePhotos.filter(photo => photo.spotId === params.id);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Principiante': return 'bg-blue-500';
      case 'Intermedio': return 'bg-yellow-500';
      case 'Avanzado': return 'bg-orange-500';
      case 'Experto': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/#spots-section">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Spots
          </Button>
        </Link>
      </div>

      {/* Spot Header */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-2xl">
                  <MapPin className="h-6 w-6 mr-3 text-primary" />
                  {spot.name}
                </CardTitle>
                <Badge 
                  className={`${getDifficultyColor(spot.difficulty)} text-white border-0 text-sm px-3 py-1`}
                >
                  {spot.difficulty}
                </Badge>
              </div>
              <CardDescription className="text-base mt-2">
                {spot.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center text-sm font-medium mb-3">
                    <Waves className="h-4 w-4 mr-2 text-primary" />
                    Información de las Olas
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Tipo de Ola:</span>
                      <span className="ml-2 text-muted-foreground">{spot.waveType}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center text-sm font-medium mb-3">
                    <Wind className="h-4 w-4 mr-2 text-primary" />
                    Condiciones Ideales
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium block mb-1">Direcciones de Viento:</span>
                      <div className="flex flex-wrap gap-1">
                        {spot.bestConditions.windDirection.map((direction) => (
                          <Badge key={direction} variant="outline" className="text-xs">
                            {direction}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium block mb-1">Direcciones de Swell:</span>
                      <div className="flex flex-wrap gap-1">
                        {spot.bestConditions.swellDirection.map((direction) => (
                          <Badge key={direction} variant="outline" className="text-xs">
                            {direction}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium block mb-1">Altura de Marea:</span>
                      <div className="flex flex-wrap gap-1">
                        {spot.bestConditions.tideHeight.map((tide) => (
                          <Badge key={tide} variant="secondary" className="text-xs">
                            {tide}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium mb-3 flex items-center">
                    <Compass className="h-4 w-4 mr-2 text-primary" />
                    Instalaciones
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {spot.facilities.map((facility) => (
                      <Badge key={facility} variant="secondary" className="text-xs">
                        {facility}
                      </Badge>
                    ))}
                  </div>
                </div>

                {spot.hazards.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-3 flex items-center text-destructive">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Peligros y Precauciones
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {spot.hazards.map((hazard) => (
                        <Badge key={hazard} variant="destructive" className="text-xs">
                          {hazard}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map placeholder - could integrate with actual map later */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ubicación</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center text-sm text-muted-foreground">
                <div className="text-center">
                  <MapPin className="h-8 w-8 mx-auto mb-2" />
                  <p>Lat: {spot.coordinates.lat}</p>
                  <p>Lng: {spot.coordinates.lng}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Photos Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Fotos del Spot</h2>
          {spotPhotos.length > 0 && (
            <p className="text-sm text-muted-foreground">
              {spotPhotos.length} foto{spotPhotos.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {spotPhotos.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {spotPhotos.map((photo) => (
              <SpotPhotoCard key={photo.id} photo={photo} spot={spot} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No hay fotos disponibles</h3>
              <p className="text-muted-foreground mb-4">
                Sé el primero en compartir una foto de este spot
              </p>
              <Link href="/upload">
                <Button>
                  <Camera className="h-4 w-4 mr-2" />
                  Subir Foto
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function SpotPhotoCard({ photo, spot }: { photo: SpotPhoto; spot: SurfingSpot }) {
  const [liked, setLiked] = useState(false);

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={photo.imageUrl}
          alt={photo.caption || `Foto de ${spot.name}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Overlay info */}
        <div className="absolute bottom-2 left-2 right-2 text-white transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex items-center text-xs mb-1">
            <Camera className="h-3 w-3 mr-1" />
            <span>{photo.photographerName}</span>
          </div>
          <div className="flex items-center text-xs">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{format(photo.timestamp, "MMM dd, yyyy")}</span>
          </div>
        </div>

        {/* View button */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
            <SpotPhotoModal photo={photo} spot={spot} />
          </DialogContent>
        </Dialog>
      </div>
      
      <CardContent className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{format(photo.timestamp, "MMM dd, yyyy")}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-1"
            onClick={() => setLiked(!liked)}
          >
            <Heart className={`h-4 w-4 ${liked ? "fill-red-500 text-red-500" : ""}`} />
            <span className="text-xs ml-1">{photo.likes + (liked ? 1 : 0)}</span>
          </Button>
        </div>
        
        {photo.caption && (
          <p className="text-sm line-clamp-2 mb-2">{photo.caption}</p>
        )}
        
        <div className="flex flex-wrap gap-1">
          {photo.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              #{tag}
            </Badge>
          ))}
          {photo.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{photo.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function SpotPhotoModal({ photo, spot }: { photo: SpotPhoto; spot: SurfingSpot }) {
  return (
    <>
      <div className="space-y-4">
        <div className="relative">
          <img
            src={photo.imageUrl}
            alt={photo.caption || `Foto de ${spot.name}`}
            className="w-full max-h-96 object-contain rounded-lg"
          />
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">Detalles de la Foto</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{spot.name}</span>
              </div>
              <div className="flex items-center">
                <Camera className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{photo.photographerName}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{format(photo.timestamp, "MMMM dd, yyyy 'at' HH:mm")}</span>
              </div>
              {photo.photographerEmail && (
                <div className="text-xs text-muted-foreground">
                  {photo.photographerEmail}
                </div>
              )}
            </div>
          </div>
          
          {photo.conditions.waveHeight && (
            <div>
              <h4 className="font-medium mb-2">Condiciones</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Waves className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Olas de {photo.conditions.waveHeight} pies</span>
                </div>
                {photo.conditions.windSpeed && (
                  <div className="flex items-center">
                    <Wind className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{photo.conditions.windSpeed}km/h {photo.conditions.windDirection}</span>
                  </div>
                )}
                {photo.conditions.weather && (
                  <div className="text-sm">
                    <span className="font-medium">Clima:</span> {photo.conditions.weather}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div>
          {photo.caption && <p className="text-sm mb-3">{photo.caption}</p>}
          <div className="flex flex-wrap gap-2">
            {photo.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
