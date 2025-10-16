import { useState } from "react";
import { Header } from "./components/Header";
import { MenuSection } from "./components/MenuSection";
import { AboutSection } from "./components/AboutSection";
import { ContactSection } from "./components/ContactSection";
import { CartSection } from "./components/CartSection";
import { Toaster } from "./components/ui/sonner";

interface CartItem {
  id: string;
  name: string;
  basePrice: number;
  extras?: any[];
  total: number;
  quantity: number;
  category?: string;
}

export default function App() {
  const [activeSection, setActiveSection] = useState('menu');
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: any, extras?: any, total?: number) => {
    const newItem: CartItem = {
      id: item.id,
      name: item.name,
      basePrice: item.basePrice || item.comboPrice,
      extras: extras || [],
      total: total || item.comboPrice || item.basePrice,
      quantity: 1,
      category: item.category
    };

    // Verificar si el item ya existe en el carrito
    const existingIndex = cart.findIndex(cartItem => 
      cartItem.id === newItem.id && 
      JSON.stringify(cartItem.extras) === JSON.stringify(newItem.extras)
    );

    if (existingIndex > -1) {
      // Si existe, incrementar cantidad
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // Si no existe, agregar nuevo item
      setCart([...cart, newItem]);
    }
  };

  const updateCartItemQuantity = (index: number, quantity: number) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = quantity;
    setCart(updatedCart);
  };

  const removeCartItem = (index: number) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'menu':
        return <MenuSection onAddToCart={addToCart} />;
      case 'about':
        return <AboutSection />;
      case 'contact':
        return <ContactSection />;
      case 'cart':
        return <CartSection 
          cart={cart}
          updateCartItemQuantity={updateCartItemQuantity}
          removeCartItem={removeCartItem}
          clearCart={clearCart}
        />;
      default:
        return <MenuSection onAddToCart={addToCart} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        cartItemCount={getTotalItems()}
      />
      <main>
        {renderSection()}
      </main>
      <Toaster />
      
      {/* Footer */}
      <footer className="bg-gradient-to-br from-purple-500 via-purple-600 to-blue-700 text-primary-foreground py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-2xl">🌮</span>
            <h3 className="text-xl">Tortas Linney</h3>
          </div>
          <p className="text-sm text-primary-foreground/80 mb-4">
            Tortas artesanales por Linney Flores - Estudiante UV
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-primary-foreground/60">
            <span>📍 Campus Mocambo, Universidad Veracruzana</span>
            <span>📞 Contacto por WhatsApp</span>
            <span>🚚 Entrega en Mocambo, Ingeniería y FEFUV</span>
          </div>
          <div className="mt-4 text-xs text-primary-foreground/60">
            © 2024 Tortas Linney. 
          </div>
        </div>
      </footer>
    </div>
  );
}