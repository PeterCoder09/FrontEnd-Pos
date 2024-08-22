import { Client } from '../../types/clientes';

export const getAllClients = async (): Promise<Client[]> => {
    const response = await fetch('/clientes');
    if (!response.ok) {
        throw new Error('Error al obtener clientes');
    }
    return response.json();
};
