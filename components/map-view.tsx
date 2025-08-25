"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { SurfingSpot } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Waves, MapPin, Wind, Compass } from "lucide-react";

// Dynamically import the map component to avoid SSR issues
const DynamicMap = dynamic(() => import("@/components/leaflet-map"), {
  ssr: false,
  loading: () => (
    <div className="h-full bg-muted rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
        <p className="text-sm text-muted-foreground">Cargando mapa...</p>
      </div>
    </div>
  ),
});

interface MapViewProps {
  spots: SurfingSpot[];
}

export function MapView({ spots }: MapViewProps) {
  const [selectedSpot, setSelectedSpot] = useState<SurfingSpot | null>(null);

  return (
    <div className="h-full w-full p-6">
      {/* Title */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Mapa Interactivo</h2>
        <p className="text-muted-foreground">Explora los spots de surf y haz clic en un marcador para ver detalles</p>
      </div>
      
      {/* Map and Spot Details Side by Side - Full Height */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-12rem)]">
        {/* Map - Left Half */}
        <div className="rounded-lg overflow-hidden border shadow-lg bg-background relative">
          <DynamicMap spots={spots} onSpotSelect={setSelectedSpot} />
        </div>
        
        {/* Spot Details - Right Half */}
        <div className="flex flex-col">
          {selectedSpot ? (
            <SpotDetails spot={selectedSpot} />
          ) : (
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  Selecciona un Spot
                </CardTitle>
                <CardDescription>
                  Haz clic en cualquier marcador del mapa para ver información detallada sobre ese spot de surf.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto">
                <div className="text-sm text-muted-foreground">
                  <p className="mb-4">Spots disponibles ({spots.length}):</p>
                  <div className="grid grid-cols-1 gap-2">
                    {spots.map((spot) => (
                      <div key={spot.id} className="flex items-center p-2 rounded hover:bg-muted/50 transition-colors">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0" />
                        <div className="flex-1">
                          <span className="font-medium">{spot.name}</span>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {spot.difficulty}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{spot.waveType}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function SpotDetails({ spot }: { spot: SurfingSpot }) {
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
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-lg">
            <MapPin className="h-5 w-5 mr-2 text-primary" />
            {spot.name}
          </CardTitle>
          <Badge 
            variant="secondary" 
            className={`${getDifficultyColor(spot.difficulty)} text-white`}
          >
            {spot.difficulty}
          </Badge>
        </div>
        <CardDescription>{spot.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto space-y-4">
        <div>
          <div className="flex items-center text-sm font-medium mb-2">
            <Waves className="h-4 w-4 mr-2" />
            Tipo de Ola
          </div>
          <p className="text-sm text-muted-foreground">{spot.waveType}</p>
        </div>
        
        <div>
          <div className="flex items-center text-sm font-medium mb-2">
            <Wind className="h-4 w-4 mr-2" />
            Mejores Direcciones de Viento
          </div>
          <div className="flex flex-wrap gap-1">
            {spot.bestConditions.windDirection.map((direction) => (
              <Badge key={direction} variant="outline" className="text-xs">
                {direction}
              </Badge>
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex items-center text-sm font-medium mb-2">
            <Compass className="h-4 w-4 mr-2" />
            Mejores Direcciones de Swell
          </div>
          <div className="flex flex-wrap gap-1">
            {spot.bestConditions.swellDirection.map((direction) => (
              <Badge key={direction} variant="outline" className="text-xs">
                {direction}
              </Badge>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Instalaciones</h4>
          <div className="flex flex-wrap gap-1">
            {spot.facilities.map((facility) => (
              <Badge key={facility} variant="secondary" className="text-xs">
                {facility}
              </Badge>
            ))}
          </div>
        </div>
        
        {spot.hazards.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2 text-destructive">Peligros</h4>
            <div className="flex flex-wrap gap-1">
              {spot.hazards.map((hazard) => (
                <Badge key={hazard} variant="destructive" className="text-xs">
                  {hazard}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
