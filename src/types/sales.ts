export type Sale = {
    id: number;
    clienteId: number | null;
    fecha: Date | null;
    estado: SaleState;
    createdAt: Date | null;
    clienteNombre: string;
}

// Enumeración para el estado de la venta
export enum SaleState {
    COMPLETADO = 'completado',
    CANCELADO = 'cancelado',
    
}

// Tipo para actualizar datos de una venta
export interface UpdateSaleData {
    id: number;
    clienteId?: number | null;
    fecha?: Date | null;
    estado?: SaleState;
    createdAt?: Date | null;
}