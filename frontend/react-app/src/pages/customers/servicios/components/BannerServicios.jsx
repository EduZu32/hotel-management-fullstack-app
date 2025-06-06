import "./bannerServicios.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function BannerServicios() {
  return (
    <div className="banner-servicios" id="banner-servicios">
      <Container>
        <Row>
           <Col xs={12} md={8} className="contenido-banner">
            <h1>Disfruta más pagando menos</h1>
            <h3>Oferta para nuestros huéspedes</h3>
            <p>
              Disfruta de una experiencia inigualable con nuestra selección de servicios premium.
Además, por alojarte con nosotros, <b>obtén un 5% de descuento en todos los servicios del resort</b>. Relájate, desconéctate y déjate consentir.
            </p>
                      <NavLink to="/contacto">
  <Button className="btn">Reservar Servicio</Button>
</NavLink>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default BannerServicios;