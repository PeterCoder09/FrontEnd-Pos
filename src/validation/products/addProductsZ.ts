import { z } from 'zod';
import { ProductCategory, ProductState } from '../../types/products';

// Esquema de validación para los datos del producto
export const addProductSchema = z.object({
    nombre: z.string().min(1, { message: 'Nombre es requerido' }),
    precio: z.number().min(0, { message: 'Precio debe ser un número positivo' }),
    categoria: z.enum([
        ProductCategory.MEDICINA,
        ProductCategory.SUPLEMENTOS,
        ProductCategory.ACEITES,
        ProductCategory.ALIMENTOS,
        ProductCategory.HOGAR,
        ProductCategory.CUIDADO_PERSONAL,
    ], { message: 'Categoría inválida' }),
    estado: z.enum([
        ProductState.ACTIVO,
        ProductState.INACTIVO,
    ]).nullable().optional(),
});
