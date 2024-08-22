import jsPDF from 'jspdf';

interface SaleDetails {
    id: number;
    clienteNombre: string;
    fecha: Date | null;
    estado: string;
    createdAt: Date | null;
}

export const printSale = (sale: SaleDetails) => {
    const doc = new jsPDF();
    
    // Título
    doc.setFontSize(18);
    doc.setFont('Helvetica', 'bold');
    doc.text('Venta', 10, 10);
    
    // Detalles de la venta
    doc.setFontSize(12);
    doc.setFont('Helvetica', 'normal');
    doc.text(`ID: ${sale.id}`, 10, 20);
    doc.text(`Cliente: ${sale.clienteNombre}`, 10, 30);
    doc.text(`Fecha: ${sale.fecha ? sale.fecha.toLocaleDateString() : 'Sin fecha'}`, 10, 40);
    doc.text(`Estado: ${sale.estado}`, 10, 50);
    doc.text(`Creado en: ${sale.createdAt ? sale.createdAt.toLocaleDateString() : 'Sin fecha'}`, 10, 60);
    
    // Línea horizontal para separación
    doc.setDrawColor(0, 0, 0);
    doc.line(10, 65, 200, 65);
    
    // Espacio para una firma
    doc.text('Firma:', 10, 80);
    doc.line(30, 77, 100, 77); // Línea para la firma
    
    // Pie de página
    doc.setFontSize(10);
    doc.text('Gracias por su compra.', 10, 290);
    doc.text('www.ejemplo.com', 10, 300);
    
    // Guardar el PDF
    doc.save(`venta_${sale.id}.pdf`);
};
