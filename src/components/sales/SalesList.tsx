import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { getSalesWithClients } from '../../lib/sales/getSales';
import { Sale } from '../../types/sales';
import { printSale } from '../../utils/printSales';

const SalesList: React.FC = () => {
    const [sales, setSales] = useState<Sale[]>([]);

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const fetchedSales = await getSalesWithClients();
                setSales(fetchedSales);
            } catch (error) {
                console.error('Error al obtener ventas:', error);
            }
        };

        fetchSales();
    }, []);

    const handlePrintSale = (sale: Sale) => {
        printSale({
            id: sale.id,
            clienteNombre: sale.clienteNombre, // Asegúrate de que `clienteNombre` esté presente en los datos
            fecha: sale.fecha,
            estado: sale.estado,
            createdAt: sale.createdAt,
        });
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h4">Ventas</h1>
                <Link to={'/ventas/add-ventas'}>
                    <button className="btn btn-primary">Agregar Venta</button>
                </Link>
            </div>

            <div className="table-responsive shadow-sm rounded border">
                <Table striped bordered hover className="mb-0">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre del Cliente</th>
                            <th>Fecha</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.length > 0 ? (
                            sales.map(sale => (
                                <tr key={sale.id}>
                                    <td>{sale.id}</td>
                                    <td>{sale.clienteNombre}</td>
                                    <td>{sale.fecha?.toLocaleDateString() ?? 'Sin fecha'}</td>
                                    <td>{sale.estado}</td>
                                    <td>
                                        <button
                                            className="btn btn-success"
                                            onClick={() => handlePrintSale(sale)}
                                        >
                                            Imprimir venta
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center">No hay ventas disponibles</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default SalesList;
