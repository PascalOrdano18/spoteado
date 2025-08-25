"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, X, Camera, MapPin, Wind, Waves, Plus } from "lucide-react";
import { marDelPlataSpots } from "@/data/surfing-spots";

interface PhotoUploadForm {
  spotId: string;
  photographerName: string;
  photographerEmail: string;
  caption: string;
  conditions: {
    waveHeight: string;
    windSpeed: string;
    windDirection: string;
    weather: string;
  };
  tags: string[];
  file: File | null;
}

export function PhotoUpload() {
  const [form, setForm] = useState<PhotoUploadForm>({
    spotId: "",
    photographerName: "",
    photographerEmail: "",
    caption: "",
    conditions: {
      waveHeight: "",
      windSpeed: "",
      windDirection: "",
      weather: "",
    },
    tags: [],
    file: null,
  });
  
  const [newTag, setNewTag] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      setForm(prev => ({ ...prev, file }));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const addTag = () => {
    if (newTag.trim() && !form.tags.includes(newTag.trim())) {
      setForm(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setForm(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000));

    // In a real app, you would upload to your backend/storage here
    console.log("Photo upload:", form);
    
    // Reset form
    setForm({
      spotId: "",
      photographerName: "",
      photographerEmail: "",
      caption: "",
      conditions: {
        waveHeight: "",
        windSpeed: "",
        windDirection: "",
        weather: "",
      },
      tags: [],
      file: null,
    });
    
    setIsSubmitting(false);
    alert("¡Foto subida exitosamente! Gracias por contribuir a la comunidad.");
  };

  const selectedSpot = marDelPlataSpots.find(spot => spot.id === form.spotId);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Photo Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Camera className="h-5 w-5 mr-2" />
            Subir Foto
          </CardTitle>
          <CardDescription>
            Selecciona una foto de surfistas en uno de nuestros spots de Mar del Plata
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25"
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            {form.file ? (
              <div className="space-y-4">
                <div className="relative inline-block">
                  <img
                    src={URL.createObjectURL(form.file)}
                    alt="Preview"
                    className="max-w-full max-h-48 rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                    onClick={() => setForm(prev => ({ ...prev, file: null }))}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">{form.file.name}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                <div>
                  <p className="text-lg font-medium">Arrastra tu foto aquí</p>
                  <p className="text-sm text-muted-foreground">o haz clic para explorar</p>
                </div>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                  id="file-upload"
                />
                <Button type="button" variant="outline" asChild>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Elegir Archivo
                  </label>
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Spot Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Seleccionar Spot de Surf
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={form.spotId} onValueChange={(value) => setForm(prev => ({ ...prev, spotId: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Elige el spot de surf..." />
            </SelectTrigger>
            <SelectContent>
              {marDelPlataSpots.map((spot) => (
                <SelectItem key={spot.id} value={spot.id}>
                  {spot.name} - {spot.difficulty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {selectedSpot && (
            <div className="mt-3 p-3 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">{selectedSpot.description}</p>
              <div className="flex items-center mt-2">
                <Badge variant="secondary">{selectedSpot.waveType}</Badge>
                <Badge variant="outline" className="ml-2">{selectedSpot.difficulty}</Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Photographer Info */}
      <Card>
        <CardHeader>
          <CardTitle>Información del Fotógrafo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="photographer-name">Nombre *</Label>
            <Input
              id="photographer-name"
              value={form.photographerName}
              onChange={(e) => setForm(prev => ({ ...prev, photographerName: e.target.value }))}
              placeholder="Tu nombre"
              required
            />
          </div>
          <div>
            <Label htmlFor="photographer-email">Email (opcional)</Label>
            <Input
              id="photographer-email"
              type="email"
              value={form.photographerEmail}
              onChange={(e) => setForm(prev => ({ ...prev, photographerEmail: e.target.value }))}
              placeholder="tu@email.com"
            />
          </div>
        </CardContent>
      </Card>

      {/* Photo Details */}
      <Card>
        <CardHeader>
          <CardTitle>Detalles de la Foto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="caption">Descripción</Label>
            <Textarea
              id="caption"
              value={form.caption}
              onChange={(e) => setForm(prev => ({ ...prev, caption: e.target.value }))}
              placeholder="Describe la foto, menciona a los surfistas si los conoces..."
              rows={3}
            />
          </div>
          
          <div>
            <Label>Etiquetas</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Agregar etiqueta..."
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              />
              <Button type="button" variant="outline" onClick={addTag}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                  {tag}
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Ejemplos: tubo, aéreo, principiante, atardecer, olas grandes
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Conditions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Waves className="h-5 w-5 mr-2" />
            Condiciones (opcional)
          </CardTitle>
          <CardDescription>
            Ayuda a otros surfistas compartiendo las condiciones cuando se tomó esta foto
          </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="wave-height">Altura de Olas (pies)</Label>
            <Input
              id="wave-height"
              type="number"
              step="0.5"
              value={form.conditions.waveHeight}
              onChange={(e) => setForm(prev => ({
                ...prev,
                conditions: { ...prev.conditions, waveHeight: e.target.value }
              }))}
              placeholder="2.5"
            />
          </div>
          
          <div>
            <Label htmlFor="wind-speed">Velocidad del Viento (km/h)</Label>
            <Input
              id="wind-speed"
              type="number"
              value={form.conditions.windSpeed}
              onChange={(e) => setForm(prev => ({
                ...prev,
                conditions: { ...prev.conditions, windSpeed: e.target.value }
              }))}
              placeholder="15"
            />
          </div>
          
          <div>
            <Label htmlFor="wind-direction">Dirección del Viento</Label>
            <Select
              value={form.conditions.windDirection}
              onValueChange={(value) => setForm(prev => ({
                ...prev,
                conditions: { ...prev.conditions, windDirection: value }
              }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar dirección..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="N">Norte</SelectItem>
                <SelectItem value="NE">Noreste</SelectItem>
                <SelectItem value="E">Este</SelectItem>
                <SelectItem value="SE">Sureste</SelectItem>
                <SelectItem value="S">Sur</SelectItem>
                <SelectItem value="SW">Suroeste</SelectItem>
                <SelectItem value="W">Oeste</SelectItem>
                <SelectItem value="NW">Noroeste</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="weather">Clima</Label>
            <Select
              value={form.conditions.weather}
              onValueChange={(value) => setForm(prev => ({
                ...prev,
                conditions: { ...prev.conditions, weather: value }
              }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar clima..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sunny">Soleado</SelectItem>
                <SelectItem value="Cloudy">Nublado</SelectItem>
                <SelectItem value="Rainy">Lluvioso</SelectItem>
                <SelectItem value="Stormy">Tormentoso</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Submit */}
      <Button 
        type="submit" 
        size="lg" 
        className="w-full" 
        disabled={!form.file || !form.spotId || !form.photographerName || isSubmitting}
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Subiendo...
          </>
        ) : (
          <>
            <Upload className="h-4 w-4 mr-2" />
            Subir Foto
          </>
        )}
      </Button>
    </form>
  );
}
