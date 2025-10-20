import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner";
import { AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { ProductAvailability } from "../services/productAvailabilityService";

interface Ingredient {
  id: string;
  name: string;
  price: number;
}

interface Product {
  id: string;
  name: string;
  basePrice: number;
  description: string;
  ingredients: Ingredient[];
  category: 'torta' | 'agua' | 'papas';
  imageUrl?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product, selectedIngredients: Ingredient[], total: number) => void;
  availability?: ProductAvailability;
}

export function ProductCard({ product, onAddToCart, availability }: ProductCardProps) {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  
  // Determinar si el producto está disponible
  const isAvailable = availability?.isAvailable ?? true;
  const hasLowStock = (availability?.lowStockIngredients.length ?? 0) > 0;

  const handleIngredientChange = (ingredientId: string, checked: boolean) => {
    if (checked) {
      setSelectedIngredients([...selectedIngredients, ingredientId]);
    } else {
      setSelectedIngredients(selectedIngredients.filter(id => id !== ingredientId));
    }
  };

  const getSelectedIngredientsData = () => {
    return product.ingredients.filter(ing => selectedIngredients.includes(ing.id));
  };

  const getTotalPrice = () => {
    const ingredientsPrice = getSelectedIngredientsData().reduce((sum, ing) => sum + ing.price, 0);
    return product.basePrice + ingredientsPrice;
  };

  const handleAddToCart = () => {
    if (!isAvailable) {
      toast.error('Este producto no está disponible actualmente');
      return;
    }
    
    if (onAddToCart) {
      onAddToCart(product, getSelectedIngredientsData(), getTotalPrice());
      toast.success(`${product.name} agregado al carrito 🛒`);
      
      // Limpiar ingredientes seleccionados después de agregar
      setSelectedIngredients([]);
    }
  };

  const getCategoryEmoji = () => {
    switch (product.category) {
      case 'torta': return '🥪';
      case 'agua': return '🥤';
      case 'papas': return '🍟';
      default: return '🍽️';
    }
  };

  return (
    <Card className={`h-full overflow-hidden relative ${!isAvailable ? 'opacity-90' : ''}`}>
      {/* Overlay si no está disponible */}
      {!isAvailable && (
        <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center backdrop-blur-[2px]">
          <div className="bg-white rounded-lg p-4 m-4 shadow-lg max-w-xs">
            <div className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-sm text-gray-900 mb-1">No disponible</p>
                <p className="text-xs text-gray-600">
                  Faltan: {availability?.missingIngredients.slice(0, 2).join(', ')}
                  {(availability?.missingIngredients.length ?? 0) > 2 && ` +${(availability?.missingIngredients.length ?? 0) - 2} más`}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Imagen del producto */}
      {product.imageUrl && (
        <div className="relative h-40 w-full overflow-hidden">
          <ImageWithFallback
            src={product.imageUrl}
            alt={product.name}
            className={`w-full h-full object-cover hover:scale-105 transition-transform duration-300 ${!isAvailable ? 'grayscale' : ''}`}
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-gradient-to-br from-purple-500 via-purple-600 to-blue-700 text-primary-foreground">
              ${product.basePrice} MXN
            </Badge>
          </div>
          <div className="absolute bottom-2 left-2 flex gap-2">
            <Badge variant="outline" className="bg-gradient-to-br from-purple-500/90 via-purple-600/90 to-blue-700/90 text-white border-white/20">
              {getCategoryEmoji()} {product.category === 'torta' ? 'Torta' : product.category === 'agua' ? 'Agua Fresca' : 'Papas'}
            </Badge>
            
            {/* Badge de disponibilidad */}
            {isAvailable && !hasLowStock && (
              <Badge className="bg-green-600/90 hover:bg-green-600 text-white border-0">
                <CheckCircle className="w-3 h-3 mr-1" />
                Disponible
              </Badge>
            )}
            {isAvailable && hasLowStock && (
              <Badge className="bg-orange-500/90 hover:bg-orange-500 text-white border-0">
                <AlertCircle className="w-3 h-3 mr-1" />
                Stock bajo
              </Badge>
            )}
          </div>
        </div>
      )}
      
      <CardHeader className={product.imageUrl ? "pb-2" : ""}>
        <CardTitle className="flex items-center space-x-2">
          <span>{getCategoryEmoji()}</span>
          <span>{product.name}</span>
        </CardTitle>
        <p className="text-muted-foreground text-sm">{product.description}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {product.ingredients.length > 0 && (
          <div>
            <h4 className="mb-2">Ingredientes extras:</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {product.ingredients.map((ingredient) => (
                <div key={ingredient.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={ingredient.id}
                    checked={selectedIngredients.includes(ingredient.id)}
                    onCheckedChange={(checked) => 
                      handleIngredientChange(ingredient.id, checked as boolean)
                    }
                  />
                  <label 
                    htmlFor={ingredient.id}
                    className="text-sm flex-1 cursor-pointer"
                  >
                    {ingredient.name}
                  </label>
                  <span className="text-sm text-muted-foreground">
                    +${ingredient.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {selectedIngredients.length > 0 && (
          <>
            <Separator />
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>Precio base:</span>
                <span>${product.basePrice} MXN</span>
              </div>
              <div className="flex justify-between">
                <span>Extras:</span>
                <span>+${getSelectedIngredientsData().reduce((sum, ing) => sum + ing.price, 0)} MXN</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span>Total:</span>
                <span>${getTotalPrice()} MXN</span>
              </div>
            </div>
          </>
        )}
        
        {/* Mensaje de disponibilidad */}
        {!isAvailable && availability && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-2">
              <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-900">No disponible</p>
                <p className="text-xs text-red-700 mt-0.5">
                  Ingredientes faltantes: {availability.missingIngredients.join(', ')}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {hasLowStock && isAvailable && availability && (
          <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-orange-700">
                  ⚠️ Stock limitado en algunos ingredientes
                </p>
              </div>
            </div>
          </div>
        )}
        
        <Button 
          onClick={handleAddToCart} 
          className="w-full"
          disabled={!isAvailable}
          variant={!isAvailable ? "outline" : "default"}
        >
          {!isAvailable ? (
            <>
              <XCircle className="w-4 h-4 mr-2" />
              No Disponible
            </>
          ) : (
            <>Agregar al Pedido - ${getTotalPrice()} MXN</>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
