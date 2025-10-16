import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export function ContactSection() {
  const contactInfo = [
    {
      icon: "📍",
      title: "Ubicación",
      details: [
        "Campus Mocambo",
        "Universidad Veracruzana",
        "Veracruz, Veracruz"
      ]
    },
    {
      icon: "📞",
      title: "Contacto",
      details: [
        "WhatsApp disponible",
        "Contacto directo",
        "Respuesta rápida"
      ]
    },
    {
      icon: "🚚",
      title: "Zonas de Entrega",
      details: [
        "Campus Mocambo",
        "Campus Ingeniería",
        "Campus FEFUV"
      ]
    },
    {
      icon: "💳",
      title: "Formas de Pago",
      details: [
        "Efectivo",
        "Transferencias bancarias",
        "Pago al recibir"
      ]
    }
  ];

  const socialMedia = [
    { platform: "Facebook", handle: "@TortasLinney", icon: "📘" },
    { platform: "Instagram", handle: "@tortaslinney", icon: "📷" },
    { platform: "WhatsApp", handle: "Contacto directo", icon: "💬" }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl mb-4">Contacto</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          ¿Tienes preguntas, sugerencias o quieres hacer un pedido especial? 
          ¡Estamos aquí para atenderte! Contáctanos por cualquiera de estos medios.
        </p>
      </div>

      {/* Información de contacto principal */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {contactInfo.map((info, index) => (
          <Card key={index} className="text-center">
            <CardHeader>
              <div className="text-3xl mb-2">{info.icon}</div>
              <CardTitle className="text-lg">{info.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {info.details.map((detail, detailIndex) => (
                  <p key={detailIndex} className="text-sm text-muted-foreground">
                    {detail}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sección de pedidos y delivery */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>🚚</span>
              <span>Servicio a Domicilio</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              ¡Llevamos nuestras deliciosas tortas hasta tu campus! 
              Servicio de entrega en Mocambo, Ingeniería y FEFUV.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Pedido mínimo:</span>
                <span>$80 MXN</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Costo de envío:</span>
                <span>$15 MXN</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tiempo de entrega:</span>
                <span>20-30 min</span>
              </div>
            </div>
            <Button className="w-full">
              Hacer Pedido por WhatsApp
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2 border-accent">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>🏪</span>
              <span>Pedidos para Recoger</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Contacta por WhatsApp y coordina la recogida en Campus Mocambo. 
              ¡Perfecto para estudiantes con horarios apretados!
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Tiempo de preparación:</span>
                <span>10-15 min</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Descuento por recogida:</span>
                <span>10% del total</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Pedidos especiales:</span>
                <span>Con 1 hora de anticipación</span>
              </div>
            </div>
            <Button variant="secondary" className="w-full">
              Llamar para Ordenar
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Redes sociales */}
      <div className="bg-accent/50 rounded-lg p-8 mb-8">
        <h3 className="text-xl text-center mb-6">Síguenos en Redes Sociales</h3>
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {socialMedia.map((social, index) => (
            <div key={index} className="flex items-center space-x-2 bg-background px-4 py-2 rounded-lg">
              <span className="text-xl">{social.icon}</span>
              <div>
                <p className="text-sm">{social.platform}</p>
                <p className="text-xs text-muted-foreground">{social.handle}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center space-y-2">
          <p className="text-muted-foreground text-sm">
            Mantente al día con nuestras promociones especiales, nuevos productos y eventos.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="outline">Promociones exclusivas</Badge>
            <Badge variant="outline">Nuevos sabores</Badge>
            <Badge variant="outline">Eventos especiales</Badge>
          </div>
        </div>
      </div>

      {/* Información adicional */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>🎉</span>
              <span>Eventos Especiales</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm mb-4">
              ¿Organizas una fiesta, reunión de trabajo o evento familiar? 
              Ofrecemos paquetes especiales para grupos.
            </p>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Paquetes para 10+ personas</li>
              <li>• Descuentos por volumen</li>
              <li>• Entrega puntual garantizada</li>
              <li>• Personalización de menú</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>💡</span>
              <span>Sugerencias y Comentarios</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm mb-4">
              Tu opinión es muy importante para nosotros. Ayúdanos a mejorar 
              nuestro servicio y productos.
            </p>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Encuestas de satisfacción</li>
              <li>• Sugerencias de nuevos sabores</li>
              <li>• Reportes de calidad</li>
              <li>• Ideas para mejorar el servicio</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}