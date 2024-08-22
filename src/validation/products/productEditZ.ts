import { z } from 'zod';
import { ProductCategory, ProductState } from '../../types/products';

// Define el esquema Zod para la edición de un producto
export const ProductEditSchema = z.object({
    nombre: z
        .string()
        .min(1, { message: 'El nombre es obligatorio' })
        .max(255, { message: 'El nombre no puede tener más de 255 caracteres' }),
    categoria: z.nativeEnum(ProductCategory, {
        errorMap: () => ({ message: 'Categoría inválida' }),
    }),
    precio: z
        .number()
        .positive({ message: 'El precio debe ser un número positivo' })
        .max(99999999.99, { message: 'El precio es demasiado alto' }),
    estado: z.nativeEnum(ProductState, { errorMap: () => ({ message: 'Estado inválido' }) }),
});

export type ProductEditData = z.infer<typeof ProductEditSchema>;
