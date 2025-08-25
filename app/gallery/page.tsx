import { PhotoGallery } from "@/components/photo-gallery";

export default function GalleryPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Photo Gallery</h1>
        <p className="text-muted-foreground">
          Browse photos from Mar del Plata surf spots. Filter by date, location, and more to find specific sessions or surfers.
        </p>
      </div>
      <PhotoGallery />
    </div>
  );
}
