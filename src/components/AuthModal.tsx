import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Separator } from './ui/separator'
import { useAuth } from '../contexts/AuthContext'
import { toast } from 'sonner'
import { Loader2, Eye, EyeOff } from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    confirmPassword: ''
  })

  const { signIn, signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Solo iniciar sesión (sin registro)
      const { error } = await signIn(formData.email, formData.password)
      if (error) {
        toast.error('Error al iniciar sesión: ' + error.message)
      } else {
        toast.success('¡Bienvenido Administrador!')
        onClose()
        resetForm()
      }
    } catch (error) {
      toast.error('Error inesperado. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      fullName: '',
      phone: '',
      confirmPassword: ''
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <Card className="w-full max-w-md shadow-2xl border-0 overflow-hidden bg-white">
        {/* Header con gradiente */}
        <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-blue-700 text-white px-6 py-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className="bg-white/20 backdrop-blur-md px-4 py-3 rounded-xl">
              <span className="text-3xl">🌮</span>
            </div>
            <h2 className="text-2xl font-bold">Tortas Linney</h2>
          </div>
          <p className="text-white/90 text-sm">
            Panel de Administración 👨‍💼
          </p>
          <p className="text-white/70 text-xs mt-1">
            Ingresa tus credenciales de administrador
          </p>
        </div>
        
        <CardContent className="px-6 pb-6 bg-white pt-6">
          {/* Formulario de login simple sin tabs */}
          <div className="space-y-5">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-sm font-medium">
                    📧 Email
                  </Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="h-11 border-2 focus:border-purple-500 transition-colors"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-sm font-medium">
                    🔒 Contraseña
                  </Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Tu contraseña"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="h-11 border-2 focus:border-purple-500 transition-colors pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-500 hover:text-purple-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-11 bg-gradient-to-br from-purple-500 via-purple-600 to-blue-700 hover:from-purple-600 hover:via-purple-700 hover:to-blue-800 text-white font-medium shadow-lg hover:shadow-xl transition-all" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Iniciando sesión...
                    </>
                  ) : (
                    <>
                      <span className="mr-2">🚀</span>
                      Iniciar Sesión
                    </>
                  )}
                </Button>
              </form>
            </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">o</span>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <Button 
                variant="outline" 
                onClick={onClose} 
                className="w-full h-11 border-2 hover:bg-gray-50 transition-colors"
              >
                ❌ Cancelar
              </Button>
            </div>
          </div>
          
          <div className="mt-4 text-center text-xs text-gray-500">
            <p>
              🔐 Acceso exclusivo para administradores
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
