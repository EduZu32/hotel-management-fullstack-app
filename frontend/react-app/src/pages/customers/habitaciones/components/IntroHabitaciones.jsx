import { Container, Row, Col } from "react-bootstrap";
import "./introHabitaciones.css";

function IntroHabitaciones() {
  return(
    <Container className="intro">
      <Row>
        <Col className="col">
          <img className="img-borde" src="src/assets/img/imgHabitaciones/contenido/intro-habitaciones.jpg" alt="Intro Habitaciones" width="100%"/>
        </Col>

        <Col>
          <h1>Descanso y exclusividad en cada rincón</h1>
          <p>
            En Dunas de Oro, cada habitación ha sido diseñada para brindarte el <b>máximo confort en un entorno paradisíaco.</b>
            <br /><br />
            Despierta con la brisa marina y el sonido de las olas en nuestras elegantes suites con vista al mar, relájate en espacios pensados para el descanso y <b>disfruta de una experiencia</b> única en nuestro resort spa. <br /><br />Descubre la combinación perfecta de lujo, naturaleza y tranquilidad.
          </p>
        </Col>
      </Row>
    </Container>
  )
};

export default IntroHabitaciones