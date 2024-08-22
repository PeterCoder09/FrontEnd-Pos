import { z } from 'zod';
import { SaleState } from '../../types/sales';

// Esquema Zod para la validación de 'Sale'
export const SaleSchema = z.object({
    id: z.number().positive(),
    clienteId: z.number().nullable(),
    fecha: z.date().nullable(),
    estado: z.nativeEnum(SaleState),
    createdAt: z.date().nullable(),
});

// Esquema Zod para la validación de 'UpdateSaleData'
export const UpdateSaleDataSchema = z.object({
    id: z.number().positive(),
    clienteId: z.number().nullable().optional(),
    fecha: z.date().nullable().optional(),
    estado: z.nativeEnum(SaleState).optional(),
    createdAt: z.date().nullable().optional(),
});
