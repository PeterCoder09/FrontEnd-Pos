// Enumeración para el estado del producto
export enum ProductState {
    ACTIVO = 'activo',
    INACTIVO = 'inactivo',
}

export enum ProductCategory {
    MEDICINA = 'Medicina',
    SUPLEMENTOS = 'Suplementos',
    ACEITES = 'Aceites',
    ALIMENTOS = 'Alimentos',
    HOGAR = 'Hogar',
    CUIDADO_PERSONAL = 'Cuidado personal',
}

// Tipo para los datos del producto
export type Product = {
    id: number;
    nombre: string;
    categoria: ProductCategory;
    precio: number;
    estado: ProductState | null;
    createdAt: string;
}

// Tipo para actualizar datos del producto
export interface UpdateProductData {
    nombre?: string;
    categoria?: ProductCategory;
    precio?: number;
    estado?: ProductState;
}
