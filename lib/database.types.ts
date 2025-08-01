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
          {
            foreignKeyName: "city_user_relations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
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
      login_requests: {
        Row: {
          anonymous_user_id: string
          approved: boolean
          created_at: string
          pair_code: number
          personal_number: number
        }
        Insert: {
          anonymous_user_id: string
          approved?: boolean
          created_at?: string
          pair_code: number
          personal_number: number
        }
        Update: {
          anonymous_user_id?: string
          approved?: boolean
          created_at?: string
          pair_code?: number
          personal_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "login_requests_personal_number_fkey"
            columns: ["personal_number"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["personal_number"]
          },
        ]
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
      personal_info_submissions: {
        Row: {
          address: string | null
          created_at: string
          email: string | null
          postal_code: string | null
          privacy_policy_accepted: boolean
          privacy_policy_accepted_at: string
          tel: string | null
          terms_accepted: boolean
          terms_accepted_at: string
          test_id: number
          user_id: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          email?: string | null
          postal_code?: string | null
          privacy_policy_accepted: boolean
          privacy_policy_accepted_at?: string
          tel?: string | null
          terms_accepted: boolean
          terms_accepted_at?: string
          test_id: number
          user_id: string
        }
        Update: {
          address?: string | null
          created_at?: string
          email?: string | null
          postal_code?: string | null
          privacy_policy_accepted?: boolean
          privacy_policy_accepted_at?: string
          tel?: string | null
          terms_accepted?: boolean
          terms_accepted_at?: string
          test_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "personal_info_submissions_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "tests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "personal_info_submissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          created_at: string
          description: string | null
          id: number
          image_name: string | null
          name: string
          test_id: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: never
          image_name?: string | null
          name: string
          test_id: number
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: never
          image_name?: string | null
          name?: string
          test_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "products_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "tests"
            referencedColumns: ["id"]
          },
        ]
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
      questions: {
        Row: {
          created_at: string
          description: string | null
          id: number
          product_id: number | null
          test_id: number
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: never
          product_id?: number | null
          test_id: number
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: never
          product_id?: number | null
          test_id?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "questions_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "questions_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "tests"
            referencedColumns: ["id"]
          },
        ]
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
      user_test_relations: {
        Row: {
          created_at: string
          id: number
          test_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: never
          test_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: never
          test_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_test_relations_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "tests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_test_relations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
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
        Args: { requested_permission: string }
        Returns: boolean
      }
      custom_access_token_hook: {
        Args: { event: Json }
        Returns: Json
      }
      test_is_active: {
        Args: { test_id: number }
        Returns: boolean
      }
      user_is_in_test: {
        Args: { p_test_id: number }
        Returns: boolean
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  api: {
    Enums: {},
  },
} as const
