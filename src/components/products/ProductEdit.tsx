import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product, ProductCategory, ProductState } from '../../types/products';
import { getProductById } from '../../lib/products/getProducts';
import { updateProduct } from '../../lib/products/putProducts';
import { ProductEditSchema } from '../../validation/products/productEditZ';

export default function ProductEdit() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Omit<Product, 'id' | 'createdAt'>>({
        nombre: '',
        categoria: ProductCategory.MEDICINA,
        precio: 0,
        estado: ProductState.ACTIVO,
    });
    const [errors, setErrors] = useState<Record<string, string | undefined>>({});

    useEffect(() => {
        const fetchProduct = async () => {
            if (id) {
                const fetchedProduct = await getProductById(parseInt(id));
                if (fetchedProduct) {
                    setProduct({
                        nombre: fetchedProduct.nombre,
                        categoria: fetchedProduct.categoria,
                        precio: fetchedProduct.precio,
                        estado: fetchedProduct.estado,
                    });
                }
            }
        };

        fetchProduct();
    }, [id]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: name === 'precio' ? parseFloat(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const parsedProduct = ProductEditSchema.safeParse(product);
        if (!parsedProduct.success) {
            const newErrors = parsedProduct.error.flatten().fieldErrors;
            setErrors(newErrors);
            return;
        }

        try {
            if (id) {
                const isUpdated = await updateProduct(parseInt(id), parsedProduct.data);
                if (isUpdated) {
                    navigate('/productos');
                }
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className="card mx-auto m-4" style={{ maxWidth: '600px' }}>
            <div className="card-header">
                <h2>Editar producto</h2>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input
                            id="nombre"
                            name="nombre"
                            type="text"
                            className="form-control"
                            value={product.nombre}
                            onChange={handleInputChange}
                        />
                        {errors.nombre && <div className="text-danger">{errors.nombre}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="categoria" className="form-label">Categoría</label>
                        <select
                            id="categoria"
                            name="categoria"
                            className="form-select"
                            value={product.categoria}
                            onChange={handleInputChange}
                        >
                            <option value="" disabled>Selecciona una categoría</option>
                            {Object.values(ProductCategory).map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        {errors.categoria && <div className="text-danger">{errors.categoria}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="precio" className="form-label">Precio</label>
                        <input
                            id="precio"
                            name="precio"
                            type="number"
                            className="form-control"
                            value={product.precio}
                            onChange={handleInputChange}
                        />
                        {errors.precio && <div className="text-danger">{errors.precio}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="estado" className="form-label">Estado</label>
                        <select
                            id="estado"
                            name="estado"
                            className="form-select"
                            value={product.estado || ''}
                            onChange={handleInputChange}
                        >
                            <option value="" disabled>Selecciona un estado</option>
                            {Object.values(ProductState).map((state) => (
                                <option key={state} value={state}>{state}</option>
                            ))}
                        </select>
                        {errors.estado && <div className="text-danger">{errors.estado}</div>}
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-outline-primary" onClick={() => navigate('/productos')}>
                            Volver
                        </button>
                        <button type="submit" className="btn btn-primary ms-auto">
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
