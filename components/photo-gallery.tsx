"use client";

import { useState, useMemo } from "react";
import { format } from "date-fns";
import { SpotPhoto } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Heart, MapPin, Camera, Calendar, Wind, Waves, Search, Filter, Eye } from "lucide-react";
import { marDelPlataSpots } from "@/data/surfing-spots";
import { samplePhotos } from "@/data/sample-photos";
import Link from "next/link";

export function PhotoGallery() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpot, setSelectedSpot] = useState("all");
  const [selectedTag, setSelectedTag] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Get all unique tags from photos
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    samplePhotos.forEach(photo => {
      photo.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Filter and sort photos
  const filteredPhotos = useMemo(() => {
    let filtered = samplePhotos.filter(photo => {
      const matchesSearch = (photo.caption?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                           photo.photographerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           photo.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesSpot = selectedSpot === "all" || photo.spotId === selectedSpot;
      const matchesTag = selectedTag === "all" || photo.tags.includes(selectedTag);
      
      return matchesSearch && matchesSpot && matchesTag;
    });

    // Sort photos
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        break;
      case "oldest":
        filtered.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
        break;
      case "popular":
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      default:
        break;
    }

    return filtered;
  }, [searchTerm, selectedSpot, selectedTag, sortBy]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 p-4 bg-muted/30 rounded-lg">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar fotos, fotógrafos o etiquetas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={selectedSpot} onValueChange={setSelectedSpot}>
          <SelectTrigger className="w-full lg:w-[200px]">
            <SelectValue placeholder="Todos los Spots" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los Spots</SelectItem>
            {marDelPlataSpots.map((spot) => (
              <SelectItem key={spot.id} value={spot.id}>
                {spot.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={selectedTag} onValueChange={setSelectedTag}>
          <SelectTrigger className="w-full lg:w-[150px]">
            <SelectValue placeholder="Todas las Etiquetas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las Etiquetas</SelectItem>
            {allTags.map((tag) => (
              <SelectItem key={tag} value={tag}>
                #{tag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full lg:w-[150px]">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Más Recientes</SelectItem>
            <SelectItem value="oldest">Más Antiguos</SelectItem>
            <SelectItem value="popular">Más Populares</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
Mostrando {filteredPhotos.length} de {samplePhotos.length} fotos
      </div>

      {/* Photo Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredPhotos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </div>

      {filteredPhotos.length === 0 && (
        <div className="text-center py-12">
          <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No se encontraron fotos</h3>
          <p className="text-muted-foreground">
            Intenta ajustar tus términos de búsqueda o filtros
          </p>
        </div>
      )}
    </div>
  );
}

function PhotoCard({ photo }: { photo: SpotPhoto }) {
  const spot = marDelPlataSpots.find(s => s.id === photo.spotId);
  const [liked, setLiked] = useState(false);

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={photo.imageUrl}
          alt={photo.caption}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Overlay info */}
        <div className="absolute bottom-2 left-2 right-2 text-white transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex items-center text-xs mb-1">
            <MapPin className="h-3 w-3 mr-1" />
            {spot ? (
              <Link href={`/spots/${spot.id}`} className="hover:text-blue-300 transition-colors">
                {spot.name}
              </Link>
            ) : (
              <span>Spot desconocido</span>
            )}
          </div>
          <div className="flex items-center text-xs">
            <Camera className="h-3 w-3 mr-1" />
            <span>{photo.photographerName}</span>
          </div>
        </div>

        {/* View button */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
            <PhotoModal photo={photo} spot={spot} />
          </DialogContent>
        </Dialog>
      </div>
      
      <CardContent className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{format(photo.timestamp, "MMM dd, yyyy")}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-1"
            onClick={() => setLiked(!liked)}
          >
            <Heart className={`h-4 w-4 ${liked ? "fill-red-500 text-red-500" : ""}`} />
            <span className="text-xs ml-1">{photo.likes + (liked ? 1 : 0)}</span>
          </Button>
        </div>
        
        <p className="text-sm line-clamp-2 mb-2">{photo.caption}</p>
        
        <div className="flex flex-wrap gap-1">
          {photo.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              #{tag}
            </Badge>
          ))}
          {photo.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{photo.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function PhotoModal({ photo, spot }: { photo: SpotPhoto; spot: any }) {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center">
          <Camera className="h-5 w-5 mr-2" />
          {photo.photographerName}
        </DialogTitle>
        <DialogDescription>
          {format(photo.timestamp, "MMMM dd, yyyy 'at' HH:mm")}
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-4">
        <div className="relative">
          <img
            src={photo.imageUrl}
            alt={photo.caption}
            className="w-full max-h-96 object-contain rounded-lg"
          />
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
                          <h4 className="font-medium mb-2">Detalles de la Foto</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                {spot ? (
                  <Link href={`/spots/${spot.id}`} className="hover:text-primary transition-colors">
                    {spot.name}
                  </Link>
                ) : (
                  <span>Spot desconocido</span>
                )}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{format(photo.timestamp, "MMMM dd, yyyy 'at' HH:mm")}</span>
              </div>
              {photo.photographerEmail && (
                <div className="flex items-center">
                  <Camera className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{photo.photographerEmail}</span>
                </div>
              )}
            </div>
          </div>
          
          {photo.conditions.waveHeight && (
            <div>
              <h4 className="font-medium mb-2">Condiciones</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Waves className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Olas de {photo.conditions.waveHeight} pies</span>
                </div>
                {photo.conditions.windSpeed && (
                  <div className="flex items-center">
                    <Wind className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{photo.conditions.windSpeed}km/h {photo.conditions.windDirection}</span>
                  </div>
                )}
                {photo.conditions.weather && (
                  <div className="text-sm">
                    <span className="font-medium">Clima:</span> {photo.conditions.weather}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div>
          <p className="text-sm mb-3">{photo.caption}</p>
          <div className="flex flex-wrap gap-2">
            {photo.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
