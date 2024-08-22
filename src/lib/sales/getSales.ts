import { supabase } from "../supabase";
import { Sale, SaleState } from '../../types/sales'; // Ajusta la ruta según sea necesario

export const getSalesWithClients = async (): Promise<Sale[]> => {
    const { data, error } = await supabase
        .from('sales')
        .select(`
            id,
            cliente_id,
            fecha,
            estado,
            created_at,
            clients (
                nombre
            )
        `);

    if (error) {
        console.error('Error al obtener ventas con clientes:', error);
        throw error;
    }

    // Transforma los datos recibidos
    const sales: Sale[] = data.map((sale: any) => ({
        id: sale.id,
        clienteId: sale.cliente_id,
        fecha: sale.fecha ? new Date(sale.fecha) : null,
        estado: sale.estado as SaleState,
        createdAt: sale.created_at ? new Date(sale.created_at) : null,
        clienteNombre: sale.clients?.nombre || 'Sin asignar', // Agregamos el nombre del cliente
    }));

    return sales;
};
