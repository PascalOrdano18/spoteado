import { SurfingSpot } from '@/types';

export const marDelPlataSpots: SurfingSpot[] = [
  {
    id: 'playa-grande',
    name: 'Playa Grande',
    description: 'The most popular beach in Mar del Plata with consistent waves and good facilities.',
    coordinates: { lat: -38.0054, lng: -57.5426 },
    difficulty: 'Beginner',
    waveType: 'Beach Break',
    bestConditions: {
      windDirection: ['W', 'NW', 'SW'],
      swellDirection: ['E', 'SE', 'S'],
      tideHeight: ['Mid', 'High']
    },
    facilities: ['Parking', 'Restaurants', 'Surf Shops', 'Showers', 'Lifeguards'],
    hazards: ['Crowds', 'Rocks at low tide']
  },
  {
    id: 'varese',
    name: 'Playa Varese',
    description: 'A quieter beach break with good waves for intermediate surfers.',
    coordinates: { lat: -38.0089, lng: -57.5389 },
    difficulty: 'Intermediate',
    waveType: 'Beach Break',
    bestConditions: {
      windDirection: ['W', 'NW'],
      swellDirection: ['E', 'SE'],
      tideHeight: ['Mid', 'Low']
    },
    facilities: ['Parking', 'Beach Clubs', 'Restaurants'],
    hazards: ['Strong currents', 'Rocks']
  },
  {
    id: 'la-perla',
    name: 'La Perla',
    description: 'Historic neighborhood beach with consistent small waves, perfect for beginners.',
    coordinates: { lat: -38.0125, lng: -57.5342 },
    difficulty: 'Beginner',
    waveType: 'Beach Break',
    bestConditions: {
      windDirection: ['W', 'NW', 'SW'],
      swellDirection: ['E', 'SE'],
      tideHeight: ['All tides']
    },
    facilities: ['Historic Casino', 'Restaurants', 'Promenade', 'Parking'],
    hazards: ['Crowds in summer']
  },
  {
    id: 'playa-popular',
    name: 'Playa Popular',
    description: 'A local favorite with good waves and less crowds than the main beaches.',
    coordinates: { lat: -38.0198, lng: -57.5278 },
    difficulty: 'Intermediate',
    waveType: 'Beach Break',
    bestConditions: {
      windDirection: ['W', 'NW'],
      swellDirection: ['E', 'SE', 'S'],
      tideHeight: ['Mid', 'High']
    },
    facilities: ['Parking', 'Local Restaurants'],
    hazards: ['Rocky areas', 'Limited facilities']
  },
  {
    id: 'cabo-corrientes',
    name: 'Cabo Corrientes',
    description: 'Rocky point with powerful waves for advanced surfers. Best in big swells.',
    coordinates: { lat: -38.0856, lng: -57.5167 },
    difficulty: 'Advanced',
    waveType: 'Point Break',
    bestConditions: {
      windDirection: ['W', 'NW'],
      swellDirection: ['S', 'SE'],
      tideHeight: ['Mid', 'Low']
    },
    facilities: ['Limited parking', 'Scenic views'],
    hazards: ['Sharp rocks', 'Strong currents', 'Difficult access']
  },
  {
    id: 'playa-serena',
    name: 'Playa Serena',
    description: 'A more secluded beach south of the city with clean waves.',
    coordinates: { lat: -38.0267, lng: -57.5234 },
    difficulty: 'Intermediate',
    waveType: 'Beach Break',
    bestConditions: {
      windDirection: ['W', 'NW', 'SW'],
      swellDirection: ['E', 'SE'],
      tideHeight: ['All tides']
    },
    facilities: ['Parking', 'Beach bars'],
    hazards: ['Isolated location', 'No lifeguards']
  },
  {
    id: 'waikiki',
    name: 'Waikiki',
    description: 'Popular surf spot with consistent waves and good vibes.',
    coordinates: { lat: -38.0445, lng: -57.5089 },
    difficulty: 'Intermediate',
    waveType: 'Beach Break',
    bestConditions: {
      windDirection: ['W', 'NW'],
      swellDirection: ['E', 'SE', 'S'],
      tideHeight: ['Mid', 'High']
    },
    facilities: ['Surf schools', 'Equipment rental', 'Restaurants'],
    hazards: ['Crowds', 'Beginners in the water']
  },
  {
    id: 'playa-chica',
    name: 'Playa Chica',
    description: 'Small protected bay perfect for learning and small wave sessions.',
    coordinates: { lat: -38.0034, lng: -57.5445 },
    difficulty: 'Beginner',
    waveType: 'Beach Break',
    bestConditions: {
      windDirection: ['All directions'],
      swellDirection: ['E', 'SE'],
      tideHeight: ['All tides']
    },
    facilities: ['Calm waters', 'Easy access', 'Nearby amenities'],
    hazards: ['Very small waves', 'Overcrowded in summer']
  }
];
