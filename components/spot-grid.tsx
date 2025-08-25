"use client";

import { useState } from "react";
import { SurfingSpot } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Waves, Wind, Compass, Search, Filter } from "lucide-react";

interface SpotGridProps {
  spots: SurfingSpot[];
}

export function SpotGrid({ spots }: SpotGridProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [waveTypeFilter, setWaveTypeFilter] = useState("all");

  const filteredSpots = spots.filter((spot) => {
    const matchesSearch = spot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         spot.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter === "all" || spot.difficulty === difficultyFilter;
    const matchesWaveType = waveTypeFilter === "all" || spot.waveType === waveTypeFilter;
    
    return matchesSearch && matchesDifficulty && matchesWaveType;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500 hover:bg-green-600';
      case 'Intermediate': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'Advanced': return 'bg-orange-500 hover:bg-orange-600';
      case 'Expert': return 'bg-red-500 hover:bg-red-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-muted/30 rounded-lg">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search spots..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Difficulties</SelectItem>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
            <SelectItem value="Expert">Expert</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={waveTypeFilter} onValueChange={setWaveTypeFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Wave Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Wave Types</SelectItem>
            <SelectItem value="Beach Break">Beach Break</SelectItem>
            <SelectItem value="Point Break">Point Break</SelectItem>
            <SelectItem value="Reef Break">Reef Break</SelectItem>
            <SelectItem value="River Mouth">River Mouth</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredSpots.length} of {spots.length} spots
      </div>

      {/* Spots Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpots.map((spot) => (
          <SpotCard key={spot.id} spot={spot} getDifficultyColor={getDifficultyColor} />
        ))}
      </div>

      {filteredSpots.length === 0 && (
        <div className="text-center py-12">
          <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No spots found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or filters
          </p>
        </div>
      )}
    </div>
  );
}

function SpotCard({ 
  spot, 
  getDifficultyColor 
}: { 
  spot: SurfingSpot; 
  getDifficultyColor: (difficulty: string) => string;
}) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-lg">
            <MapPin className="h-5 w-5 mr-2 text-primary" />
            {spot.name}
          </CardTitle>
          <Badge 
            className={`${getDifficultyColor(spot.difficulty)} text-white border-0`}
          >
            {spot.difficulty}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">
          {spot.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Waves className="h-4 w-4 mr-2" />
          <span className="font-medium">{spot.waveType}</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center text-xs text-muted-foreground">
            <Wind className="h-3 w-3 mr-2" />
            <span className="font-medium mr-2">Best Wind:</span>
            <div className="flex flex-wrap gap-1">
              {spot.bestConditions.windDirection.slice(0, 3).map((direction) => (
                <Badge key={direction} variant="outline" className="text-xs px-1 py-0">
                  {direction}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex items-center text-xs text-muted-foreground">
            <Compass className="h-3 w-3 mr-2" />
            <span className="font-medium mr-2">Best Swell:</span>
            <div className="flex flex-wrap gap-1">
              {spot.bestConditions.swellDirection.slice(0, 3).map((direction) => (
                <Badge key={direction} variant="outline" className="text-xs px-1 py-0">
                  {direction}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <div className="text-xs font-medium mb-1">Facilities:</div>
          <div className="flex flex-wrap gap-1">
            {spot.facilities.slice(0, 4).map((facility) => (
              <Badge key={facility} variant="secondary" className="text-xs">
                {facility}
              </Badge>
            ))}
            {spot.facilities.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{spot.facilities.length - 4} more
              </Badge>
            )}
          </div>
        </div>
        
        {spot.hazards.length > 0 && (
          <div>
            <div className="text-xs font-medium mb-1 text-destructive">Hazards:</div>
            <div className="flex flex-wrap gap-1">
              {spot.hazards.slice(0, 2).map((hazard) => (
                <Badge key={hazard} variant="destructive" className="text-xs">
                  {hazard}
                </Badge>
              ))}
              {spot.hazards.length > 2 && (
                <Badge variant="destructive" className="text-xs">
                  +{spot.hazards.length - 2} more
                </Badge>
              )}
            </div>
          </div>
        )}
        
        <Button variant="outline" size="sm" className="w-full">
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
