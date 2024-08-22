import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card } from 'react-bootstrap';

const AddSale: React.FC = () => {
    const [clientId, setClientId] = useState<number | ''>('');
    const [saleDate, setSaleDate] = useState<Date | null>(null);
    const [status, setStatus] = useState<'completado' | 'cancelado'>('completado');
    const navigate = useNavigate();

    const handleAddSale = () => {
        console.log('Sale added:', { clientId, saleDate, status });
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <Container className="mt-5">
            <Card>
                <Card.Body>
                    <Card.Title>Agregar Venta</Card.Title>
                    <Form>
                        <Form.Group className="mb-3" controlId="clientId">
                            <Form.Label>Cliente ID</Form.Label>
                            <Form.Control
                                type="number"
                                value={clientId}
                                onChange={(e) => setClientId(Number(e.target.value))}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="saleDate">
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control
                                type="date"
                                value={saleDate?.toISOString().substring(0, 10) || ''}
                                onChange={(e) => setSaleDate(new Date(e.target.value))}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="status">
                            <Form.Label>Estado</Form.Label>
                            <Form.Select
                                value={status}
                                onChange={(e) => setStatus(e.target.value as 'completado' | 'cancelado')}
                            >
                                <option value="completado">Completado</option>
                                <option value="cancelado">Cancelado</option>
                            </Form.Select>
                        </Form.Group>
                        <div className="d-flex justify-content-between">
                            <Button
                                variant="secondary"
                                onClick={handleBack}
                            >
                                Volver
                            </Button>
                            <Button
                                variant="primary"
                                onClick={handleAddSale}
                            >
                                Agregar Venta
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AddSale;
