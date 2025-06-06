import { Container, Accordion } from "react-bootstrap"
import { NavLink } from "react-router-dom";
import "./loginRegistro.css";

function LoginRegistro() {
return(
  <Container className="mt-5 mb-5">
<h1>Crear una cuenta</h1>
<p><strong>Como cliente registrado, disfrutarás de los siguientes beneficios:</strong></p>
<Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header>Programa de Recompensas y Puntos</Accordion.Header>
    <Accordion.Body>Acumula puntos con cada una de tus estancias y consigue descuentos increibles en tu próxima visita.</Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header>Mejoras y Beneficios en la Estancia</Accordion.Header>
    <Accordion.Body>Wi-Fi premium sin costo adicional y mejoras gratuítas de habitación según disponibilidad</Accordion.Body>
  </Accordion.Item>
    <Accordion.Item eventKey="2">
    <Accordion.Header>Consulta tus Reservas</Accordion.Header>
    <Accordion.Body>Haz tus reservas de forma más rápida y sencilla al guardar tus datos. También, podrás consultar el historial de tus reservas en todo momento.</Accordion.Body>
  </Accordion.Item>
</Accordion>
<NavLink to="/Registro">
<button className="btn mt-4">Crear una cuenta</button>
</NavLink>
  </Container>
);

}

export default LoginRegistro;