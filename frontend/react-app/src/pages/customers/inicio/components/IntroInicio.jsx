import "./introInicio.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function IntroInicio() {
  return (
    <Container className="intro">
      <Row>
        <Col className="col">
          <img className="imagen" src="src/assets/img/imgInicio/zona-playa.jpg" alt="Zona Playa" width="100%" />
        </Col>

        <Col className="texto-col">
          <h1>Un Oasis de Paz y Tranquilidad</h1>
          <p>
            En Dunas de Oro, cada detalle está diseñado para transportarte a un <b>refugio de calma y bienestar</b> en medio de un paraíso dorado.
            <br /><br />
            Nuestro hotel spa combina la belleza natural de las dunas con la tranquilidad de un oasis, ofreciéndote una <b>experiencia única</b> donde el lujo y la relajación se encuentran.
          </p>
          <NavLink to="/habitaciones">
            <Button className="btn">Ver Habitaciones</Button>
          </NavLink>
        </Col>
      </Row>
    </Container>
  );
}

export default IntroInicio;
