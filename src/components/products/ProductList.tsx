import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Dropdown, DropdownButton } from 'react-bootstrap';
import { getAllProducts } from '../../lib/products/getProducts';
import { Product } from '../../types/products';

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedActions, setSelectedActions] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await getAllProducts();
                setProducts(fetchedProducts);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleActionChange = (productId: number, eventKey: string | null) => {
        if (eventKey) {
            setSelectedActions(prevState => ({
                ...prevState,
                [productId]: eventKey,
            }));
            // Aquí puedes manejar la lógica para la acción seleccionada
        }
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h4">Productos</h1>
                <Link to={'/productos/add_products'}>
                    <button className="btn btn-primary">Agregar Producto</button>
                </Link>
            </div>

            <div className="table-responsive shadow-sm rounded border">
                <Table striped bordered hover className="mb-0">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map(product => (
                                <tr key={product.id}>
                                    <td>{product.nombre}</td>
                                    <td>{product.categoria}</td>
                                    <td>S/ {product.precio.toFixed(2)}</td>
                                    <td>{product.estado}</td>
                                    <td>
                                        <DropdownButton
                                            id={`dropdown-${product.id}`}
                                            title={selectedActions[product.id] || 'Acciones'}
                                            onSelect={(eventKey) => handleActionChange(product.id, eventKey)}
                                        >
                                            <Dropdown.Item as={Link} to={`/productos/product-edit/${product.id}`}>
                                                Editar
                                            </Dropdown.Item>
                                        </DropdownButton>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center">No hay productos disponibles</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default ProductList;
