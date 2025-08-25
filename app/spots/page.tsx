import { SpotGrid } from "@/components/spot-grid";
import { marDelPlataSpots } from "@/data/surfing-spots";

export default function SpotsPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">All Surf Spots</h1>
        <p className="text-muted-foreground">
          Discover all {marDelPlataSpots.length} surfing spots in Mar del Plata. Each spot has unique characteristics and conditions.
        </p>
      </div>
      <SpotGrid spots={marDelPlataSpots} />
    </div>
  );
}
