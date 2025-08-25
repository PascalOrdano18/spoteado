export interface SurfingSpot {
  id: string;
  name: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  waveType: 'Beach Break' | 'Point Break' | 'Reef Break' | 'River Mouth';
  bestConditions: {
    windDirection: string[];
    swellDirection: string[];
    tideHeight: string[];
  };
  facilities: string[];
  hazards: string[];
}

export interface SpotPhoto {
  id: string;
  spotId: string;
  photographerName: string;
  photographerEmail?: string;
  imageUrl: string;
  caption?: string;
  timestamp: Date;
  conditions: {
    waveHeight?: number;
    windSpeed?: number;
    windDirection?: string;
    weather?: string;
  };
  tags: string[];
  likes: number;
}

export interface SpotCondition {
  id: string;
  spotId: string;
  timestamp: Date;
  reportedBy: string;
  waveHeight: number;
  windSpeed: number;
  windDirection: string;
  weather: 'Sunny' | 'Cloudy' | 'Rainy' | 'Stormy';
  crowdLevel: 'Empty' | 'Few People' | 'Moderate' | 'Crowded' | 'Very Crowded';
  waterQuality: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  notes?: string;
}

export interface FilterOptions {
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  spots: string[];
  photographer?: string;
  tags: string[];
  conditions: {
    minWaveHeight?: number;
    maxWaveHeight?: number;
    weather?: string[];
  };
}
