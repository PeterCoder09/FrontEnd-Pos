import { z } from 'zod';

// Esquema de validación usando Zod
const loginSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

// Función para validar los datos de inicio de sesión
export const validateLogin = (email: string, password: string) => {
    try {
        loginSchema.parse({ email, password });
        return { isValid: true, error: null };
    } catch (err) {
        if (err instanceof z.ZodError) {
            return { isValid: false, error: err.errors.map(e => e.message).join(', ') };
        }
        return { isValid: false, error: 'Error desconocido' };
    }
};
