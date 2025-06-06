import Formulario from "./components/Formulario";
import { Row, Col, Container } from "react-bootstrap"
import LoginRegistro from "./components/LoginRegistro";
import "./login.css"

function Login() {

  return(
    <Container>
    <Row>
      <Col>
<LoginRegistro />
</Col>
  <Col xs="auto" className="d-flex justify-content-center">
        <div className="vr mt-3" />
      </Col>
      <Col>
      
<Formulario />
</Col>

</Row>
</Container>
  );

}

export default Login