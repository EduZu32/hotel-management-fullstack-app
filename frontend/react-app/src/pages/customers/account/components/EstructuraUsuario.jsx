import { Container, Row, Col } from "react-bootstrap";
import PanelUsuario from "./PanelUsuario";
import "./estructuraUsuario.css";
import PropTypes from "prop-types";


function EstructuraUsuario({ children }) {
  return (
    <>
      <Container fluid className="container-datos">
        <Row>
          <Col xs={12} md={2} className="panel">
            <PanelUsuario />
          </Col>

          <Col xs={12} md={9} className="contenido-cliente">
            {children}
          </Col>
        </Row>
      </Container>
    </>
  );
}

EstructuraUsuario.propTypes = {
  children: PropTypes.node.isRequired,
};

export default EstructuraUsuario;
