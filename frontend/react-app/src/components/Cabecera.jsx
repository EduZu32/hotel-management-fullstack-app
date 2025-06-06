import { Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

function Cabecera({nombre, clase}) {
  
  return(
  
        <header>
      <Container fluid className={clase}>
        <Row>
          <Col md={8} className="col-8">
            <h1>{nombre}</h1>
          </Col>
          </Row>
          </Container>
          </header>

  )
}

Cabecera.propTypes = {
  nombre: PropTypes.string.isRequired,
  clase: PropTypes.string.isRequired,

};

export default Cabecera