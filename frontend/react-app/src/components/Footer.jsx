import { Container, Row, Col } from 'react-bootstrap';
import { NavLink } from "react-router-dom";

import './footer.css';

function Footer() {
  return (
    <Container fluid className="footer">
      <Row className="d-flex justify-content-center text-center">
        <Col md={4}>
          <div className="d-flex justify-content-center align-items-center gap-2">
            <img src="src/assets/icons/direccion.png" width="24" className="icon mb-3" alt="Dirección" />
            <h3 className="h3-white mb-3">Dirección</h3>
          </div>
          <p className="p-white">C/ Playa Sol - 1234 <br /> Almería</p>
        </Col>

        <Col md={4}>
          <div className="d-flex justify-content-center align-items-center gap-2">
            <img src="src/assets/icons/horario.png" width="24" className="icon mb-3" alt="Horario de Atención" />
            <h3 className="h3-white mb-3">Horario de Atención</h3>
          </div>
          <p className="p-white">Lunes a Domingo <br /> 7 AM - 22 PM</p>
        </Col>

        <Col md={4}>
          <div className="d-flex justify-content-center align-items-center gap-2">
            <img src="src/assets/icons/telefono.png" width="24" className="icon mb-3" alt="Contacto" />
            <h3 className="h3-white mb-3">Contacto</h3>
          </div>
          <p className="p-white">912 34 56 78<br />info@dunasdeoro.com</p>
        </Col>
      </Row>
      <hr />
<div className='footer-terminos'> 
      <Row className="d-flex justify-content-center text-center">
        <Col md={4}>
          <div className="d-flex justify-content-center align-items-center gap-2">
            <NavLink to="/Aviso" className="custom-navlink">
            <p className="p-white">Aviso Legal</p>
            </NavLink>
          </div>
        </Col>

          <Col md={4}>
          <div className="d-flex justify-content-center align-items-center gap-2">
            <NavLink to="/Privacidad" className="custom-navlink">
            <p className="p-white">Política de Privacidad</p>
            </NavLink>
          </div>
        </Col>

      <Col md={4}>
          <div className="d-flex justify-content-center align-items-center gap-2">
            <NavLink to="/Condiciones" className="custom-navlink">
            <p className="p-white">Términos y Condiciones</p>
            </NavLink>
          </div>
        </Col>
      </Row>
      </div>
       <p className='p-white text-center copyright'> Copyright © {new Date().getFullYear()} Dunas de Oro Resort & Spa.</p>
    </Container>
  );
}

export default Footer;

