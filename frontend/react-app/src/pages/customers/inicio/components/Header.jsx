import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import './header.css';

function Header() {
useEffect(() => {
    const cabecera = document.querySelector(".cabecera");
  
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (window.innerWidth > 913 && cabecera) {
 
        cabecera.style.backgroundPositionY = `${-scrollY * 0.2}px`;
      } else {
     
        if (cabecera) {
          cabecera.style.backgroundPositionY = "center top"; // Fondo fijo en móviles
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header>
      <Container fluid className="cabecera" id="cabecera">
        <Row>
          <Col md={8} className="col-8">
            <h1>Dunas de Oro</h1>
            <div className="d-flex flex-row gap-2">
              <h2>Resort</h2>
              <h2 className="h2-white">&</h2>
              <h2>Spa</h2>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Header;
