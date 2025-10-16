
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ProductCard } from "./ProductCard";
import { ComboCard } from "./ComboCard";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

// Datos de productos
const products = {
  tortas: [
    {
      id: 'torta-1',
      name: 'Torta de Carne Ahumada',
      basePrice: 85,
      description: 'Deliciosa torta con carne ahumada, aguacate, jitomate y cebolla',
      category: 'torta' as const,
      imageUrl: 'https://images.unsplash.com/photo-1730878423239-0fd430bbac37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwc21va2VkJTIwbWVhdCUyMHRvcnRhJTIwc2FuZHdpY2h8ZW58MXx8fHwxNzU4MTE1NjM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      ingredients: [
        { id: 'queso', name: 'Queso extra', price: 15 },
        { id: 'aguacate', name: 'Aguacate extra', price: 10 },
        { id: 'chile', name: 'Chiles jalapeños', price: 5 },
        { id: 'frijoles', name: 'Frijoles refritos', price: 8 },
        { id: 'lechuga', name: 'Lechuga', price: 3 }
      ]
    },
    {
      id: 'torta-2',
      name: 'Torta Chichimeca',
      basePrice: 75,
      description: 'Torta tradicional con carne de res, nopales y salsa verde',
      category: 'torta' as const,
      imageUrl: 'https://images.unsplash.com/photo-1569072412439-e8cd5d6f22df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMG1leGljYW4lMjB0b3J0YSUyMGNoaWNoaW1lY2ElMjBiZWVmJTIwbm9wYWxlc3xlbnwxfHx8fDE3NTgxMTU2NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      ingredients: [
        { id: 'nopales', name: 'Nopales extra', price: 12 },
        { id: 'queso-oaxaca', name: 'Queso Oaxaca', price: 18 },
        { id: 'salsa-verde', name: 'Salsa verde extra', price: 5 },
        { id: 'cebolla-morada', name: 'Cebolla morada', price: 4 }
      ]
    },
    {
      id: 'torta-3',
      name: 'Torta de Chistorra',
      basePrice: 70,
      description: 'Sabrosa torta con chorizo español, pimientos y cebolla',
      category: 'torta' as const,
      imageUrl: 'https://images.unsplash.com/photo-1585763556025-fd481e5b74fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFuaXNoJTIwY2hvcml6byUyMHNhbmR3aWNoJTIwY2hpc3RvcnJhJTIwcGVwcGVyc3xlbnwxfHx8fDE3NTgxMTU2NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      ingredients: [
        { id: 'pimientos', name: 'Pimientos extra', price: 8 },
        { id: 'queso-manchego', name: 'Queso Manchego', price: 20 },
        { id: 'cebolla-caramelizada', name: 'Cebolla caramelizada', price: 10 }
      ]
    },
    {
      id: 'torta-4',
      name: 'Torta de Jamón',
      basePrice: 65,
      description: 'Clásica torta de jamón con queso, jitomate y mayonesa',
      category: 'torta' as const,
      imageUrl: 'https://images.unsplash.com/photo-1581975636249-ff529eba3c28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW0lMjBjaGVlc2UlMjBzYW5kd2ljaCUyMG1leGljYW4lMjB0b3J0YXxlbnwxfHx8fDE3NTgxMTU2NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      ingredients: [
        { id: 'jamon-extra', name: 'Jamón extra', price: 15 },
        { id: 'queso-amarillo', name: 'Queso amarillo', price: 10 },
        { id: 'jitomate', name: 'Jitomate extra', price: 5 },
        { id: 'mayonesa', name: 'Mayonesa extra', price: 3 }
      ]
    }
  ],
  aguas: [
    {
      id: 'agua-1',
      name: 'Agua de Horchata',
      basePrice: 25,
      description: 'Refrescante agua de horchata con canela',
      category: 'agua' as const,
      imageUrl: 'https://images.unsplash.com/photo-1750010274830-1155de5373cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3JjaGF0YSUyMGRyaW5rJTIwbWV4aWNhbiUyMGFndWElMjBmcmVzY2F8ZW58MXx8fHwxNzU4MTE1NjY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      ingredients: [
        { id: 'canela-extra', name: 'Canela extra', price: 3 },
        { id: 'leche-condensada', name: 'Leche condensada', price: 5 }
      ]
    },
    {
      id: 'agua-2',
      name: 'Agua de Jamaica',
      basePrice: 20,
      description: 'Agua natural de jamaica sin azúcar',
      category: 'agua' as const,
      imageUrl: 'https://images.unsplash.com/photo-1719756085699-76c1bb97ebfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYW1haWNhJTIwaGliaXNjdXMlMjBkcmluayUyMGFndWElMjBmcmVzY2ElMjBtZXhpY2FufGVufDF8fHx8MTc1ODExNTY2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      ingredients: [
        { id: 'limon', name: 'Limón extra', price: 2 },
        { id: 'azucar', name: 'Azúcar', price: 1 }
      ]
    },
    {
      id: 'agua-3',
      name: 'Agua de Tamarindo',
      basePrice: 22,
      description: 'Dulce agua de tamarindo con chile piquín',
      category: 'agua' as const,
      imageUrl: 'https://images.unsplash.com/photo-1750010274830-1155de5373cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YW1hcmluZCUyMGRyaW5rJTIwYWd1YSUyMGZyZXNjYSUyMG1leGljYW4lMjBiZXZlcmFnZXxlbnwxfHx8fDE3NTgxMTU2NzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      ingredients: [
        { id: 'chile-piquin', name: 'Chile piquín extra', price: 3 },
        { id: 'sal', name: 'Sal', price: 1 }
      ]
    }
  ],
  papas: [
    {
      id: 'papas-1',
      name: 'Papas Fritas Naturales',
      basePrice: 35,
      description: 'Papas fritas crujientes con sal de mar',
      category: 'papas' as const,
      imageUrl: 'https://images.unsplash.com/photo-1751890916224-2fbde6ae28c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmlzcHklMjBmcmVuY2glMjBmcmllcyUyMGdvbGRlbiUyMHBvdGF0b3xlbnwxfHx8fDE3NTgxMTU2NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      ingredients: [
        { id: 'ketchup', name: 'Ketchup', price: 3 },
        { id: 'mostaza', name: 'Mostaza', price: 3 },
        { id: 'mayonesa-papas', name: 'Mayonesa', price: 3 },
        { id: 'queso-nacho', name: 'Queso nacho', price: 12 }
      ]
    },
    {
      id: 'papas-2',
      name: 'Papas Gajo',
      basePrice: 40,
      description: 'Papas en gajos con especias y hierbas',
      category: 'papas' as const,
      imageUrl: 'https://images.unsplash.com/photo-1541683746238-470486ba4a00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3RhdG8lMjB3ZWRnZXMlMjBzZWFzb25lZCUyMGhlcmJzJTIwc3BpY2VzfGVufDF8fHx8MTc1ODExNTY3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      ingredients: [
        { id: 'salsa-ranch', name: 'Salsa ranch', price: 8 },
        { id: 'queso-cheddar', name: 'Queso cheddar', price: 15 },
        { id: 'tocino', name: 'Tocino', price: 18 }
      ]
    }
  ]
};

const combos = [
  {
    id: 'combo-1',
    name: 'Combo Familiar',
    description: 'Perfecto para compartir en familia',
    items: [
      { name: 'Torta de Carne Ahumada', quantity: 2 },
      { name: 'Papas Fritas', quantity: 2 },
      { name: 'Agua de Horchata', quantity: 2 }
    ],
    originalPrice: 290,
    comboPrice: 250,
    savings: 40,
    imageUrl: 'https://images.unsplash.com/photo-1581975636249-ff529eba3c28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwdG9ydGElMjBzYW5kd2ljaCUyMGNvbWJvJTIwZmFtaWx5JTIwbWVhbHxlbnwxfHx8fDE3NTgxMTU0NDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 'combo-2',
    name: 'Combo Individual',
    description: 'La combinación perfecta para una persona',
    items: [
      { name: 'Torta a elegir', quantity: 1 },
      { name: 'Papas Fritas', quantity: 1 },
      { name: 'Agua a elegir', quantity: 1 }
    ],
    originalPrice: 140,
    comboPrice: 120,
    savings: 20,
    imageUrl: 'https://images.unsplash.com/photo-1667515343519-05deb1a7567b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwc2FuZHdpY2glMjBpbmRpdmlkdWFsJTIwY29tYm8lMjBtZWFsfGVufDF8fHx8MTc1ODExNTQ1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 'combo-3',
    name: 'Combo Ejecutivo',
    description: 'Rápido y nutritivo para tu día de trabajo',
    items: [
      { name: 'Torta de Jamón', quantity: 1 },
      { name: 'Agua de Jamaica', quantity: 1 }
    ],
    originalPrice: 85,
    comboPrice: 75,
    savings: 10,
    imageUrl: 'https://images.unsplash.com/photo-1730878423239-0fd430bbac37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwaGFtJTIwc2FuZHdpY2glMjBidXNpbmVzcyUyMGx1bmNofGVufDF8fHx8MTc1ODExNTQ1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 'combo-4',
    name: 'Combo Mega',
    description: 'Para los que tienen mucha hambre',
    items: [
      { name: 'Torta Chichimeca', quantity: 1 },
      { name: 'Papas Gajo', quantity: 1 },
      { name: 'Agua de Tamarindo', quantity: 1 },
      { name: 'Queso extra', quantity: 1 }
    ],
    originalPrice: 155,
    comboPrice: 135,
    savings: 20,
    imageUrl: 'https://images.unsplash.com/photo-1726514734441-dde9eabd9208?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXJnZSUyMG1leGljYW4lMjBmb29kJTIwcGxhdHRlciUyMG1lZ2ElMjBjb21ib3xlbnwxfHx8fDE3NTgxMTU0NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  }
];

interface MenuSectionProps {
  onAddToCart: (item: any, extras?: any, total?: number) => void;
}

export function MenuSection({ onAddToCart }: MenuSectionProps) {

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl mb-4">Nuestro Menú</h2>
        <p className="text-muted-foreground">
          Descubre nuestras deliciosas tortas artesanales, aguas frescas y papas crujientes.
          Todos nuestros ingredientes son frescos y de la mejor calidad.
        </p>
      </div>



      <Tabs defaultValue="combos" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="combos">🎯 Combos</TabsTrigger>
          <TabsTrigger value="tortas">🥪 Tortas</TabsTrigger>
          <TabsTrigger value="aguas">🥤 Aguas</TabsTrigger>
          <TabsTrigger value="papas">🍟 Papas</TabsTrigger>
        </TabsList>

        <TabsContent value="combos" className="space-y-6">
          <div>
            <h3 className="text-xl mb-4">Combos Especiales</h3>
            <p className="text-muted-foreground mb-6">
              Ahorra dinero con nuestros combos diseñados para diferentes necesidades.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {combos.map((combo) => (
                <ComboCard 
                  key={combo.id} 
                  combo={combo} 
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tortas" className="space-y-6">
          <div>
            <h3 className="text-xl mb-4">Tortas Artesanales</h3>
            <p className="text-muted-foreground mb-6">
              Nuestras tortas están hechas con pan fresco y los mejores ingredientes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.tortas.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="aguas" className="space-y-6">
          <div>
            <h3 className="text-xl mb-4">Aguas Frescas</h3>
            <p className="text-muted-foreground mb-6">
              Refréscate con nuestras aguas naturales preparadas diariamente.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.aguas.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="papas" className="space-y-6">
          <div>
            <h3 className="text-xl mb-4">Papas y Acompañamientos</h3>
            <p className="text-muted-foreground mb-6">
              Perfectas para acompañar tu torta o como botana.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.papas.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}