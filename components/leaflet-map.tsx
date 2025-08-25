"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { SurfingSpot } from "@/types";

// Fix for default markers in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface LeafletMapProps {
  spots: SurfingSpot[];
  onSpotSelect: (spot: SurfingSpot) => void;
}

export default function LeafletMap({ spots, onSpotSelect }: LeafletMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map centered on Mar del Plata
    const map = L.map(mapContainerRef.current).setView([-38.0054, -57.5426], 12);
    mapRef.current = map;

    // Add tile layer - using dark theme compatible tiles
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(map);

    // Create custom icons based on difficulty
    const createCustomIcon = (difficulty: string) => {
      const color = getDifficultyColor(difficulty);
      return L.divIcon({
        html: `
          <div style="
            background-color: ${color};
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="
              width: 8px;
              height: 8px;
              background-color: white;
              border-radius: 50%;
            "></div>
          </div>
        `,
        className: "custom-surf-marker",
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });
    };

    // Add markers for each spot
    spots.forEach((spot) => {
      const marker = L.marker([spot.coordinates.lat, spot.coordinates.lng], {
        icon: createCustomIcon(spot.difficulty),
      }).addTo(map);

      // Create popup content
      const popupContent = `
        <div class="p-2 min-w-[200px]">
          <h3 class="font-bold text-lg mb-1">${spot.name}</h3>
          <p class="text-sm text-gray-600 mb-2">${spot.description}</p>
          <div class="space-y-1">
            <div class="flex items-center text-xs">
              <span class="font-medium">Difficulty:</span>
              <span class="ml-1 px-2 py-1 rounded text-white" style="background-color: ${getDifficultyColor(spot.difficulty)}">${spot.difficulty}</span>
            </div>
            <div class="text-xs">
              <span class="font-medium">Wave Type:</span> ${spot.waveType}
            </div>
            <div class="text-xs">
              <span class="font-medium">Best Wind:</span> ${spot.bestConditions.windDirection.join(', ')}
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, {
        maxWidth: 300,
        className: "custom-popup",
      });

      // Handle marker click
      marker.on("click", () => {
        onSpotSelect(spot);
      });
    });

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [spots, onSpotSelect]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#10b981'; // green-500
      case 'Intermediate': return '#eab308'; // yellow-500
      case 'Advanced': return '#f97316'; // orange-500
      case 'Expert': return '#ef4444'; // red-500
      default: return '#6b7280'; // gray-500
    }
  };

  return (
    <div 
      ref={mapContainerRef} 
      className="w-full h-full"
      style={{ minHeight: "400px" }}
    />
  );
}
