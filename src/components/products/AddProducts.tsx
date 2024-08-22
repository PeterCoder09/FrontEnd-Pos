import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { addProductSchema } from '../../validation/products/addProductsZ';
import { ProductCategory, ProductState } from '../../types/products'; 
import { addProduct } from '../../lib/products/addProduct';

const AddProduct: React.FC = () => {
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState<number | undefined>(undefined); // Inicializar como undefined
    const [categoria, setCategoria] = useState<ProductCategory | undefined>(undefined); // Inicializar como undefined
    const [estado, setEstado] = useState<ProductState | undefined>(undefined); // Inicializar como undefined
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = addProductSchema.safeParse({
            nombre,
            precio: precio ?? 0, // Proporcionar un valor predeterminado si es undefined
            categoria: categoria ?? ProductCategory.MEDICINA, // Proporcionar un valor predeterminado si es undefined
            estado: estado ?? ProductState.ACTIVO, // Proporcionar un valor predeterminado si es undefined
        });

        if (!result.success) {
            setError(result.error.format()._errors.join(' '));
            return;
        }

        try {
            await addProduct({
                nombre,
                precio,
                categoria,
                estado,
            });
            navigate('/productos');
        } catch (err) {
            setError(`Error al agregar el producto: ${err instanceof Error ? err.message : 'Desconocido'}`);
        }
    };

    return (
        <div className="card mx-auto m-4" style={{ maxWidth: '600px' }}>
            <div className="card-header">
                <h2>Agregar nuevo producto</h2>
                <p className="text-muted">Completa los siguientes campos para crear un nuevo producto.</p>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nombre</label>
                        <input
                            id="name"
                            type="text"
                            className="form-control"
                            placeholder="Ingresa el nombre del producto"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Precio</label>
                        <input
                            id="price"
                            type="number"
                            className="form-control"
                            placeholder="Ingresa el precio del producto"
                            value={precio === undefined ? '' : precio} // Mostrar una cadena vacía si el precio es undefined
                            onChange={(e) => setPrecio(e.target.value ? Number(e.target.value) : undefined)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Categoría</label>
                        <select
                            id="category"
                            className="form-select"
                            value={categoria ?? ''}
                            onChange={(e) => setCategoria(e.target.value as ProductCategory)}
                        >
                            <option value="" disabled>Selecciona una categoría</option>
                            <option value={ProductCategory.MEDICINA}>Medicina</option>
                            <option value={ProductCategory.SUPLEMENTOS}>Suplementos</option>
                            <option value={ProductCategory.ACEITES}>Aceites</option>
                            <option value={ProductCategory.ALIMENTOS}>Alimentos</option>
                            <option value={ProductCategory.HOGAR}>Hogar</option>
                            <option value={ProductCategory.CUIDADO_PERSONAL}>Cuidado personal</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="status" className="form-label">Estado</label>
                        <select
                            id="status"
                            className="form-select"
                            value={estado ?? ''}
                            onChange={(e) => setEstado(e.target.value as ProductState)}
                        >
                            <option value="" disabled>Selecciona un estado</option>
                            <option value={ProductState.ACTIVO}>Activo</option>
                            <option value={ProductState.INACTIVO}>Inactivo</option>
                        </select>
                    </div>
                    <div className="card-footer d-flex justify-content-between">
                        <Link to={'/productos'}>
                            <button type="button" className="btn btn-outline-primary">Volver</button>
                        </Link>
                        <button type="submit" className="btn btn-primary ms-auto">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
