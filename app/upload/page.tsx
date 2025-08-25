import { PhotoUpload } from "@/components/photo-upload";

export default function UploadPage() {
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Comparte tus Fotos de Surf</h1>
        <p className="text-muted-foreground">
          Sube fotos de surfistas en los spots de Mar del Plata. Ayuda a construir nuestra galería comunitaria 
          y permite que los surfistas se encuentren en acción!
        </p>
      </div>
      <PhotoUpload />
    </div>
  );
}
