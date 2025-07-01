export function TicketPage() {
  const data = JSON.parse(sessionStorage.getItem('ultimoBoleto') || '{}');
  if (!data || !data.boletos || !data.boletos.length) {
    return `<h2>No hay información de boleto</h2>`;
  }
  const boleto = data.boletos[0];
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
        <div id="qrCode" class="ticket-qr"></div>
      </div>
      <button class="ticket-download-btn" onclick="descargarPDF()">Descargar en PDF</button>
      <script>
        setTimeout(() => {
          if (window.QRCode) {
            new QRCode(document.getElementById('qrCode'), {
              text: JSON.stringify(data),
              width: 100,
              height: 100
            });
          }
        }, 100);
        window.descargarPDF = function() {
          if (window.jspdf && window.jspdf.jsPDF) {
            const doc = new window.jspdf.jsPDF({orientation: 'portrait', unit: 'pt', format: [350, 500]});
            doc.html(document.getElementById('ticketCard'), {
              callback: function (doc) {
                doc.save('boleto.pdf');
              },
              x: 10,
              y: 10
            });
          }
        }
      </script>
    </div>
  `;
}