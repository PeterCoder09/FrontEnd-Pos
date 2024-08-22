import { z } from 'zod';
import { ProductCategory } from '../../types/products';
import { ProductState } from '../../types/products';

export const ProductSchema = z.object({
    id: z.number(),
    nombre: z.string(),
    categoria: z.nativeEnum(ProductCategory),
    precio: z.number(),
    estado: z.nativeEnum(ProductState).nullable(),
    createdAt: z.string(),
});

export type Product = z.infer<typeof ProductSchema>;
