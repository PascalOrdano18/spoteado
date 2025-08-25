"use client";

import { useState, useRef, useEffect } from "react";
import { Search, MapPin, Camera, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { marDelPlataSpots } from "@/data/surfing-spots";
import { samplePhotos } from "@/data/sample-photos";
import Link from "next/link";

interface SearchResult {
  type: 'spot' | 'photo';
  id: string;
  title: string;
  description: string;
  link: string;
  tags?: string[];
}

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when search opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Clear search when closing
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
      setResults([]);
    }
  }, [isOpen]);

  // Search logic
  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate a small delay for better UX
    const timeoutId = setTimeout(() => {
      const searchResults: SearchResult[] = [];
      const term = searchTerm.toLowerCase();

      // Search spots
      marDelPlataSpots.forEach(spot => {
        if (
          spot.name.toLowerCase().includes(term) ||
          spot.description.toLowerCase().includes(term) ||
          spot.difficulty.toLowerCase().includes(term) ||
          spot.waveType.toLowerCase().includes(term)
        ) {
          searchResults.push({
            type: 'spot',
            id: spot.id,
            title: spot.name,
            description: `${spot.difficulty} • ${spot.waveType}`,
            link: `/spots/${spot.id}`,
            tags: [spot.difficulty, spot.waveType]
          });
        }
      });

      // Search photos
      samplePhotos.forEach(photo => {
        const matchesCaption = photo.caption?.toLowerCase().includes(term);
        const matchesPhotographer = photo.photographerName.toLowerCase().includes(term);
        const matchesTags = photo.tags.some(tag => tag.toLowerCase().includes(term));
        
        if (matchesCaption || matchesPhotographer || matchesTags) {
          const spot = marDelPlataSpots.find(s => s.id === photo.spotId);
          searchResults.push({
            type: 'photo',
            id: photo.id,
            title: photo.caption || `Foto por ${photo.photographerName}`,
            description: `por ${photo.photographerName} en ${spot?.name || 'Spot desconocido'}`,
            link: `/gallery?photo=${photo.id}`,
            tags: photo.tags
          });
        }
      });

      // Limit results and sort by relevance
      setResults(searchResults.slice(0, 8));
      setIsLoading(false);
    }, 150);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998]"
        onClick={onClose}
      />
      
      {/* Search Modal */}
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl mx-4 z-[9999]">
        <div className="bg-background border rounded-lg shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center px-4 py-3 border-b">
            <Search className="h-4 w-4 text-muted-foreground mr-3" />
            <Input
              ref={inputRef}
              placeholder="Buscar spots, fotos, fotógrafos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border-0 focus-visible:ring-0 text-base"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="ml-2 h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto">
            {isLoading && (
              <div className="p-4 text-center text-muted-foreground">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto mb-2"></div>
                Buscando...
              </div>
            )}

            {!isLoading && searchTerm && results.length === 0 && (
              <div className="p-4 text-center text-muted-foreground">
                <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No se encontraron resultados para "{searchTerm}"</p>
                <p className="text-sm mt-1">Intenta con otros términos de búsqueda</p>
              </div>
            )}

            {!isLoading && results.length > 0 && (
              <div className="py-2">
                <div className="px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Resultados ({results.length})
                </div>
                {results.map((result) => (
                  <Link
                    key={`${result.type}-${result.id}`}
                    href={result.link}
                    onClick={onClose}
                    className="flex items-center px-4 py-3 hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 mr-3 group-hover:bg-primary/20 transition-colors">
                      {result.type === 'spot' ? (
                        <MapPin className="h-4 w-4 text-primary" />
                      ) : (
                        <Camera className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm truncate">{result.title}</p>
                        <Badge 
                          variant="secondary" 
                          className="text-xs shrink-0"
                        >
                          {result.type === 'spot' ? 'Spot' : 'Foto'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {result.description}
                      </p>
                      {result.tags && result.tags.length > 0 && (
                        <div className="flex gap-1 mt-1">
                          {result.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-0.5 bg-muted rounded text-muted-foreground"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {!searchTerm && (
              <div className="p-4 text-center text-muted-foreground">
                <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="font-medium">Búsqueda Global</p>
                <p className="text-sm mt-1">Busca spots de surf, fotos y fotógrafos</p>
                <div className="flex justify-center gap-2 mt-3 text-xs">
                  <kbd className="px-2 py-1 bg-muted rounded text-muted-foreground">ESC</kbd>
                  <span className="text-muted-foreground">para cerrar</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
