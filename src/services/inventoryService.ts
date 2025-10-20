import { supabase } from '../lib/supabase'
import { Database } from '../lib/supabase'

type Ingredient = Database['public']['Tables']['ingredients']['Row']
type IngredientInsert = Database['public']['Tables']['ingredients']['Insert']
type IngredientUpdate = Database['public']['Tables']['ingredients']['Update']

export class InventoryService {
  // Obtener todos los ingredientes
  static async getIngredients(): Promise<{ data: Ingredient[] | null; error: any }> {
    const { data, error } = await supabase
      .from('ingredients')
      .select('*')
      .order('name')

    return { data, error }
  }

  // Obtener ingrediente por ID
  static async getIngredientById(id: string): Promise<{ data: Ingredient | null; error: any }> {
    const { data, error } = await supabase
      .from('ingredients')
      .select('*')
      .eq('id', id)
      .single()

    return { data, error }
  }

  // Crear nuevo ingrediente
  static async createIngredient(ingredient: IngredientInsert): Promise<{ data: Ingredient | null; error: any }> {
    const { data, error } = await supabase
      .from('ingredients')
      .insert(ingredient)
      .select()
      .single()

    return { data, error }
  }

  // Actualizar ingrediente
  static async updateIngredient(id: string, updates: IngredientUpdate): Promise<{ data: Ingredient | null; error: any }> {
    const { data, error } = await supabase
      .from('ingredients')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    return { data, error }
  }

  // Eliminar ingrediente
  static async deleteIngredient(id: string): Promise<{ error: any }> {
    const { error } = await supabase
      .from('ingredients')
      .delete()
      .eq('id', id)

    return { error }
  }

  // Actualizar stock de ingrediente
  static async updateStock(id: string, newStock: number): Promise<{ data: Ingredient | null; error: any }> {
    const { data, error } = await supabase
      .from('ingredients')
      .update({ 
        stock_quantity: newStock,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    return { data, error }
  }

  // Obtener ingredientes con stock bajo
  static async getLowStockIngredients(): Promise<{ data: Ingredient[] | null; error: any }> {
    // Obtener todos los ingredientes y filtrar manualmente
    const { data, error } = await supabase
      .from('ingredients')
      .select('*')
      .order('stock_quantity')

    if (error || !data) {
      return { data: null, error }
    }

    // Filtrar ingredientes donde stock_quantity <= min_stock_level
    const lowStock = data.filter(ing => ing.stock_quantity <= ing.min_stock_level)
    
    return { data: lowStock, error: null }
  }

  // Buscar ingredientes por nombre
  static async searchIngredients(query: string): Promise<{ data: Ingredient[] | null; error: any }> {
    const { data, error } = await supabase
      .from('ingredients')
      .select('*')
      .ilike('name', `%${query}%`)
      .order('name')

    return { data, error }
  }
}
