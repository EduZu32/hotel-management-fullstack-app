import { Container, Col, Row } from "react-bootstrap";
import GuestDetails from "./components/GuestDetails";
import OrderSummary from "./components/OrderSummary"
import "./datosReserva.css";

function DatosReserva() {

  return(
 <>
      <Container fluid className="container-datos">
  
        <Row>
          <Col xs={12} md={8} className="datos-invitado"> 
            <GuestDetails />
          </Col>

          <Col xs={12} md={3} className="panel-reserva">
           <OrderSummary />
          </Col>
        </Row>
      </Container>
    </>

  );
}

export default DatosReserva