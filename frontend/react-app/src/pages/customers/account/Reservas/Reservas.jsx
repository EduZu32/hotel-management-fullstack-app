import TablaReservas from "./components/TablaReservas";
import EstructuraUsuario from "../components/EstructuraUsuario";
import { Container } from "react-bootstrap";

function Reservas() {
  return (
    <EstructuraUsuario>
    <Container>
      <h1>Mis Reservas</h1>
      <TablaReservas />
    </Container>
  </EstructuraUsuario>
  
  );
}

export default Reservas;
