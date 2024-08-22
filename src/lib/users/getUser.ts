import { supabase } from '../supabase';
import { UserSchema, User } from '../../validation/users/usersZ'

export async function getAllUsers(): Promise<User[]> {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*');

        if (error) {
            throw new Error(`Error fetching users: ${error.message}`);
        }

        // Validar y mapear los datos a la estructura definida en el tipo 'User'
        const users: User[] = data.map((user) => {
            const parsedUser = UserSchema.safeParse(user);
            if (!parsedUser.success) {
                throw new Error(`Invalid user data: ${parsedUser.error}`);
            }
            return parsedUser.data;
        });

        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}
