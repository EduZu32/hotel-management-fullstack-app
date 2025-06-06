import EstructuraUsuario from "../components/EstructuraUsuario";
import { Container } from "react-bootstrap";
import "./datos.css";

function Datos() {
  const client = JSON.parse(sessionStorage.getItem("clientUser"));

  return (
    <EstructuraUsuario>
      <Container>
        <h1>Mi Cuenta</h1>
        <Container className="datos-usuario">
          <h3>Datos personales</h3>
          <p><strong>Nombre:</strong></p>
          <p className="dato">{client?.name}</p>
          <p><strong>Apellidos:</strong></p>
          <p className="dato">{client?.surname_one} {client?.surname_two}</p>
          <p><strong>Teléfono:</strong></p>
          <p className="dato">{client?.telephone}</p>
          <p><strong>Email:</strong></p>
          <p className="dato">{client?.email}</p>

          <p className="mt-5">*Contacte con atención al cliente para modificar sus datos.</p>
        </Container>

      </Container>
    </EstructuraUsuario>
  );
}

export default Datos;

