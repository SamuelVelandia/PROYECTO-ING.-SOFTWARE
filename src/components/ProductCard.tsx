import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner";

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
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

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
    <Card className="h-full overflow-hidden">
      {/* Imagen del producto */}
      {product.imageUrl && (
        <div className="relative h-40 w-full overflow-hidden">
          <ImageWithFallback
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-gradient-to-br from-purple-500 via-purple-600 to-blue-700 text-primary-foreground">
              ${product.basePrice} MXN
            </Badge>
          </div>
          <div className="absolute bottom-2 left-2">
            <Badge variant="outline" className="bg-gradient-to-br from-purple-500/90 via-purple-600/90 to-blue-700/90 text-white border-white/20">
              {getCategoryEmoji()} {product.category === 'torta' ? 'Torta' : product.category === 'agua' ? 'Agua Fresca' : 'Papas'}
            </Badge>
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
        
        <Button onClick={handleAddToCart} className="w-full">
          Agregar al Pedido - ${getTotalPrice()} MXN
        </Button>
      </CardContent>
    </Card>
  );
}
