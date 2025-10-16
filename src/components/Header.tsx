import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ShoppingCart } from "lucide-react";

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  cartItemCount?: number;
}

export function Header({ activeSection, setActiveSection, cartItemCount = 0 }: HeaderProps) {
  const sections = [
    { id: 'menu', label: 'Menú' },
    { id: 'about', label: 'Nosotros' },
    { id: 'contact', label: 'Contacto' }
  ];

  return (
    <header className="bg-gradient-to-br from-purple-500 via-purple-600 to-blue-700 text-primary-foreground shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-accent text-accent-foreground px-3 py-2 rounded-lg">
              🌮
            </div>
            <h1 className="text-xl">Tortas Linney</h1>
          </div>
          
          <nav className="flex items-center space-x-1">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant={activeSection === section.id ? "secondary" : "ghost"}
                onClick={() => setActiveSection(section.id)}
                className={activeSection === section.id 
                  ? "text-primary" 
                  : "text-white hover:bg-white/20 hover:text-white"}
              >
                {section.label}
              </Button>
            ))}
            
            {/* Botón del carrito */}
            <Button
              variant={activeSection === 'cart' ? "secondary" : "ghost"}
              onClick={() => setActiveSection('cart')}
              className={activeSection === 'cart' 
                ? "text-primary relative" 
                : "text-white hover:bg-white/20 hover:text-white relative"}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Carrito
              {cartItemCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 px-2 py-1 text-xs"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}