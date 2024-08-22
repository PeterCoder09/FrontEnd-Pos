// src/services/addProduct.ts
import { supabase } from '../supabase';
import { addProductSchema } from '../../validation/products/addProductsZ';
import { Product, ProductCategory, ProductState } from '../../types/products';

export const addProduct = async (productData: Omit<Product, 'id' | 'createdAt'>) => {
    const result = addProductSchema.safeParse(productData);

    if (!result.success) {
        throw new Error(result.error.format()._errors.join(' '));
    }

    const { nombre, precio, categoria, estado } = result.data;

    const { data, error } = await supabase
        .from('products')
        .insert([{ nombre, precio, categoria, estado }]);

    if (error) {
        throw new Error(`Error al agregar el producto: ${error.message}`);
    }

    return data;
};
