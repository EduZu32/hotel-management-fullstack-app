import "./bannerInicio.css";
import { Container, Row, Col, Button } from "react-bootstrap";

function BannerInicio() {
  return (
    <div className="banner-inicio" id="banner-inicio">
      <Container>
        <Row>
          <Col xs={12} md={8} className="contenido-banner">
            <h1>Descubre Almería</h1>
            <h3>Parque Natural Cabo de Gata</h3>
            <p>
              Nos encontramos en la prestigiosa zona del{" "}
              <b>Parque Natural de Cabo de Gata</b>, un paraíso único donde las
              dunas doradas se encuentran con aguas cristalinas, creando un
              auténtico oasis de <b>tranquilidad y belleza natural.</b>
            </p>
            <a href="#buscador">
              <Button variant="primary">Haz tu Reserva</Button>
            </a>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default BannerInicio;
