import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./orderSummary.css";

function OrderSummary() {
  const [reserva, setReserva] = useState(null);
  const [puntosUsados, setPuntosUsados] = useState(() => parseInt(sessionStorage.getItem("puntosUsados")) || 0);


  // Carga los datos de la reserva desde sessionStorage
  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("reservaData"));
    if (data) setReserva(data);
  }, []);
  // Actualiza los puntos usados cada 300ms
  useEffect(() => {
  const interval = setInterval(() => {
    const puntos = parseInt(sessionStorage.getItem("puntosUsados")) || 0;
    setPuntosUsados(puntos);
  }, 300);

  return () => clearInterval(interval);
}, []);


  if (!reserva) return <p>Cargando datos...</p>;

  const { room, checkIn, checkOut, adults, children } = reserva;

  const calcularNoches = (entrada, salida) => {
    const f1 = new Date(entrada);
    const f2 = new Date(salida);
    const diff = Math.abs(f2 - f1);
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const noches = calcularNoches(checkIn, checkOut);
  const tarifaHabitacion = (room.room_price * noches);
  const subtotal = tarifaHabitacion;
  const iva = subtotal * 0.21;
  let total = subtotal + iva;
  let descuento = 0;

  if (puntosUsados === 100) {
    descuento = total * 0.05;
  } else if (puntosUsados === 200) {
    descuento = total * 0.10;
  }

  total = total - descuento;


  const titulos = {
    "standard": "Habitación Estándar",
    "standard-family": "Habitación Familiar Estándar",
    "plus": "Habitación Brisa",
    "plus-family": "Habitación Familiar Brisa",
    "suite": "Suite de Lujo",
    "suite-family": "Suite Familiar de Lujo",
  };
  const titulo = titulos[room.room_type] || "Habitación No Definida";

  return (
    <Container className="resumen">
      <h3>Resumen de la reserva</h3>
      <hr />
      <img
        src={`src/assets/img/imgHabitaciones/rooms/${room.room_type}.jpg`}
        width="100%"
        alt="Habitación seleccionada"
        className="img-borde"
      />
      <Card className="resumenReserva">
        <Card.Body>
          <Row>
            <Col xs={6} className="mt-2"><strong>Tipo de habitación</strong></Col>
            <Col xs={6} className="mt-2">{titulo}</Col>
          </Row>
          <Row>
            <Col xs={6} className="mt-2"><strong>Fecha de entrada</strong></Col>
            <Col xs={6} className="mt-2">{checkIn}</Col>
          </Row>
          <Row>
            <Col xs={6} className="mt-2"><strong>Fecha de salida</strong></Col>
            <Col xs={6} className="mt-2">{checkOut}</Col>
          </Row>
          <Row>
            <Col xs={6} className="mt-2"><strong>Núm. Noches</strong></Col>
            <Col xs={6} className="mt-2">{noches}</Col>
          </Row>
          <Row>
            <Col xs={6} className="mt-2"><strong>Núm. Invitados</strong></Col>
            <Col xs={6} className="mt-2">
  {adults} {adults === 1 ? 'adulto' : 'adultos'}, {children} {children === 1 ? 'niño' : 'niños' }
</Col>
          </Row>
          <hr />
  
          <Row>
            <Col xs={6}><strong>Subtotal</strong></Col>
            <Col xs={6}>{subtotal.toFixed(2)}€</Col>
          </Row>
          <Row>
            <Col xs={6}><strong>IVA 21%</strong></Col>
            <Col xs={6}>{iva.toFixed(2)}€</Col>
          </Row>
          <hr />
                  {puntosUsados > 0 && (
          <Row>
            <Col xs={6}><strong>Descuento aplicado</strong><br /></Col>
            <Col xs={6}>- {descuento.toFixed(2)}€</Col>
            <hr />
            
          </Row>
          
        )}

        
          <Row>
            
            <Col xs={6}><h4><strong>Total</strong></h4></Col>
            <Col xs={6}><h4><strong>{total.toFixed(2)}€</strong></h4></Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default OrderSummary;
