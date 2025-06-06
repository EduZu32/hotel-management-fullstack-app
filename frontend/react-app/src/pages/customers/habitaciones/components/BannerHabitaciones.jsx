import "./bannerHabitaciones.css";
import { Container, Row, Col, Button } from "react-bootstrap";

function BannerHabitaciones() {
  return (
    <div className="banner-habitaciones" id="banner-habitaciones">
      <Container>
        <Row>
          <Col xs={12} md={8} className="contenido-banner">
            <h1>¿Necesitas unas vacaciones?</h1>
            <h3>Haz las maletas, es hora de desconectar</h3>
            <p>
              Es el momento de desconectar y disfrutar. Relájate en un entorno único, con el confort y la atención que mereces. 
            </p>
<a href="#buscador">
  <Button className="btn">Reservar Estancia</Button>
</a>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default BannerHabitaciones;