import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

export function AboutSection() {
  const features = [
    {
      icon: "🥪",
      title: "Tortas Artesanales",
      description: "Preparadas con pan fresco horneado diariamente y ingredientes de la más alta calidad."
    },
    {
      icon: "🥤",
      title: "Aguas Naturales",
      description: "Aguas frescas preparadas con frutas naturales, sin conservadores artificiales."
    },
    {
      icon: "⏰",
      title: "Servicio Rápido",
      description: "Tu pedido estará listo en menos de 10 minutos, perfecto para tu hora de comida."
    },
    {
      icon: "💰",
      title: "Precios Justos",
      description: "La mejor relación calidad-precio en tortas mexicanas de la ciudad."
    },
    {
      icon: "👨‍🍳",
      title: "Recetas Familiares",
      description: "Más de 15 años perfeccionando nuestras recetas tradicionales mexicanas."
    },
    {
      icon: "🌟",
      title: "Ingredientes Premium",
      description: "Seleccionamos cuidadosamente cada ingrediente para garantizar el mejor sabor."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl mb-4">Sobre Nosotros</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          En <span className="text-primary">Tortas Linney</span>, Linney Flores, estudiante de la Universidad Veracruzana, 
          te ofrece las mejores tortas artesanales preparadas con ingredientes frescos y recetas tradicionales.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {features.map((feature, index) => (
          <Card key={index} className="text-center">
            <CardHeader>
              <div className="text-4xl mb-2">{feature.icon}</div>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-accent/50 rounded-lg p-8 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl mb-4">Nuestra Historia</h3>
            <p className="text-muted-foreground mb-4">
              <strong>Tortas Linney</strong> es un emprendimiento estudiantil creado por Linney Flores, estudiante 
              de la Universidad Veracruzana. Nació del deseo de ofrecer a la comunidad universitaria tortas 
              deliciosas y frescas, preparadas con ingredientes de calidad y recetas tradicionales.
            </p>
            <p className="text-muted-foreground mb-6">
              Como estudiante universitaria, Linney entiende las necesidades de la comunidad estudiantil, 
              ofreciendo precios accesibles y servicio de entrega en los campus de Mocambo, Ingeniería y FEFUV. 
              Cada torta se prepara con dedicación y el compromiso de brindar la mejor experiencia gastronómica.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Emprendimiento estudiantil</Badge>
              <Badge variant="secondary">Recetas tradicionales</Badge>
              <Badge variant="secondary">Ingredientes frescos</Badge>
              <Badge variant="secondary">Servicio universitario</Badge>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-blue-700 text-primary-foreground p-8 rounded-lg">
              <h4 className="text-xl mb-4">Nuestros Valores</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <span>✅</span>
                  <span>Calidad en cada ingrediente</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>✅</span>
                  <span>Servicio al cliente excepcional</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>✅</span>
                  <span>Tradición culinaria mexicana</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>✅</span>
                  <span>Precios accesibles para todos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>✅</span>
                  <span>Compromiso con la comunidad</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-xl mb-4">¿Por qué elegir Tortas Linney?</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          No solo vendemos tortas, creamos experiencias gastronómicas pensadas especialmente para la comunidad 
          universitaria. Cada bocado es una celebración de los sabores auténticos de México, preparada con 
          el amor y la dedicación de una estudiante que entiende tus necesidades.
        </p>
      </div>
    </div>
  );
}
