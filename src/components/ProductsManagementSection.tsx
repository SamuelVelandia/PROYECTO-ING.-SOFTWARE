import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Separator } from './ui/separator'
import { ProductsService, Product, ProductInsert } from '../services/productsService'
import { toast } from 'sonner'
import { Plus, Edit, Trash2, Power, PowerOff, Package, Search, Save, X } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog"

export function ProductsManagementSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  
  const [newProduct, setNewProduct] = useState<ProductInsert>({
    name: '',
    description: '',
    base_price: 0,
    category: 'torta',
    image_url: '',
    is_available: true
  })

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    setLoading(true)
    try {
      const { data, error } = await ProductsService.getProducts()
      
      if (error) {
        toast.error('Error al cargar productos')
        console.error(error)
        return
      }

      setProducts(data || [])
    } catch (error) {
      toast.error('Error inesperado al cargar productos')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const { data, error } = await ProductsService.createProduct(newProduct)
      
      if (error) {
        toast.error('Error al agregar producto: ' + error.message)
        return
      }

      toast.success('✅ Producto agregado exitosamente')
      setShowAddForm(false)
      resetForm()
      loadProducts()
    } catch (error) {
      toast.error('Error inesperado')
    }
  }

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!editingProduct) return

    try {
      const { data, error } = await ProductsService.updateProduct(editingProduct.id, {
        name: editingProduct.name,
        description: editingProduct.description,
        base_price: editingProduct.base_price,
        category: editingProduct.category,
        image_url: editingProduct.image_url,
        is_available: editingProduct.is_available
      })
      
      if (error) {
        toast.error('Error al actualizar producto')
        return
      }

      toast.success('✅ Producto actualizado')
      setEditingProduct(null)
      loadProducts()
    } catch (error) {
      toast.error('Error inesperado')
    }
  }

  const handleDeleteProduct = async (id: string) => {
    try {
      const { error } = await ProductsService.deleteProduct(id)
      
      if (error) {
        toast.error('Error al eliminar producto')
        return
      }

      toast.success('🗑️ Producto eliminado')
      setDeleteConfirm(null)
      loadProducts()
    } catch (error) {
      toast.error('Error inesperado')
    }
  }

  const handleToggleAvailability = async (product: Product) => {
    try {
      const { error } = await ProductsService.toggleAvailability(product.id, !product.is_available)
      
      if (error) {
        toast.error('Error al cambiar disponibilidad')
        return
      }

      toast.success(product.is_available ? '❌ Producto desactivado' : '✅ Producto activado')
      loadProducts()
    } catch (error) {
      toast.error('Error inesperado')
    }
  }

  const resetForm = () => {
    setNewProduct({
      name: '',
      description: '',
      base_price: 0,
      category: 'torta',
      image_url: '',
      is_available: true
    })
  }

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'torta': return '🥪'
      case 'agua': return '🥤'
      case 'papas': return '🍟'
      case 'combo': return '🎯'
      default: return '📦'
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'torta': return 'Torta'
      case 'agua': return 'Agua Fresca'
      case 'papas': return 'Papas'
      case 'combo': return 'Combo'
      default: return category
    }
  }

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const productsByCategory = {
    torta: filteredProducts.filter(p => p.category === 'torta'),
    agua: filteredProducts.filter(p => p.category === 'agua'),
    papas: filteredProducts.filter(p => p.category === 'papas'),
    combo: filteredProducts.filter(p => p.category === 'combo')
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center py-16">
          <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4 animate-pulse" />
          <p>Cargando productos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Gestión de Productos</h2>
        <p className="text-muted-foreground">
          Administra el catálogo de tortas, aguas frescas, papas y combos.
        </p>
      </div>

      {/* Barra de búsqueda y agregar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={() => setShowAddForm(true)} className="bg-gradient-to-br from-purple-500 via-purple-600 to-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Agregar Producto
        </Button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{products.length}</div>
              <div className="text-sm text-muted-foreground">Total Productos</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {products.filter(p => p.is_available).length}
              </div>
              <div className="text-sm text-muted-foreground">Disponibles</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">
                {products.filter(p => !p.is_available).length}
              </div>
              <div className="text-sm text-muted-foreground">No Disponibles</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                ${products.reduce((sum, p) => sum + p.base_price, 0).toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">Valor Total</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Formulario de agregar/editar */}
      {(showAddForm || editingProduct) && (
        <Card className="mb-6 border-2 border-purple-200">
          <CardHeader className="bg-gradient-to-br from-purple-50 to-blue-50">
            <CardTitle className="flex items-center justify-between">
              <span>{editingProduct ? '✏️ Editar Producto' : '➕ Nuevo Producto'}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowAddForm(false)
                  setEditingProduct(null)
                  resetForm()
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nombre del Producto *</Label>
                  <Input
                    id="name"
                    value={editingProduct ? editingProduct.name : newProduct.name}
                    onChange={(e) => editingProduct 
                      ? setEditingProduct({...editingProduct, name: e.target.value})
                      : setNewProduct({...newProduct, name: e.target.value})
                    }
                    placeholder="Ej: Torta de Carne Ahumada"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Categoría *</Label>
                  <select
                    id="category"
                    value={editingProduct ? editingProduct.category : newProduct.category}
                    onChange={(e) => editingProduct
                      ? setEditingProduct({...editingProduct, category: e.target.value as any})
                      : setNewProduct({...newProduct, category: e.target.value as any})
                    }
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    required
                  >
                    <option value="torta">🥪 Torta</option>
                    <option value="agua">🥤 Agua Fresca</option>
                    <option value="papas">🍟 Papas</option>
                    <option value="combo">🎯 Combo</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="price">Precio (MXN) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={editingProduct ? editingProduct.base_price : newProduct.base_price}
                    onChange={(e) => editingProduct
                      ? setEditingProduct({...editingProduct, base_price: parseFloat(e.target.value) || 0})
                      : setNewProduct({...newProduct, base_price: parseFloat(e.target.value) || 0})
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="image_url">URL de Imagen (opcional)</Label>
                  <Input
                    id="image_url"
                    value={editingProduct ? (editingProduct.image_url || '') : (newProduct.image_url || '')}
                    onChange={(e) => editingProduct
                      ? setEditingProduct({...editingProduct, image_url: e.target.value})
                      : setNewProduct({...newProduct, image_url: e.target.value})
                    }
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Descripción *</Label>
                <Textarea
                  id="description"
                  value={editingProduct ? editingProduct.description : newProduct.description}
                  onChange={(e) => editingProduct
                    ? setEditingProduct({...editingProduct, description: e.target.value})
                    : setNewProduct({...newProduct, description: e.target.value})
                  }
                  placeholder="Describe el producto..."
                  rows={3}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_available"
                  checked={editingProduct ? editingProduct.is_available : newProduct.is_available}
                  onChange={(e) => editingProduct
                    ? setEditingProduct({...editingProduct, is_available: e.target.checked})
                    : setNewProduct({...newProduct, is_available: e.target.checked})
                  }
                  className="w-4 h-4"
                />
                <Label htmlFor="is_available" className="cursor-pointer">
                  Producto disponible para venta
                </Label>
              </div>

              <div className="flex gap-3">
                <Button type="submit" className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  {editingProduct ? 'Guardar Cambios' : 'Agregar Producto'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingProduct(null)
                    resetForm()
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Listado de productos por categoría */}
      <Tabs defaultValue="torta" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="torta">
            🥪 Tortas ({productsByCategory.torta.length})
          </TabsTrigger>
          <TabsTrigger value="agua">
            🥤 Aguas ({productsByCategory.agua.length})
          </TabsTrigger>
          <TabsTrigger value="papas">
            🍟 Papas ({productsByCategory.papas.length})
          </TabsTrigger>
          <TabsTrigger value="combo">
            🎯 Combos ({productsByCategory.combo.length})
          </TabsTrigger>
        </TabsList>

        {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
          <TabsContent key={category} value={category} className="space-y-4">
            {categoryProducts.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8 text-muted-foreground">
                  <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No hay productos en esta categoría</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categoryProducts.map((product) => (
                  <Card key={product.id} className={!product.is_available ? 'opacity-60' : ''}>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <span>{getCategoryEmoji(product.category)}</span>
                          <span className="text-base">{product.name}</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <Badge variant={product.is_available ? "default" : "secondary"} className="bg-gradient-to-br from-purple-500 to-blue-600">
                            ${product.base_price} MXN
                          </Badge>
                          {product.is_available ? (
                            <Badge className="bg-green-600">Disponible</Badge>
                          ) : (
                            <Badge variant="secondary">No disponible</Badge>
                          )}
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">{product.description}</p>
                      
                      <Separator />
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleAvailability(product)}
                          className="flex-1"
                        >
                          {product.is_available ? (
                            <><PowerOff className="w-4 h-4 mr-2" /> Desactivar</>
                          ) : (
                            <><Power className="w-4 h-4 mr-2" /> Activar</>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingProduct(product)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setDeleteConfirm(product.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Dialog de confirmación de eliminación */}
      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El producto será eliminado permanentemente del catálogo.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteConfirm && handleDeleteProduct(deleteConfirm)}
              className="bg-red-600 hover:bg-red-700"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

