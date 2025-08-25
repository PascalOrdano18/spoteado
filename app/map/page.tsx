import { MapView } from "@/components/map-view";
import { marDelPlataSpots } from "@/data/surfing-spots";

export default function MapPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Mapa de Spots de Surf</h1>
        <p className="text-muted-foreground">
          Explora todos los spots de surf a lo largo de la costa de Mar del Plata. Haz clic en los marcadores para ver detalles y condiciones.
        </p>
      </div>
      <MapView spots={marDelPlataSpots} />
    </div>
  );
}
