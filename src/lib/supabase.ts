import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://cxdleunzjuspodddtaeh.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4ZGxldW56anVzcG9kZGR0YWVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4ODYwNTksImV4cCI6MjA3NjQ2MjA1OX0.t4vcXOYk-xsd3CgRjTVa4GZ_csz8eU-d8WscZJPF6cQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para la base de datos simplificada
export interface Database {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string
          email: string
          full_name: string
          created_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          created_at?: string
        }
      }
      ingredients: {
        Row: {
          id: string
          name: string
          stock_quantity: number
          min_stock_level: number
          unit: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          stock_quantity?: number
          min_stock_level?: number
          unit: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          stock_quantity?: number
          min_stock_level?: number
          unit?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
