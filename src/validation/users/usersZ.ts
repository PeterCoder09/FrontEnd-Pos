import { z } from 'zod';

export const UserSchema = z.object({
    id: z.number(),
    nombre: z.string(),
    email: z.string().email(),
    estado: z.enum(['activo', 'inactivo']),
    createdAt: z.string().optional(),
    password: z.string(),
});

export type User = z.infer<typeof UserSchema>;
