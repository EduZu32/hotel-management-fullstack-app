import { NavLink } from "react-router-dom";
import "./menu.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import Logout from "./Logout";

function Menu() {
  const isLoggedIn = !!sessionStorage.getItem("clientToken");

  return (
    <Navbar expand="lg" bg="light" className="bg-body-tertiary menu">
      <Container fluid className="navbar-custom">
        <Navbar.Brand as={NavLink} to="/">
          <img src="/logotipo.png" width="60px" alt="Logo" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="navbar-nav w-100 justify-content-lg-center align-items-lg-center">
            <Nav.Link
              as={NavLink}
              to="/"
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              Inicio
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/habitaciones"
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              Habitaciones
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/servicios"
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              Servicios
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/contacto"
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              Contacto
            </Nav.Link>
          </Nav>
           {isLoggedIn && (
    <div className="logout-inline">
      <Logout />
    </div>
  )}
          {/* Ícono de usuario: visible */}
          <Nav className="ms-lg-auto mt-3 mt-lg-0">
          
            <NavLink to={isLoggedIn ? "/datos" : "/login"} className="nav-link">
              <img src="/user.png" width="30px" alt="Iniciar Sesión" className="user-icon" />
            </NavLink>
  
          </Nav>
        </Navbar.Collapse>
         
      </Container>
    </Navbar>
  );
}

export default Menu;
