import EstructuraUsuario from "../components/EstructuraUsuario";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./datos.css";

function Datos() {
  const client = JSON.parse(sessionStorage.getItem("clientUser"));

  return (
    <EstructuraUsuario>
      <Container>
        <h1 className="mb-4">Mi Cuenta</h1>
        <Card className="p-4 shadow-sm">
          <h3 className="mb-4">Datos personales</h3>
          <Row className="mb-3">
            <Col md={4}><strong>Nombre:</strong></Col>
            <Col md={8} className="dato">{client?.name}</Col>
          </Row>
          <Row className="mb-3">
            <Col md={4}><strong>Apellidos:</strong></Col>
            <Col md={8} className="dato">{client?.surname_one} {client?.surname_two}</Col>
          </Row>
          <Row className="mb-3">
            <Col md={4}><strong>Teléfono:</strong></Col>
            <Col md={8} className="dato">{client?.telephone}</Col>
          </Row>
          <Row className="mb-3">
            <Col md={4}><strong>Email:</strong></Col>
            <Col md={8} className="dato">{client?.email}</Col>
          </Row>
          <p className="mt-4 text-muted">
            *Contacte con atención al cliente para modificar sus datos.
          </p>
        </Card>
      </Container>
    </EstructuraUsuario>
  );
}

export default Datos;
