// Enumeración para el estado del usuario
export enum UserState {
    ACTIVO = 'activo',
    INACTIVO = 'inactivo',
}

// Tipo para los datos del usuario
export type User = {
    id: number;
    nombre: string;
    email: string;
    estado: UserState | null;
    createdAt: string;
    password: string;
}

// Tipo para actualizar datos del usuario
export interface UpdateUserData {
    id: number;
    nombre?: string;
    email?: string;
    estado?: UserState;
    password?: string;
}
