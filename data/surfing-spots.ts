import { SurfingSpot } from '@/types';

export const marDelPlataSpots: SurfingSpot[] = [
  {
    id: 'playa-grande',
    name: 'Playa Grande',
    description: 'La playa más popular de Mar del Plata con olas consistentes y buenas instalaciones.',
    coordinates: { lat: -38.0054, lng: -57.5426 },
    difficulty: 'Principiante',
    waveType: 'Rompiente de Playa',
    bestConditions: {
      windDirection: ['O', 'NO', 'SO'],
      swellDirection: ['E', 'SE', 'S'],
      tideHeight: ['Media', 'Alta']
    },
    facilities: ['Estacionamiento', 'Restaurantes', 'Tiendas de Surf', 'Duchas', 'Guardavidas'],
    hazards: ['Multitudes', 'Rocas en marea baja']
  },
  {
    id: 'varese',
    name: 'Playa Varese',
    description: 'Una rompiente de playa más tranquila con buenas olas para surfistas intermedios.',
    coordinates: { lat: -38.0089, lng: -57.5389 },
    difficulty: 'Intermedio',
    waveType: 'Rompiente de Playa',
    bestConditions: {
      windDirection: ['O', 'NO'],
      swellDirection: ['E', 'SE'],
      tideHeight: ['Media', 'Baja']
    },
    facilities: ['Estacionamiento', 'Clubes de Playa', 'Restaurantes'],
    hazards: ['Corrientes fuertes', 'Rocas']
  },
  {
    id: 'la-perla',
    name: 'La Perla',
    description: 'Playa del barrio histórico con olas pequeñas consistentes, perfecta para principiantes.',
    coordinates: { lat: -38.0125, lng: -57.5342 },
    difficulty: 'Principiante',
    waveType: 'Rompiente de Playa',
    bestConditions: {
      windDirection: ['O', 'NO', 'SO'],
      swellDirection: ['E', 'SE'],
      tideHeight: ['Todas las mareas']
    },
    facilities: ['Casino Histórico', 'Restaurantes', 'Paseo Marítimo', 'Estacionamiento'],
    hazards: ['Multitudes en verano']
  },
  {
    id: 'playa-popular',
    name: 'Playa Popular',
    description: 'Una favorita local con buenas olas y menos multitudes que las playas principales.',
    coordinates: { lat: -38.0198, lng: -57.5278 },
    difficulty: 'Intermedio',
    waveType: 'Rompiente de Playa',
    bestConditions: {
      windDirection: ['O', 'NO'],
      swellDirection: ['E', 'SE', 'S'],
      tideHeight: ['Media', 'Alta']
    },
    facilities: ['Estacionamiento', 'Restaurantes Locales'],
    hazards: ['Áreas rocosas', 'Instalaciones limitadas']
  },
  {
    id: 'cabo-corrientes',
    name: 'Cabo Corrientes',
    description: 'Punta rocosa con olas poderosas para surfistas avanzados. Mejor con swells grandes.',
    coordinates: { lat: -38.0856, lng: -57.5167 },
    difficulty: 'Avanzado',
    waveType: 'Rompiente de Punta',
    bestConditions: {
      windDirection: ['O', 'NO'],
      swellDirection: ['S', 'SE'],
      tideHeight: ['Media', 'Baja']
    },
    facilities: ['Estacionamiento limitado', 'Vistas escénicas'],
    hazards: ['Rocas filosas', 'Corrientes fuertes', 'Acceso difícil']
  },
  {
    id: 'playa-serena',
    name: 'Playa Serena',
    description: 'Una playa más apartada al sur de la ciudad con olas limpias.',
    coordinates: { lat: -38.0267, lng: -57.5234 },
    difficulty: 'Intermedio',
    waveType: 'Rompiente de Playa',
    bestConditions: {
      windDirection: ['O', 'NO', 'SO'],
      swellDirection: ['E', 'SE'],
      tideHeight: ['Todas las mareas']
    },
    facilities: ['Estacionamiento', 'Bares de playa'],
    hazards: ['Ubicación aislada', 'Sin guardavidas']
  },
  {
    id: 'waikiki',
    name: 'Waikiki',
    description: 'Spot de surf popular con olas consistentes y buena onda.',
    coordinates: { lat: -38.0445, lng: -57.5089 },
    difficulty: 'Intermedio',
    waveType: 'Rompiente de Playa',
    bestConditions: {
      windDirection: ['O', 'NO'],
      swellDirection: ['E', 'SE', 'S'],
      tideHeight: ['Media', 'Alta']
    },
    facilities: ['Escuelas de surf', 'Alquiler de equipos', 'Restaurantes'],
    hazards: ['Multitudes', 'Principiantes en el agua']
  },
  {
    id: 'playa-chica',
    name: 'Playa Chica',
    description: 'Pequeña bahía protegida perfecta para aprender y sesiones de olas pequeñas.',
    coordinates: { lat: -38.0034, lng: -57.5445 },
    difficulty: 'Principiante',
    waveType: 'Rompiente de Playa',
    bestConditions: {
      windDirection: ['Todas las direcciones'],
      swellDirection: ['E', 'SE'],
      tideHeight: ['Todas las mareas']
    },
    facilities: ['Aguas tranquilas', 'Fácil acceso', 'Servicios cercanos'],
    hazards: ['Olas muy pequeñas', 'Muy concurrida en verano']
  }
];
