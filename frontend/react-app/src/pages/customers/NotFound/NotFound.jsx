import { Container, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function NotFound() {

  return(
<Container className="d-flex justify-content-center align-items-center flex-column mt-5">
<h1>Página no encontrada</h1>
<h3 className="text-center">No hemos podido encontrar la página que estabas buscando o no se encuentra disponible en estos momentos.</h3>
<NavLink to="/">
<Button className="btn justify-center mt-5 mb-5">Volver al Inicio</Button>
</NavLink>
</Container>
  );
}

export default NotFound