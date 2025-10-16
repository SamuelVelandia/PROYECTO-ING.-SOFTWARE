import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

interface CartItem {
  id: string;
  name: string;
  basePrice: number;
  extras?: any[];
  total: number;
  quantity: number;
  category?: string;
}

interface CartSectionProps {
  cart: CartItem[];
  updateCartItemQuantity: (index: number, quantity: number) => void;
  removeCartItem: (index: number) => void;
  clearCart: () => void;
}

export function CartSection({ cart, updateCartItemQuantity, removeCartItem, clearCart }: CartSectionProps) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: ''
  });

  const getTotalCart = () => {
    return cart.reduce((sum, item) => sum + (item.total * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const handleQuantityChange = (index: number, newQuantity: number) => {
    if (newQuantity > 0) {
      updateCartItemQuantity(index, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (!customerInfo.name || !customerInfo.phone) {
      toast.error("Por favor completa los campos obligatorios (Nombre y Teléfono)");
      return;
    }

    // Simular procesamiento de pedido
    toast.success("¡Pedido realizado con éxito! Te contactaremos pronto.");
    
    // Limpiar carrito y formulario
    clearCart();
    setCustomerInfo({
      name: '',
      phone: '',
      email: '',
      address: '',
      notes: ''
    });
    setShowCheckout(false);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="mb-8">
            <ShoppingCart className="w-24 h-24 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-3xl mb-4">Tu carrito está vacío</h2>
            <p className="text-muted-foreground mb-6">
              Agrega algunos productos deliciosos a tu carrito para comenzar tu pedido.
            </p>
            <Button onClick={() => window.location.reload()} className="bg-gradient-to-br from-purple-500 via-purple-600 to-blue-700 hover:from-purple-600 hover:via-purple-700 hover:to-blue-800">
              Ver Menú
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (showCheckout) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={() => setShowCheckout(false)}
            className="mb-4"
          >
            ← Volver al Carrito
          </Button>
          <h2 className="text-3xl mb-4">Finalizar Pedido</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Información del cliente */}
          <Card>
            <CardHeader>
              <CardTitle>Información de Contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre Completo *</Label>
                <Input
                  id="name"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                  placeholder="Tu nombre completo"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Teléfono *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                  placeholder="33 1234 5678"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email (opcional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                  placeholder="tu@email.com"
                />
              </div>
              
              <div>
                <Label htmlFor="address">Dirección de Entrega (opcional)</Label>
                <Textarea
                  id="address"
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                  placeholder="Calle, número, colonia, ciudad"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="notes">Notas Especiales (opcional)</Label>
                <Textarea
                  id="notes"
                  value={customerInfo.notes}
                  onChange={(e) => setCustomerInfo({...customerInfo, notes: e.target.value})}
                  placeholder="Instrucciones especiales para tu pedido"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Resumen del pedido */}
          <Card>
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <div className="flex-1">
                      <span>{item.quantity}x {item.name}</span>
                      {item.extras && item.extras.length > 0 && (
                        <div className="text-xs text-muted-foreground ml-2">
                          + {item.extras.map(extra => extra.name).join(', ')}
                        </div>
                      )}
                    </div>
                    <span>${(item.total * item.quantity).toFixed(0)} MXN</span>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${getTotalCart()} MXN</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Envío:</span>
                  <span>Por confirmar</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span>${getTotalCart()} MXN</span>
                </div>
              </div>
              
              <Button 
                onClick={handleCheckout}
                className="w-full mt-6 bg-green-600 hover:bg-green-700"
                size="lg"
              >
                Confirmar Pedido - ${getTotalCart()} MXN
              </Button>
              
              <p className="text-xs text-muted-foreground mt-2 text-center">
                * Te contactaremos para confirmar el pedido y acordar la entrega
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl mb-4">Tu Carrito de Compras</h2>
        <p className="text-muted-foreground">
          Revisa tu pedido antes de proceder al pago.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Lista de productos */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Productos ({getTotalItems()} items)</CardTitle>
              <Button variant="outline" size="sm" onClick={clearCart}>
                Limpiar Todo
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Precio unitario: ${item.total} MXN
                        </p>
                        {item.extras && item.extras.length > 0 && (
                          <div className="text-xs text-muted-foreground mt-1">
                            Extras: {item.extras.map(extra => extra.name).join(', ')}
                          </div>
                        )}
                      </div>
                      <Badge variant="secondary">
                        ${(item.total * item.quantity).toFixed(0)} MXN
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(index, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(index, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeCartItem(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resumen del pedido */}
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Resumen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Items ({getTotalItems()}):</span>
                  <span>${getTotalCart()} MXN</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Envío:</span>
                  <span>Por confirmar</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span>${getTotalCart()} MXN</span>
                </div>
              </div>
              
              <Button 
                onClick={() => setShowCheckout(true)}
                className="w-full bg-green-600 hover:bg-green-700"
                size="lg"
              >
                Proceder al Pago
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                Los precios incluyen IVA
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
