import { supabase } from '../supabase';
import { ProductEditData } from '../../validation/products/productEditZ';

export async function updateProduct(id: number, data: ProductEditData) {
    try {
        console.log('Data to update:', data); // Para depuración
        const { error } = await supabase
            .from('products')
            .update(data)
            .eq('id', id);

        if (error) {
            throw error;
        }

        return true; // Actualización exitosa
    } catch (error) {
        console.error('Error updating product:', error);
        return false; // Fallo en la actualización
    }
}
