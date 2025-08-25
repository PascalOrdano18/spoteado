import { SpotGrid } from "@/components/spot-grid";
import { marDelPlataSpots } from "@/data/surfing-spots";

export default function SpotsPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Todos los Spots de Surf</h1>
        <p className="text-muted-foreground">
          Descubre todos los {marDelPlataSpots.length} spots de surf de Mar del Plata. Cada spot tiene características y condiciones únicas.
        </p>
      </div>
      <SpotGrid spots={marDelPlataSpots} />
    </div>
  );
}
