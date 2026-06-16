export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'admin' | 'manager' | 'staff'
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: 'admin' | 'manager' | 'staff'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: 'admin' | 'manager' | 'staff'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      suppliers: {
        Row: {
          id: string
          company_name: string
          contact_person: string | null
          email: string | null
          phone: string | null
          address: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_name: string
          contact_person?: string | null
          email?: string | null
          phone?: string | null
          address?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_name?: string
          contact_person?: string | null
          email?: string | null
          phone?: string | null
          address?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          sku: string
          barcode: string | null
          name: string
          description: string | null
          category_id: string | null
          supplier_id: string | null
          purchase_price: number
          selling_price: number
          stock_quantity: number
          minimum_stock: number
          unit: string
          image_url: string | null
          status: 'active' | 'inactive' | 'discontinued'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          sku: string
          barcode?: string | null
          name: string
          description?: string | null
          category_id?: string | null
          supplier_id?: string | null
          purchase_price?: number
          selling_price?: number
          stock_quantity?: number
          minimum_stock?: number
          unit?: string
          image_url?: string | null
          status?: 'active' | 'inactive' | 'discontinued'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          sku?: string
          barcode?: string | null
          name?: string
          description?: string | null
          category_id?: string | null
          supplier_id?: string | null
          purchase_price?: number
          selling_price?: number
          stock_quantity?: number
          minimum_stock?: number
          unit?: string
          image_url?: string | null
          status?: 'active' | 'inactive' | 'discontinued'
          created_at?: string
          updated_at?: string
        }
      }
      inventory_transactions: {
        Row: {
          id: string
          product_id: string
          quantity: number
          type: 'stock_in' | 'stock_out' | 'adjustment'
          notes: string | null
          user_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          quantity: number
          type: 'stock_in' | 'stock_out' | 'adjustment'
          notes?: string | null
          user_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          quantity?: number
          type?: 'stock_in' | 'stock_out' | 'adjustment'
          notes?: string | null
          user_id?: string | null
          created_at?: string
        }
      }
      purchase_orders: {
        Row: {
          id: string
          po_number: string
          supplier_id: string
          total_amount: number
          status: 'pending' | 'approved' | 'received' | 'cancelled'
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          po_number: string
          supplier_id: string
          total_amount?: number
          status?: 'pending' | 'approved' | 'received' | 'cancelled'
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          po_number?: string
          supplier_id?: string
          total_amount?: number
          status?: 'pending' | 'approved' | 'received' | 'cancelled'
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      purchase_order_items: {
        Row: {
          id: string
          po_id: string
          product_id: string
          quantity: number
          unit_price: number
          total_price: number
        }
        Insert: {
          id?: string
          po_id: string
          product_id: string
          quantity: number
          unit_price: number
          total_price?: number
        }
        Update: {
          id?: string
          po_id?: string
          product_id?: string
          quantity?: number
          unit_price?: number
          total_price?: number
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
