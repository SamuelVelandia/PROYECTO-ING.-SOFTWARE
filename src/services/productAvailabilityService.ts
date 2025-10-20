import { InventoryService } from './inventoryService'
import { Database } from '../lib/supabase'

type Ingredient = Database['public']['Tables']['ingredients']['Row']

// Mapeo de ingredientes requeridos por cada producto
// Estos son los ingredientes BASE necesarios para hacer cada producto
export const productIngredientRequirements = {
  // TORTAS - requieren ingredientes base
  'torta-1': { // Torta de Carne Ahumada
    requiredIngredients: [
      { name: 'Carne ahumada', quantity: 0.15 },
      { name: 'Aguacate', quantity: 0.05 },
      { name: 'Jitomate', quantity: 0.05 },
      { name: 'Cebolla', quantity: 0.03 },
      { name: 'Pan para torta', quantity: 1 }
    ]
  },
  'torta-2': { // Torta Chichimeca
    requiredIngredients: [
      { name: 'Carne de res', quantity: 0.15 },
      { name: 'Nopales', quantity: 0.08 },
      { name: 'Queso Oaxaca', quantity: 0.05 },
      { name: 'Salsa verde', quantity: 0.03 },
      { name: 'Pan para torta', quantity: 1 }
    ]
  },
  'torta-3': { // Torta de Chistorra
    requiredIngredients: [
      { name: 'Chistorra (chorizo español)', quantity: 0.12 },
      { name: 'Pimientos', quantity: 0.05 },
      { name: 'Queso Manchego', quantity: 0.04 },
      { name: 'Cebolla caramelizada', quantity: 0.04 },
      { name: 'Pan para torta', quantity: 1 }
    ]
  },
  'torta-4': { // Torta de Jamón
    requiredIngredients: [
      { name: 'Jamón', quantity: 0.1 },
      { name: 'Queso amarillo', quantity: 0.05 },
      { name: 'Mayonesa', quantity: 0.02 },
      { name: 'Pan para torta', quantity: 1 }
    ]
  },
  
  // AGUAS FRESCAS
  'agua-1': { // Horchata
    requiredIngredients: [
      { name: 'Concentrado de horchata', quantity: 0.15 },
      { name: 'Canela', quantity: 0.02 },
      { name: 'Leche condensada', quantity: 0.05 }
    ]
  },
  'agua-2': { // Jamaica
    requiredIngredients: [
      { name: 'Flor de jamaica', quantity: 0.05 },
      { name: 'Azúcar', quantity: 0.03 }
    ]
  },
  'agua-3': { // Tamarindo
    requiredIngredients: [
      { name: 'Pulpa de tamarindo', quantity: 0.08 },
      { name: 'Chile piquín', quantity: 0.01 },
      { name: 'Azúcar', quantity: 0.03 }
    ]
  },
  
  // PAPAS
  'papas-1': { // Papas Fritas Naturales
    requiredIngredients: [
      { name: 'Papas', quantity: 0.2 },
      { name: 'Aceite para freír', quantity: 0.05 },
      { name: 'Sal de mar', quantity: 0.01 }
    ]
  },
  'papas-2': { // Papas Gajo
    requiredIngredients: [
      { name: 'Papas', quantity: 0.25 },
      { name: 'Aceite para freír', quantity: 0.06 },
      { name: 'Sal de mar', quantity: 0.01 }
    ]
  }
}

export interface ProductAvailability {
  productId: string
  isAvailable: boolean
  missingIngredients: string[]
  lowStockIngredients: string[]
}

export class ProductAvailabilityService {
  
  /**
   * Verifica la disponibilidad de un producto específico
   */
  static async checkProductAvailability(productId: string): Promise<ProductAvailability> {
    const requirements = productIngredientRequirements[productId as keyof typeof productIngredientRequirements]
    
    if (!requirements) {
      return {
        productId,
        isAvailable: true,
        missingIngredients: [],
        lowStockIngredients: []
      }
    }

    try {
      // Obtener todos los ingredientes de la BD
      const { data: ingredients, error } = await InventoryService.getIngredients()
      
      if (error || !ingredients) {
        console.error('Error fetching ingredients:', error)
        // Si hay error, asumir que todo está disponible (modo sin BD)
        return {
          productId,
          isAvailable: true,
          missingIngredients: [],
          lowStockIngredients: []
        }
      }
      
      // Si no hay ingredientes en la BD, asumir disponible
      if (ingredients.length === 0) {
        return {
          productId,
          isAvailable: true,
          missingIngredients: [],
          lowStockIngredients: []
        }
      }

      const missingIngredients: string[] = []
      const lowStockIngredients: string[] = []

      // Verificar cada ingrediente requerido
      for (const required of requirements.requiredIngredients) {
        const ingredient = ingredients.find(ing => 
          ing.name.toLowerCase() === required.name.toLowerCase()
        )

        if (!ingredient) {
          missingIngredients.push(required.name)
        } else {
          // Verificar si hay suficiente stock
          if (ingredient.stock_quantity < required.quantity) {
            missingIngredients.push(required.name)
          } 
          // Verificar si está por debajo del nivel mínimo
          else if (ingredient.stock_quantity <= ingredient.min_stock_level) {
            lowStockIngredients.push(required.name)
          }
        }
      }

      return {
        productId,
        isAvailable: missingIngredients.length === 0,
        missingIngredients,
        lowStockIngredients
      }
    } catch (error) {
      console.error('Exception fetching ingredients:', error)
      // En caso de excepción, asumir disponible
      return {
        productId,
        isAvailable: true,
        missingIngredients: [],
        lowStockIngredients: []
      }
    }
  }

  /**
   * Verifica la disponibilidad de múltiples productos
   */
  static async checkMultipleProducts(productIds: string[]): Promise<Map<string, ProductAvailability>> {
    const availabilityMap = new Map<string, ProductAvailability>()
    
    try {
      // Obtener ingredientes una sola vez para eficiencia
      const { data: ingredients, error } = await InventoryService.getIngredients()
      
      if (error || !ingredients || ingredients.length === 0) {
        // Si hay error o no hay datos, marcar todos como DISPONIBLES (modo sin BD)
        console.warn('No se pudieron cargar ingredientes, asumiendo todo disponible')
        for (const productId of productIds) {
          availabilityMap.set(productId, {
            productId,
            isAvailable: true,
            missingIngredients: [],
            lowStockIngredients: []
          })
        }
        return availabilityMap
      }

      // Verificar cada producto
      for (const productId of productIds) {
        const requirements = productIngredientRequirements[productId as keyof typeof productIngredientRequirements]
        
        if (!requirements) {
          availabilityMap.set(productId, {
            productId,
            isAvailable: true,
            missingIngredients: [],
            lowStockIngredients: []
          })
          continue
        }

        const missingIngredients: string[] = []
        const lowStockIngredients: string[] = []

        for (const required of requirements.requiredIngredients) {
          const ingredient = ingredients.find(ing => 
            ing.name.toLowerCase() === required.name.toLowerCase()
          )

          if (!ingredient || ingredient.stock_quantity < required.quantity) {
            missingIngredients.push(required.name)
          } else if (ingredient.stock_quantity <= ingredient.min_stock_level) {
            lowStockIngredients.push(required.name)
          }
        }

        availabilityMap.set(productId, {
          productId,
          isAvailable: missingIngredients.length === 0,
          missingIngredients,
          lowStockIngredients
        })
      }

      return availabilityMap
    } catch (error) {
      console.error('Exception in checkMultipleProducts:', error)
      // En caso de excepción, marcar todos como disponibles
      for (const productId of productIds) {
        availabilityMap.set(productId, {
          productId,
          isAvailable: true,
          missingIngredients: [],
          lowStockIngredients: []
        })
      }
      return availabilityMap
    }
  }

  /**
   * Verifica si un combo está disponible
   */
  static async checkComboAvailability(comboId: string, comboProducts: string[]): Promise<ProductAvailability> {
    const availabilities = await this.checkMultipleProducts(comboProducts)
    
    const allMissingIngredients: string[] = []
    const allLowStockIngredients: string[] = []
    let allAvailable = true

    for (const [_, availability] of availabilities) {
      if (!availability.isAvailable) {
        allAvailable = false
        allMissingIngredients.push(...availability.missingIngredients)
      }
      allLowStockIngredients.push(...availability.lowStockIngredients)
    }

    // Eliminar duplicados
    const uniqueMissing = [...new Set(allMissingIngredients)]
    const uniqueLowStock = [...new Set(allLowStockIngredients)]

    return {
      productId: comboId,
      isAvailable: allAvailable,
      missingIngredients: uniqueMissing,
      lowStockIngredients: uniqueLowStock
    }
  }

  /**
   * Obtiene todos los ingredientes disponibles
   */
  static async getAvailableIngredients(): Promise<Ingredient[]> {
    const { data: ingredients, error } = await InventoryService.getIngredients()
    
    if (error || !ingredients) {
      return []
    }

    return ingredients.filter(ing => ing.stock_quantity > 0)
  }
}

