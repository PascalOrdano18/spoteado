import { PhotoUpload } from "@/components/photo-upload";

export default function UploadPage() {
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Share Your Surf Photos</h1>
        <p className="text-muted-foreground">
          Upload photos of surfers at Mar del Plata spots. Help build our community gallery 
          and let surfers find themselves in action!
        </p>
      </div>
      <PhotoUpload />
    </div>
  );
}
