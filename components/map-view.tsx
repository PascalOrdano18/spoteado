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
    <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
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
    <div className="space-y-6">
      {/* Map */}
      <div className="h-96 lg:h-[500px] rounded-lg overflow-hidden border shadow-lg">
        <DynamicMap spots={spots} onSpotSelect={setSelectedSpot} />
      </div>
      
      {/* Selected Spot Details & Legend */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {selectedSpot ? (
            <SpotDetails spot={selectedSpot} />
          ) : (
            <Card>
              <CardHeader>
                              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                Selecciona un Spot
              </CardTitle>
              <CardDescription>
                Haz clic en cualquier marcador del mapa para ver información detallada sobre ese spot de surf.
              </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  <p className="mb-2">Spots disponibles ({spots.length}):</p>
                  <div className="grid grid-cols-2 gap-2">
                    {spots.map((spot) => (
                      <div key={spot.id} className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-2 flex-shrink-0" />
                        <span className="truncate">{spot.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Leyenda de Dificultad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center text-sm">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span>Principiante</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <span>Intermedio</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                <span>Avanzado</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span>Solo Expertos</span>
              </div>
            </CardContent>
          </Card>
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
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
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
      <CardContent className="space-y-4">
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
