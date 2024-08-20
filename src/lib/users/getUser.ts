import { supabase } from '../supabase';
import { User } from '../../types/users';

export async function getAllUsers(): Promise<User[]> {
    try {
        // Realiza la consulta a la tabla 'users' para obtener todos los registros
        const { data, error } = await supabase
            .from('users')
            .select('*');

        if (error) {
            throw new Error(`Error fetching users: ${error.message}`);
        }

        // Mapear los datos a la estructura definida en el tipo 'User'
        const users: User[] = data.map(user => ({
            id: user.id,
            nombre: user.nombre,
            email: user.email,
            estado: user.estado,
            createdAt: user.created_at,
            password: user.password,
        }));

        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}
