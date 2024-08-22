export enum ClientState {
    ACTIVO = 'activo',
    INACTIVO = 'inactivo',
}

export type Client = {
    id: number;
    nombre: string;
    email: string;
    telefono: string | null;
    estado: ClientState | null;
    createdAt: Date | null;
}

export interface UpdateClientData {
    id: number;
    nombre?: string;
    email?: string;
    telefono?: string | null;
    estado?: ClientState | null;
    createdAt?: Date | null;
}
