import { MapView } from "@/components/map-view";
import { SpotGrid } from "@/components/spot-grid";
import { marDelPlataSpots } from "@/data/surfing-spots";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Map Section - Full Viewport */}
      <section id="map-section" className="h-screen w-full relative">
        <div className="h-full w-full">
          <MapView spots={marDelPlataSpots} />
        </div>
      </section>

      {/* Spots Section - Always visible below map */}
      <section id="spots-section" className="py-8 px-4 bg-muted/20 relative z-10 min-h-screen">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-6">Todos los Spots de Surf</h2>
          <SpotGrid spots={marDelPlataSpots} />
        </div>
      </section>
    </div>
  );
}
