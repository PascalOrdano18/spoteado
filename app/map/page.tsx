import { MapView } from "@/components/map-view";
import { marDelPlataSpots } from "@/data/surfing-spots";

export default function MapPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Surf Spots Map</h1>
        <p className="text-muted-foreground">
          Explore all surfing spots along the Mar del Plata coast. Click on markers to see details and conditions.
        </p>
      </div>
      <MapView spots={marDelPlataSpots} />
    </div>
  );
}
