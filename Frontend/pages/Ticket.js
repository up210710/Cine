export function TicketPage() {
  const data = JSON.parse(sessionStorage.getItem('ultimoBoleto') || '{}');
  if (!data || !data.boletos || !data.boletos.length) {
    return `<h2>No hay información de boleto</h2>`;
  }
  const boleto = data.boletos[0];
  setTimeout(() => {
    window.descargarPDF = function() {
      if (window.jspdf && window.jspdf.jsPDF) {
        const doc = new window.jspdf.jsPDF({orientation: 'portrait', unit: 'pt', format: [350, 500]});
        // Fondo y recuadro principal
        doc.setFillColor('#232946');
        doc.rect(0, 0, 350, 500, 'F');
        doc.setFillColor('#121629');
        doc.roundedRect(20, 30, 310, 440, 18, 18, 'F');
        doc.setDrawColor('#ff9800');
        doc.setLineWidth(3);
        doc.roundedRect(20, 30, 310, 440, 18, 18, 'S');
        // Título
        doc.setTextColor('#ffe066');
        doc.setFontSize(24);
        doc.setFont('helvetica', 'bold');
        doc.text('CineApp', 175, 70, {align: 'center'});
        doc.setFontSize(16);
        doc.setTextColor('#fff');
        doc.setFont('helvetica', 'normal');
        doc.text('Boleto de Cine', 175, 100, {align: 'center'});
        // Línea separadora
        doc.setDrawColor('#ff9800');
        doc.setLineWidth(1);
        doc.line(50, 115, 300, 115);
        // Datos
        let y = 150;
        doc.setFontSize(13);
        doc.setTextColor('#ffe066');
        doc.text('Película:', 50, y);
        doc.setTextColor('#fff');
        doc.setFont('helvetica', 'bold');
        doc.text(`${data.pelicula.titulo || ''}`, 140, y);
        doc.setFont('helvetica', 'normal');
        y += 30;
        doc.setTextColor('#ffe066');
        doc.text('Fecha y hora:', 50, y);
        doc.setTextColor('#fff');
        doc.setFont('helvetica', 'bold');
        doc.text(`${boleto.horario || ''}`, 140, y);
        doc.setFont('helvetica', 'normal');
        y += 30;
        doc.setTextColor('#ffe066');
        doc.text('Sala:', 50, y);
        doc.setTextColor('#fff');
        doc.setFont('helvetica', 'bold');
        doc.text(`${boleto.sala || ''}`, 140, y);
        doc.setFont('helvetica', 'normal');
        y += 30;
        doc.setTextColor('#ffe066');
        doc.text('Asientos:', 50, y);
        doc.setTextColor('#fff');
        doc.setFont('helvetica', 'bold');
        doc.text(`${(data.boletos || []).map(b => `${b.fila || ''}${b.numero || ''}`).join(', ')}`, 140, y);
        doc.setFont('helvetica', 'normal');
        y += 30;
        doc.setTextColor('#ffe066');
        doc.text('Número de boletos:', 50, y);
        doc.setTextColor('#fff');
        doc.setFont('helvetica', 'bold');
        doc.text(`${(data.boletos || []).length}`, 180, y);
        doc.setFont('helvetica', 'normal');
        y += 30;
        doc.setTextColor('#ffe066');
        doc.text('Precio total:', 50, y);
        doc.setTextColor('#fff');
        doc.setFont('helvetica', 'bold');
        doc.text(`$${data.precioTotal || ''}`, 140, y);
        // Pie de página
        doc.setFont('helvetica', 'normal');
        doc.setTextColor('#ff9800');
        doc.setFontSize(11);
        doc.text('¡Gracias por tu compra! Disfruta la función.', 175, 450, {align: 'center'});
        doc.save('boleto.pdf');
      }
    };
  }, 100);
  return `
    <div class="ticket-container">
      <div class="ticket-card" id="ticketCard">
        <img src="${data.pelicula.imagen}" alt="${data.pelicula.titulo}" class="ticket-img">
        <div class="ticket-info">
          <h2>${data.pelicula.titulo}</h2>
          <p><strong>Fecha y hora:</strong> ${boleto.horario}</p>
          <p><strong>Sala:</strong> ${boleto.sala}</p>
          <p><strong>Asientos:</strong> ${data.boletos.map(b => `${b.fila}${b.numero}`).join(', ')}</p>
          <p><strong>Número de boletos:</strong> ${data.boletos.length}</p>
          <p><strong>Precio total:</strong> $${data.precioTotal}</p>
        </div>
      </div>
      <button class="ticket-download-btn" onclick="descargarPDF()">Descargar en PDF</button>
    </div>
  `;
}