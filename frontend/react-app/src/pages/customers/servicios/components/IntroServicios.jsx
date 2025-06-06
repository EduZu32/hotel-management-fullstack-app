import { Container, Row, Col, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";


function IntroServicios() {
  return(
    <Container className="intro">
      <Row>
        <Col className="col">
          <img className="img-borde" src="src\assets\img\imgServicios\contenido\intro-servicios.jpg" alt="Zona Playa" width="100%" />
        </Col>

        <Col>
          <h1>El arte de desconectar</h1>
          <p>
            Sumérgete en un mundo de <b>bienestar</b> con nuestros masajes, tratamientos revitalizantes y circuitos de hidroterapia, pensados para renovar cuerpo y mente. 
           
             Y si buscas <b>aventura</b>, explora la naturaleza con nuestras excursiones, vive la emoción del kayak o descubre la belleza submarina a través del buceo.
          </p>
         
          <p>Puede reservar un servicio <b>a través de nuestro formulario de contacto o por llamada telefónica</b>, sujeto a disponibilidad. </p>
          <NavLink to="/contacto">
  <Button className="btn">Reservar Servicio</Button>
</NavLink>
          
        </Col>
      </Row>
    </Container>
  )
};

export default IntroServicios