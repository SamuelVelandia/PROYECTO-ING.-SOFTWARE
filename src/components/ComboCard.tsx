import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner";

interface ComboItem {
  name: string;
  quantity: number;
}

interface Combo {
  id: string;
  name: string;
  description: string;
  items: ComboItem[];
  originalPrice: number;
  comboPrice: number;
  savings: number;
  imageUrl?: string;
}

interface ComboCardProps {
  combo: Combo;
  onAddToCart?: (combo: Combo) => void;
}

export function ComboCard({ combo, onAddToCart }: ComboCardProps) {
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(combo);
      toast.success(`${combo.name} agregado al carrito 🎯`);
    }
  };

  return (
    <Card className="h-full border-2 border-accent overflow-hidden">
      {/* Imagen del combo */}
      {combo.imageUrl && (
        <div className="relative h-48 w-full overflow-hidden">
          <ImageWithFallback
            src={combo.imageUrl}
            alt={combo.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 flex space-x-2">
            <Badge variant="destructive" className="line-through text-xs bg-gradient-to-br from-purple-500/90 via-purple-600/90 to-blue-700/90">
              ${combo.originalPrice}
            </Badge>
            <Badge variant="default" className="bg-gradient-to-br from-purple-500 via-purple-600 to-blue-700 text-primary-foreground">
              ${combo.comboPrice} MXN
            </Badge>
          </div>
          <div className="absolute bottom-2 left-2">
            <Badge variant="secondary" className="bg-green-600 text-white">
              Ahorra ${combo.savings} MXN
            </Badge>
          </div>
        </div>
      )}
      
      <CardHeader className={combo.imageUrl ? "pb-2" : ""}>
        <CardTitle className="flex items-center space-x-2">
          <span>🎯</span>
          <span>{combo.name}</span>
        </CardTitle>
        <p className="text-muted-foreground text-sm">{combo.description}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <h4 className="mb-2">Incluye:</h4>
          <ul className="space-y-1">
            {combo.items.map((item, index) => (
              <li key={index} className="flex items-center space-x-2 text-sm">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>{item.quantity}x {item.name}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <Separator />
        
        <div className="text-sm space-y-1">
          <div className="flex justify-between text-muted-foreground">
            <span>Precio individual:</span>
            <span>${combo.originalPrice} MXN</span>
          </div>
          <div className="flex justify-between">
            <span>Precio combo:</span>
            <span>${combo.comboPrice} MXN</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Te ahorras:</span>
            <span>${combo.savings} MXN</span>
          </div>
        </div>
        
        <Button onClick={handleAddToCart} className="w-full" variant="default">
          Ordenar Combo - ${combo.comboPrice} MXN
        </Button>
      </CardContent>
    </Card>
  );
}
