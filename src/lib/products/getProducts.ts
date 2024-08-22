import { supabase } from '../supabase';
import { ProductSchema, Product } from '../../validation/products/productsZ';

export const getAllProducts = async (): Promise<Product[]> => {
    const { data, error } = await supabase
        .from('products')
        .select('id, nombre, categoria, precio, estado, created_at');

    if (error) {
        throw new Error(`Error al obtener productos: ${error.message}`);
    }

    console.log('Datos recibidos de Supabase:', data);

    // Mapear el campo created_at a createdAt y formatear la fecha
    const mappedData = data?.map((item) => ({
        id: item.id,
        nombre: item.nombre,
        categoria: item.categoria,
        precio: item.precio,
        estado: item.estado,
        createdAt: item.created_at ? new Date(item.created_at).toLocaleDateString() : '', // Formatear solo la fecha
    }));

    // Validar y transformar los datos con Zod
    try {
        const parsedData = ProductSchema.array().parse(mappedData);
        return parsedData;
    } catch (error) {
        console.error('Error al validar los datos de productos:', error);
        throw new Error('Los datos de productos no cumplen con el esquema esperado');
    }
};




export async function getProductById(id: number): Promise<Product | null> {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error al obtener el producto:', error);
            return null;
        }

        return data as Product;
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        return null;
    }
}

// export const getProductById = async (id: number): Promise<Product> => {
//     const response = await fetch(`/productos/product-edit/${id}`);
    
//     if (!response.ok) {
//         throw new Error('Error al obtener el producto');
//     }

//     return response.json();
// };