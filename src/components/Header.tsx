import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { AuthModal } from "./AuthModal";
import { toast } from "sonner";

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  cartItemCount?: number;
}

export function Header({ activeSection, setActiveSection, cartItemCount = 0 }: HeaderProps) {
  const { user, isAdmin, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const sections = [
    { id: 'menu', label: 'Menú' },
    { id: 'about', label: 'Nosotros' },
    { id: 'contact', label: 'Contacto' }
  ];

  // Agregar secciones de administrador
  const adminSections = isAdmin ? [
    { id: 'products-management', label: '🍔 Productos' },
    { id: 'inventory', label: '📦 Ingredientes' }
  ] : [];
  const allSections = [...sections, ...adminSections];

  const handleSignOut = async () => {
    console.log('handleSignOut called');
    
    // Función para limpiar TODO el storage de Supabase
    const clearSupabaseStorage = () => {
      console.log('Clearing all Supabase storage...');
      
      // Limpiar localStorage
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.includes('supabase')) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => {
        console.log('Removing localStorage key:', key);
        localStorage.removeItem(key);
      });
      
      // Limpiar sessionStorage
      const sessionKeysToRemove: string[] = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key && key.includes('supabase')) {
          sessionKeysToRemove.push(key);
        }
      }
      sessionKeysToRemove.forEach(key => {
        console.log('Removing sessionStorage key:', key);
        sessionStorage.removeItem(key);
      });
      
      // También limpiar las cookies relacionadas con auth
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      
      console.log('Supabase storage cleared');
    };
    
    try {
      toast.loading('Cerrando sesión...', { id: 'logout-toast' });
      
      // Crear promesa con timeout
      const signOutPromise = signOut();
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 5000)
      );
      
      // Race entre signOut y timeout
      const result = await Promise.race([signOutPromise, timeoutPromise])
        .catch((err) => {
          console.error('SignOut timeout or error:', err);
          // Si hay timeout, forzar logout local
          return { error: null };
        });
      
      const { error } = result as { error: any };
      
      if (error) {
        console.error('Error signing out:', error);
      }
      
      console.log('Sign out completed, cleaning storage...');
      toast.dismiss('logout-toast');
      
      // SIEMPRE limpiar el storage, sin importar el resultado
      clearSupabaseStorage();
      
      // Redirigir al menú
      setActiveSection('menu');
      toast.success('👋 Sesión cerrada exitosamente');
      
      // Forzar recarga completa
      setTimeout(() => {
        window.location.replace('/');
      }, 500);
    } catch (error) {
      console.error('Exception during sign out:', error);
      toast.dismiss('logout-toast');
      
      // Forzar logout de todas formas
      clearSupabaseStorage();
      setActiveSection('menu');
      toast.success('👋 Sesión cerrada');
      
      setTimeout(() => {
        window.location.replace('/');
      }, 500);
    }
  };

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
            {allSections.map((section) => (
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
            
            {/* Botón de autenticación */}
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-white/80 hidden md:block">
                  Hola, {user.user_metadata?.full_name || user.email?.split('@')[0]}
                </span>
                <Button
                  variant="ghost"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Logout button clicked');
                    handleSignOut();
                  }}
                  className="text-white hover:bg-white/20 hover:text-white"
                  size="sm"
                  title="Cerrar sesión"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  <span className="hidden md:inline">Salir</span>
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                onClick={() => setShowAuthModal(true)}
                className="text-white hover:bg-white/20 hover:text-white"
              >
                <User className="w-4 h-4 mr-2" />
                Iniciar Sesión
              </Button>
            )}

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
      
      {/* Modal de autenticación */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </header>
  );
}