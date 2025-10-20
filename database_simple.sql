-- ============================================
-- BASE DE DATOS SIMPLIFICADA - TORTAS LINNEY
-- Sistema de Gestión de Inventario
-- ============================================

-- ============================================
-- 1. TABLA DE USUARIOS ADMINISTRADORES
-- ============================================
CREATE TABLE admin_users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE admin_users IS 'Usuarios administradores del sistema';

-- ============================================
-- 2. TABLA DE INGREDIENTES
-- ============================================
CREATE TABLE ingredients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  stock_quantity DECIMAL(10,2) NOT NULL DEFAULT 0,
  min_stock_level DECIMAL(10,2) NOT NULL DEFAULT 5,
  unit TEXT NOT NULL, -- kg, litros, piezas
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE ingredients IS 'Inventario de ingredientes';

CREATE INDEX idx_ingredients_name ON ingredients(name);

-- ============================================
-- 3. POLÍTICAS DE SEGURIDAD (RLS)
-- ============================================

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE ingredients ENABLE ROW LEVEL SECURITY;

-- Solo administradores pueden acceder
CREATE POLICY "Solo administradores" ON admin_users
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "Solo administradores pueden gestionar inventario" ON ingredients
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid())
  );

-- ============================================
-- 4. TRIGGER PARA ACTUALIZAR TIMESTAMPS
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_ingredients_timestamp 
  BEFORE UPDATE ON ingredients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- FIN DEL SCRIPT
-- ============================================
