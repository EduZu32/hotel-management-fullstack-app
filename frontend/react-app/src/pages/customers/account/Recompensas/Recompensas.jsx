import EstructuraUsuario from "../components/EstructuraUsuario";
import PuntosAcumulados from "./components/PuntosAcumulados";
import { Container } from "react-bootstrap";

function Recompensas() {
  return (
    <EstructuraUsuario>
      <Container>
        <h1>Tus Recompensas</h1>
        <p>Acumula puntos con cada una de tus reservas. Actualmente dispones de:</p>
        <PuntosAcumulados />
      </Container>
    </EstructuraUsuario>
  );
}

export default Recompensas;
