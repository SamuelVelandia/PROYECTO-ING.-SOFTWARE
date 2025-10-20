import { supabase } from '../lib/supabase'

export interface Product {
  id: string
  name: string
  description: string
  base_price: number
  category: 'torta' | 'agua' | 'papas' | 'combo'
  image_url?: string | null
  is_available: boolean
  created_at: string
  updated_at: string
}

export interface ProductInsert {
  name: string
  description?: string
  base_price: number
  category: 'torta' | 'agua' | 'papas' | 'combo'
  image_url?: string | null
  is_available?: boolean
}

export interface ProductUpdate {
  name?: string
  description?: string
  base_price?: number
  category?: 'torta' | 'agua' | 'papas' | 'combo'
  image_url?: string | null
  is_available?: boolean
}

export class ProductsService {
  
  /**
   * Obtener todos los productos
   */
  static async getProducts(): Promise<{ data: Product[] | null; error: any }> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('category')
      .order('name')

    return { data, error }
  }

  /**
   * Obtener productos por categoría
   */
  static async getProductsByCategory(category: string): Promise<{ data: Product[] | null; error: any }> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('name')

    return { data, error }
  }

  /**
   * Obtener producto por ID
   */
  static async getProductById(id: string): Promise<{ data: Product | null; error: any }> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    return { data, error }
  }

  /**
   * Crear nuevo producto
   */
  static async createProduct(product: ProductInsert): Promise<{ data: Product | null; error: any }> {
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single()

    return { data, error }
  }

  /**
   * Actualizar producto
   */
  static async updateProduct(id: string, updates: ProductUpdate): Promise<{ data: Product | null; error: any }> {
    const { data, error } = await supabase
      .from('products')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    return { data, error }
  }

  /**
   * Eliminar producto
   */
  static async deleteProduct(id: string): Promise<{ error: any }> {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    return { error }
  }

  /**
   * Cambiar disponibilidad de un producto
   */
  static async toggleAvailability(id: string, isAvailable: boolean): Promise<{ data: Product | null; error: any }> {
    const { data, error } = await supabase
      .from('products')
      .update({ 
        is_available: isAvailable,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    return { data, error }
  }

  /**
   * Buscar productos por nombre
   */
  static async searchProducts(query: string): Promise<{ data: Product[] | null; error: any }> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .ilike('name', `%${query}%`)
      .order('name')

    return { data, error }
  }

  /**
   * Obtener productos disponibles
   */
  static async getAvailableProducts(): Promise<{ data: Product[] | null; error: any }> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_available', true)
      .order('category')
      .order('name')

    return { data, error }
  }
}

