export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      collection_photos: {
        Row: {
          added_at: string
          collection_id: string
          photo_id: string
        }
        Insert: {
          added_at?: string
          collection_id: string
          photo_id: string
        }
        Update: {
          added_at?: string
          collection_id?: string
          photo_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "collection_photos_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collection_photos_photo_id_fkey"
            columns: ["photo_id"]
            isOneToOne: false
            referencedRelation: "photos"
            referencedColumns: ["id"]
          }
        ]
      }
      collections: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_public: boolean
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "collections_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      photo_likes: {
        Row: {
          created_at: string
          id: string
          photo_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          photo_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          photo_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "photo_likes_photo_id_fkey"
            columns: ["photo_id"]
            isOneToOne: false
            referencedRelation: "photos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "photo_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      photo_tags: {
        Row: {
          added_by_ai: boolean
          confidence_score: number | null
          photo_id: string
          tag_id: number
        }
        Insert: {
          added_by_ai?: boolean
          confidence_score?: number | null
          photo_id: string
          tag_id: number
        }
        Update: {
          added_by_ai?: boolean
          confidence_score?: number | null
          photo_id?: string
          tag_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "photo_tags_photo_id_fkey"
            columns: ["photo_id"]
            isOneToOne: false
            referencedRelation: "photos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "photo_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          }
        ]
      }
      photo_views: {
        Row: {
          id: string
          ip_address: unknown | null
          photo_id: string
          user_agent: string | null
          user_id: string | null
          viewed_at: string
        }
        Insert: {
          id?: string
          ip_address?: unknown | null
          photo_id: string
          user_agent?: string | null
          user_id?: string | null
          viewed_at?: string
        }
        Update: {
          id?: string
          ip_address?: unknown | null
          photo_id?: string
          user_agent?: string | null
          user_id?: string | null
          viewed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "photo_views_photo_id_fkey"
            columns: ["photo_id"]
            isOneToOne: false
            referencedRelation: "photos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "photo_views_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      photos: {
        Row: {
          ai_description: string | null
          ai_tags: string[]
          aperture: string | null
          camera_make: string | null
          camera_model: string | null
          caption: string | null
          crowd_level: Database["public"]["Enums"]["crowd_level"] | null
          downloads_count: number
          embedding: string | null
          exif_data: Json | null
          file_path: string
          file_size: number | null
          focal_length: string | null
          id: string
          image_height: number | null
          image_url: string
          image_width: number | null
          is_featured: boolean
          is_public: boolean
          iso: number | null
          lens_info: string | null
          likes_count: number
          moderation_result: Json | null
          moderation_status: string
          photographer_notes: string | null
          processing_status: string
          session_type: Database["public"]["Enums"]["session_type"] | null
          shares_count: number
          shutter_speed: string | null
          spot_id: string
          taken_at: string | null
          thumbnail_url: string | null
          updated_at: string
          uploaded_at: string
          user_id: string
          views_count: number
          water_temperature: number | null
          wave_height: number | null
          weather: Database["public"]["Enums"]["weather_condition"] | null
          wind_direction: Database["public"]["Enums"]["wind_direction"] | null
          wind_speed: number | null
        }
        Insert: {
          ai_description?: string | null
          ai_tags?: string[]
          aperture?: string | null
          camera_make?: string | null
          camera_model?: string | null
          caption?: string | null
          crowd_level?: Database["public"]["Enums"]["crowd_level"] | null
          downloads_count?: number
          embedding?: string | null
          exif_data?: Json | null
          file_path: string
          file_size?: number | null
          focal_length?: string | null
          id?: string
          image_height?: number | null
          image_url: string
          image_width?: number | null
          is_featured?: boolean
          is_public?: boolean
          iso?: number | null
          lens_info?: string | null
          likes_count?: number
          moderation_result?: Json | null
          moderation_status?: string
          photographer_notes?: string | null
          processing_status?: string
          session_type?: Database["public"]["Enums"]["session_type"] | null
          shares_count?: number
          shutter_speed?: string | null
          spot_id: string
          taken_at?: string | null
          thumbnail_url?: string | null
          updated_at?: string
          uploaded_at?: string
          user_id: string
          views_count?: number
          water_temperature?: number | null
          wave_height?: number | null
          weather?: Database["public"]["Enums"]["weather_condition"] | null
          wind_direction?: Database["public"]["Enums"]["wind_direction"] | null
          wind_speed?: number | null
        }
        Update: {
          ai_description?: string | null
          ai_tags?: string[]
          aperture?: string | null
          camera_make?: string | null
          camera_model?: string | null
          caption?: string | null
          crowd_level?: Database["public"]["Enums"]["crowd_level"] | null
          downloads_count?: number
          embedding?: string | null
          exif_data?: Json | null
          file_path?: string
          file_size?: number | null
          focal_length?: string | null
          id?: string
          image_height?: number | null
          image_url?: string
          image_width?: number | null
          is_featured?: boolean
          is_public?: boolean
          iso?: number | null
          lens_info?: string | null
          likes_count?: number
          moderation_result?: Json | null
          moderation_status?: string
          photographer_notes?: string | null
          processing_status?: string
          session_type?: Database["public"]["Enums"]["session_type"] | null
          shares_count?: number
          shutter_speed?: string | null
          spot_id?: string
          taken_at?: string | null
          thumbnail_url?: string | null
          updated_at?: string
          uploaded_at?: string
          user_id?: string
          views_count?: number
          water_temperature?: number | null
          wave_height?: number | null
          weather?: Database["public"]["Enums"]["weather_condition"] | null
          wind_direction?: Database["public"]["Enums"]["wind_direction"] | null
          wind_speed?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "photos_spot_id_fkey"
            columns: ["spot_id"]
            isOneToOne: false
            referencedRelation: "spots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "photos_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          instagram_handle: string | null
          is_photographer: boolean
          location: string | null
          updated_at: string
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          instagram_handle?: string | null
          is_photographer?: boolean
          location?: string | null
          updated_at?: string
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          instagram_handle?: string | null
          is_photographer?: boolean
          location?: string | null
          updated_at?: string
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      spots: {
        Row: {
          best_conditions: Json
          created_at: string
          description: string
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          facilities: string[]
          hazards: string[]
          id: string
          is_active: boolean
          latitude: number
          longitude: number
          name: string
          updated_at: string
          wave_type: Database["public"]["Enums"]["wave_type"]
        }
        Insert: {
          best_conditions?: Json
          created_at?: string
          description: string
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          facilities?: string[]
          hazards?: string[]
          id: string
          is_active?: boolean
          latitude: number
          longitude: number
          name: string
          updated_at?: string
          wave_type: Database["public"]["Enums"]["wave_type"]
        }
        Update: {
          best_conditions?: Json
          created_at?: string
          description?: string
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          facilities?: string[]
          hazards?: string[]
          id?: string
          is_active?: boolean
          latitude?: number
          longitude?: number
          name?: string
          updated_at?: string
          wave_type?: Database["public"]["Enums"]["wave_type"]
        }
        Relationships: []
      }
      tags: {
        Row: {
          category: string | null
          created_at: string
          id: number
          name: string
          usage_count: number
        }
        Insert: {
          category?: string | null
          created_at?: string
          id?: number
          name: string
          usage_count?: number
        }
        Update: {
          category?: string | null
          created_at?: string
          id?: number
          name?: string
          usage_count?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      search_photos_advanced: {
        Args: {
          query_embedding?: string
          search_text?: string
          spot_ids?: string[]
          min_wave_height?: number
          max_wave_height?: number
          weather_conditions?: Database["public"]["Enums"]["weather_condition"][]
          session_types?: Database["public"]["Enums"]["session_type"][]
          tag_names?: string[]
          similarity_threshold?: number
          match_count?: number
        }
        Returns: {
          id: string
          user_id: string
          spot_id: string
          image_url: string
          thumbnail_url: string | null
          caption: string | null
          ai_description: string | null
          wave_height: number | null
          wind_speed: number | null
          wind_direction: Database["public"]["Enums"]["wind_direction"] | null
          weather: Database["public"]["Enums"]["weather_condition"] | null
          likes_count: number
          uploaded_at: string
          similarity: number
        }[]
      }
    }
    Enums: {
      crowd_level: "vacio" | "pocos" | "moderado" | "lleno" | "muy_lleno"
      difficulty_level: "Principiante" | "Intermedio" | "Avanzado" | "Experto"
      session_type: "madrugada" | "mañana" | "tarde" | "atardecer" | "noche"
      wave_type: "Rompiente de Playa" | "Rompiente de Punta" | "Rompiente de Arrecife" | "Desembocadura de Río"
      weather_condition: "Soleado" | "Nublado" | "Lluvioso" | "Tormentoso"
      wind_direction: "N" | "NE" | "E" | "SE" | "S" | "SO" | "O" | "NO"
    }
  }
}

// Helper types para uso fácil
export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
        Database["public"]["Views"])
    ? (Database["public"]["Tables"] &
        Database["public"]["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never

// Types específicos para tu app (más fáciles de usar)
export type Photo = Tables<'photos'>
export type PhotoInsert = TablesInsert<'photos'>
export type PhotoUpdate = TablesUpdate<'photos'>
export type Profile = Tables<'profiles'>
export type ProfileInsert = TablesInsert<'profiles'>
export type ProfileUpdate = TablesUpdate<'profiles'>
export type Spot = Tables<'spots'>
export type Tag = Tables<'tags'>
export type PhotoLike = Tables<'photo_likes'>
export type PhotoView = Tables<'photo_views'>
export type Collection = Tables<'collections'>

// Enums para usar directamente
export type DifficultyLevel = Enums<'difficulty_level'>
export type WaveType = Enums<'wave_type'>
export type WeatherCondition = Enums<'weather_condition'>
export type WindDirection = Enums<'wind_direction'>
export type SessionType = Enums<'session_type'>
export type CrowdLevel = Enums<'crowd_level'>