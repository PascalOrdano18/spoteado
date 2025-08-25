import { MapView } from "@/components/map-view";
import { SpotGrid } from "@/components/spot-grid";
import { marDelPlataSpots } from "@/data/surfing-spots";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Map Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-6">Mapa Interactivo</h2>
          <MapView spots={marDelPlataSpots} />
        </div>
      </section>

      {/* Spots Section */}
      <section className="py-8 px-4 bg-muted/20">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-6">Todos los Spots de Surf</h2>
          <SpotGrid spots={marDelPlataSpots} />
        </div>
      </section>
    </div>
  );
}
