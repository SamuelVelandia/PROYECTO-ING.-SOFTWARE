import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Separator } from './ui/separator'
import { InventoryService } from '../services/inventoryService'
import { Database } from '../lib/supabase'
import { toast } from 'sonner'
import { Plus, Edit, Trash2, AlertTriangle, Package } from 'lucide-react'

type Ingredient = Database['public']['Tables']['ingredients']['Row']

export function InventorySection() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [lowStockIngredients, setLowStockIngredients] = useState<Ingredient[]>([])
  const [loading, setLoading] = useState(true)
  const [editingIngredient, setEditingIngredient] = useState<Ingredient | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newIngredient, setNewIngredient] = useState({
    name: '',
    stock_quantity: 0,
    min_stock_level: 5,
    unit: 'kg'
  })

  useEffect(() => {
    loadIngredients()
  }, [])

  const loadIngredients = async () => {
    setLoading(true)
    try {
      const [ingredientsResult, lowStockResult] = await Promise.all([
        InventoryService.getIngredients(),
        InventoryService.getLowStockIngredients()
      ])

      if (ingredientsResult.error) {
        toast.error('Error al cargar ingredientes')
        return
      }

      setIngredients(ingredientsResult.data || [])
      setLowStockIngredients(lowStockResult.data || [])
    } catch (error) {
      toast.error('Error inesperado al cargar inventario')
    } finally {
      setLoading(false)
    }
  }

  const handleAddIngredient = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const { data, error } = await InventoryService.createIngredient(newIngredient)
      
      if (error) {
        toast.error('Error al agregar ingrediente: ' + error.message)
        return
      }

      toast.success('Ingrediente agregado exitosamente')
      setShowAddForm(false)
      setNewIngredient({
        name: '',
        stock_quantity: 0,
        min_stock_level: 5,
        unit: 'kg'
      })
      loadIngredients()
    } catch (error) {
      toast.error('Error inesperado')
    }
  }

  const handleUpdateStock = async (id: string, newStock: number) => {
    try {
      const { error } = await InventoryService.updateStock(id, newStock)
      
      if (error) {
        toast.error('Error al actualizar stock')
        return
      }

      toast.success('Stock actualizado')
      loadIngredients()
    } catch (error) {
      toast.error('Error inesperado')
    }
  }

  const getStockStatus = (ingredient: Ingredient) => {
    if (ingredient.stock_quantity <= 0) {
      return { status: 'out', color: 'destructive', text: 'Sin stock' }
    }
    if (ingredient.stock_quantity <= ingredient.min_stock_level) {
      return { status: 'low', color: 'destructive', text: 'Stock bajo' }
    }
    return { status: 'ok', color: 'default', text: 'En stock' }
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center">
          <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4 animate-pulse" />
          <p>Cargando inventario...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl mb-4">Gestión de Inventario</h2>
        <p className="text-muted-foreground">
          Administra los ingredientes y controla el stock disponible.
        </p>
      </div>

      <Tabs defaultValue="inventory" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="inventory">Inventario</TabsTrigger>
          <TabsTrigger value="low-stock">Stock Bajo</TabsTrigger>
          <TabsTrigger value="add">Agregar Ingrediente</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl">Todos los Ingredientes</h3>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Agregar Ingrediente
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ingredients.map((ingredient) => {
              const stockStatus = getStockStatus(ingredient)
              return (
                <Card key={ingredient.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center space-x-2">
                        <span>📦</span>
                        <span className="text-sm">{ingredient.name}</span>
                      </span>
                      <Badge variant={stockStatus.color as any}>
                        {stockStatus.text}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Stock actual:</span>
                        <span className="font-medium">{ingredient.stock_quantity} {ingredient.unit}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Stock mínimo:</span>
                        <span>{ingredient.min_stock_level} {ingredient.unit}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex space-x-2">
                      <Input
                        type="number"
                        placeholder="Nuevo stock"
                        className="flex-1"
                        min="0"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            const newStock = parseInt((e.target as HTMLInputElement).value)
                            if (!isNaN(newStock)) {
                              handleUpdateStock(ingredient.id, newStock)
                              ;(e.target as HTMLInputElement).value = ''
                            }
                          }
                        }}
                      />
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="low-stock" className="space-y-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <h3 className="text-xl">Ingredientes con Stock Bajo</h3>
          </div>

          {lowStockIngredients.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Package className="w-12 h-12 mx-auto text-green-500 mb-4" />
                <p className="text-muted-foreground">¡Excelente! Todos los ingredientes tienen stock suficiente.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lowStockIngredients.map((ingredient) => (
                <Card key={ingredient.id} className="border-orange-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center space-x-2">
                      <span>📦</span>
                      <span className="text-sm">{ingredient.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="bg-orange-50 p-3 rounded-lg">
                      <div className="flex justify-between text-sm">
                        <span>Stock actual:</span>
                        <span className="font-medium text-orange-600">
                          {ingredient.stock_quantity} {ingredient.unit}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Stock mínimo:</span>
                        <span className="text-orange-600">
                          {ingredient.min_stock_level} {ingredient.unit}
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Input
                        type="number"
                        placeholder="Cantidad a agregar"
                        className="flex-1"
                        min="1"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            const addStock = parseInt((e.target as HTMLInputElement).value)
                            if (!isNaN(addStock)) {
                              handleUpdateStock(ingredient.id, ingredient.stock_quantity + addStock)
                              ;(e.target as HTMLInputElement).value = ''
                            }
                          }
                        }}
                      />
                      <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="add" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Agregar Nuevo Ingrediente</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddIngredient} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nombre del Ingrediente</Label>
                    <Input
                      id="name"
                      value={newIngredient.name}
                      onChange={(e) => setNewIngredient({...newIngredient, name: e.target.value})}
                      placeholder="Ej: Carne ahumada, Aguacate, Pan, etc."
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="unit">Unidad de Medida</Label>
                    <select
                      id="unit"
                      value={newIngredient.unit}
                      onChange={(e) => setNewIngredient({...newIngredient, unit: e.target.value})}
                      className="w-full px-3 py-2 border border-input rounded-md"
                      required
                    >
                      <option value="kg">Kilogramos (kg)</option>
                      <option value="litros">Litros</option>
                      <option value="piezas">Piezas</option>
                      <option value="gramos">Gramos (g)</option>
                      <option value="unidades">Unidades</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="stock">Stock Inicial</Label>
                    <Input
                      id="stock"
                      type="number"
                      step="0.01"
                      min="0"
                      value={newIngredient.stock_quantity}
                      onChange={(e) => setNewIngredient({...newIngredient, stock_quantity: parseFloat(e.target.value) || 0})}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="min-stock">Stock Mínimo (Alerta)</Label>
                    <Input
                      id="min-stock"
                      type="number"
                      step="0.01"
                      min="0"
                      value={newIngredient.min_stock_level}
                      onChange={(e) => setNewIngredient({...newIngredient, min_stock_level: parseFloat(e.target.value) || 0})}
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Ingrediente
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
