-- ============================================
-- DATOS INICIALES SIMPLIFICADOS - TORTAS LINNEY
-- Basado en los productos actuales de la aplicación
-- ============================================

-- ============================================
-- INGREDIENTES DE LAS TORTAS
-- ============================================

-- Ingredientes para Torta de Carne Ahumada
INSERT INTO ingredients (name, stock_quantity, min_stock_level, unit) VALUES
('Carne ahumada', 10.0, 2.0, 'kg'),
('Aguacate', 15.0, 3.0, 'kg'),
('Jitomate', 20.0, 5.0, 'kg'),
('Cebolla', 15.0, 3.0, 'kg'),
('Queso extra', 8.0, 2.0, 'kg'),
('Chiles jalapeños', 5.0, 1.0, 'kg'),
('Frijoles refritos', 10.0, 2.0, 'kg'),
('Lechuga', 10.0, 2.0, 'kg');

-- Ingredientes para Torta Chichimeca
INSERT INTO ingredients (name, stock_quantity, min_stock_level, unit) VALUES
('Carne de res', 10.0, 2.0, 'kg'),
('Nopales', 8.0, 2.0, 'kg'),
('Queso Oaxaca', 6.0, 1.5, 'kg'),
('Salsa verde', 5.0, 1.0, 'litros'),
('Cebolla morada', 5.0, 1.0, 'kg');

-- Ingredientes para Torta de Chistorra
INSERT INTO ingredients (name, stock_quantity, min_stock_level, unit) VALUES
('Chistorra (chorizo español)', 8.0, 2.0, 'kg'),
('Pimientos', 6.0, 1.5, 'kg'),
('Queso Manchego', 4.0, 1.0, 'kg'),
('Cebolla caramelizada', 5.0, 1.0, 'kg');

-- Ingredientes para Torta de Jamón
INSERT INTO ingredients (name, stock_quantity, min_stock_level, unit) VALUES
('Jamón', 10.0, 2.0, 'kg'),
('Queso amarillo', 8.0, 2.0, 'kg'),
('Mayonesa', 5.0, 1.0, 'litros');

-- Ingrediente base
INSERT INTO ingredients (name, stock_quantity, min_stock_level, unit) VALUES
('Pan para torta', 100.0, 20.0, 'piezas');

-- ============================================
-- INGREDIENTES PARA AGUAS FRESCAS
-- ============================================

INSERT INTO ingredients (name, stock_quantity, min_stock_level, unit) VALUES
('Concentrado de horchata', 20.0, 5.0, 'litros'),
('Canela', 2.0, 0.5, 'kg'),
('Leche condensada', 10.0, 2.0, 'litros'),
('Flor de jamaica', 5.0, 1.0, 'kg'),
('Limón', 10.0, 2.0, 'kg'),
('Azúcar', 25.0, 5.0, 'kg'),
('Pulpa de tamarindo', 8.0, 2.0, 'kg'),
('Chile piquín', 1.0, 0.2, 'kg'),
('Sal', 5.0, 1.0, 'kg');

-- ============================================
-- INGREDIENTES PARA PAPAS
-- ============================================

INSERT INTO ingredients (name, stock_quantity, min_stock_level, unit) VALUES
('Papas', 50.0, 10.0, 'kg'),
('Aceite para freír', 15.0, 3.0, 'litros'),
('Sal de mar', 3.0, 0.5, 'kg'),
('Ketchup', 8.0, 2.0, 'litros'),
('Mostaza', 6.0, 1.5, 'litros'),
('Mayonesa para papas', 6.0, 1.5, 'litros'),
('Queso nacho', 5.0, 1.0, 'litros'),
('Salsa ranch', 4.0, 1.0, 'litros'),
('Queso cheddar', 6.0, 1.5, 'kg'),
('Tocino', 4.0, 1.0, 'kg');

-- ============================================
-- RESUMEN DE INVENTARIO
-- ============================================

-- Total de ingredientes: 39
-- Categorías:
--   - Ingredientes para tortas: 15 items
--   - Ingredientes para aguas: 9 items
--   - Ingredientes para papas: 10 items
--   - Ingrediente base (pan): 1 item
--   - Ingredientes compartidos: varios

-- ============================================
-- FIN DE DATOS INICIALES
-- ============================================
