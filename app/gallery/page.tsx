import { PhotoGallery } from "@/components/photo-gallery";

export default function GalleryPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Galería de Fotos</h1>
        <p className="text-muted-foreground">
          Explora fotos de los spots de surf de Mar del Plata. Filtra por fecha, ubicación y más para encontrar sesiones específicas o surfistas.
        </p>
      </div>
      <PhotoGallery />
    </div>
  );
}
