export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  api: {
    Tables: {
      cities: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: never
          name?: string | null
        }
        Update: {
          id?: never
          name?: string | null
        }
        Relationships: []
      }
      city_user_relations: {
        Row: {
          city_id: number
          created_at: string
          id: number
          user_id: string
        }
        Insert: {
          city_id: number
          created_at?: string
          id?: never
          user_id: string
        }
        Update: {
          city_id?: number
          created_at?: string
          id?: never
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "city_user_relations_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: never
          name: string
        }
        Update: {
          created_at?: string
          id?: never
          name?: string
        }
        Relationships: []
      }
      permissions: {
        Row: {
          permission: string
        }
        Insert: {
          permission: string
        }
        Update: {
          permission?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          id: string
          name: string
          personal_number: number
          tel: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
          name: string
          personal_number: number
          tel?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          personal_number?: number
          tel?: string | null
        }
        Relationships: []
      }
      role_permission_relations: {
        Row: {
          created_at: string
          id: number
          permission: string
          role: string
        }
        Insert: {
          created_at?: string
          id?: never
          permission: string
          role: string
        }
        Update: {
          created_at?: string
          id?: never
          permission?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_permission_relations_permission_fkey"
            columns: ["permission"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["permission"]
          },
          {
            foreignKeyName: "role_permission_relations_role_fkey"
            columns: ["role"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["role"]
          },
        ]
      }
      role_user_relations: {
        Row: {
          created_at: string
          id: number
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: never
          role: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: never
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_user_relations_role_fkey"
            columns: ["role"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["role"]
          },
        ]
      }
      roles: {
        Row: {
          description: string | null
          role: string
          title: string
        }
        Insert: {
          description?: string | null
          role: string
          title: string
        }
        Update: {
          description?: string | null
          role?: string
          title?: string
        }
        Relationships: []
      }
      tests: {
        Row: {
          active: boolean
          city: number | null
          company: number | null
          created_at: string
          date: string | null
          description: string | null
          id: number
          name: string
        }
        Insert: {
          active?: boolean
          city?: number | null
          company?: number | null
          created_at?: string
          date?: string | null
          description?: string | null
          id?: never
          name: string
        }
        Update: {
          active?: boolean
          city?: number | null
          company?: number | null
          created_at?: string
          date?: string | null
          description?: string | null
          id?: never
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "tests_city_fkey"
            columns: ["city"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tests_company_fkey"
            columns: ["company"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_user_permissions: {
        Args: {
          requested_permission: string
        }
        Returns: boolean
      }
      custom_access_token_hook: {
        Args: {
          event: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
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
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
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
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
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
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
