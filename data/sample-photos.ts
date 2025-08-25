import { SpotPhoto } from '@/types';

// Sample photos for demonstration
export const samplePhotos: SpotPhoto[] = [
  {
    id: '1',
    spotId: 'playa-grande',
    photographerName: 'Carlos Rodriguez',
    photographerEmail: 'carlos@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&h=600&fit=crop',
    caption: 'Perfect barrel at Playa Grande during the morning session',
    timestamp: new Date('2024-01-15T08:30:00'),
    conditions: {
      waveHeight: 4,
      windSpeed: 10,
      windDirection: 'W',
      weather: 'Sunny'
    },
    tags: ['barrel', 'morning', 'perfect'],
    likes: 23
  },
  {
    id: '2',
    spotId: 'varese',
    photographerName: 'Maria Santos',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
    caption: 'Longboarder styling at Varese',
    timestamp: new Date('2024-01-14T16:45:00'),
    conditions: {
      waveHeight: 2.5,
      windSpeed: 15,
      windDirection: 'NW',
      weather: 'Cloudy'
    },
    tags: ['longboard', 'style', 'afternoon'],
    likes: 18
  },
  {
    id: '3',
    spotId: 'la-perla',
    photographerName: 'Diego Martinez',
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
    caption: 'Sunset session at La Perla with golden light',
    timestamp: new Date('2024-01-13T19:20:00'),
    conditions: {
      waveHeight: 3,
      windSpeed: 8,
      windDirection: 'SW',
      weather: 'Sunny'
    },
    tags: ['sunset', 'golden hour', 'beautiful'],
    likes: 41
  },
  {
    id: '4',
    spotId: 'cabo-corrientes',
    photographerName: 'Ana Gutierrez',
    imageUrl: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&h=600&fit=crop',
    caption: 'Big wave session at Cabo Corrientes - only for experts!',
    timestamp: new Date('2024-01-12T14:15:00'),
    conditions: {
      waveHeight: 8,
      windSpeed: 25,
      windDirection: 'W',
      weather: 'Stormy'
    },
    tags: ['big waves', 'expert', 'powerful'],
    likes: 67
  },
  {
    id: '5',
    spotId: 'waikiki',
    photographerName: 'Lucas Fernandez',
    imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop',
    caption: 'Learning to surf at Waikiki - perfect for beginners',
    timestamp: new Date('2024-01-11T10:00:00'),
    conditions: {
      waveHeight: 2,
      windSpeed: 12,
      windDirection: 'NW',
      weather: 'Sunny'
    },
    tags: ['beginner', 'learning', 'fun'],
    likes: 15
  },
  {
    id: '6',
    spotId: 'playa-popular',
    photographerName: 'Sofia Morales',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=800&h=600&fit=crop',
    caption: 'Local surfer showing off at Playa Popular',
    timestamp: new Date('2024-01-10T15:30:00'),
    conditions: {
      waveHeight: 3.5,
      windSpeed: 18,
      windDirection: 'W',
      weather: 'Cloudy'
    },
    tags: ['local', 'style', 'intermediate'],
    likes: 29
  },
  {
    id: '7',
    spotId: 'playa-grande',
    photographerName: 'Roberto Silva',
    imageUrl: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&h=600&fit=crop',
    caption: 'Dawn patrol at Playa Grande - empty lineup',
    timestamp: new Date('2024-01-09T06:45:00'),
    conditions: {
      waveHeight: 3,
      windSpeed: 5,
      windDirection: 'E',
      weather: 'Sunny'
    },
    tags: ['dawn patrol', 'empty', 'peaceful'],
    likes: 32
  },
  {
    id: '8',
    spotId: 'playa-serena',
    photographerName: 'Camila Torres',
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
    caption: 'Perfect conditions at the hidden gem Playa Serena',
    timestamp: new Date('2024-01-08T11:20:00'),
    conditions: {
      waveHeight: 4.5,
      windSpeed: 8,
      windDirection: 'W',
      weather: 'Sunny'
    },
    tags: ['hidden gem', 'perfect', 'clean'],
    likes: 38
  }
];
