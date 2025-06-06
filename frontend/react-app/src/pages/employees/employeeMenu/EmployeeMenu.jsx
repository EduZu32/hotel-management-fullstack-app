import {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Image, Card, Button, Carousel} from "react-bootstrap";
import { EmpLoginNav } from "../components/employeeLoginNav/EmployeeLoginNav";
import EmpBackground from "../components/employeeBackground/EmpBackground";
import styles from "./EmployeeMenu.module.css";
const EmployeeMenu = ()=> {
  const navigate = useNavigate();


const menuItems = [
  {
    title: "Gestionar reservas",
    image: "/src/assets/img/imgEmpleados/menu/manage_res.jpg",
    route: "/employee/menu/reservations",
  },
  {
    title: "Gestionar habitaciones",
    image: "/src/assets/img/imgEmpleados/menu/manage_room.jpg",
    route: "/employee/menu/rooms",
  },
  {
    title: "Gestionar empleados",
    image: "/src/assets/img/imgEmpleados/menu/manage_em.jpg",
    route: "/employee/menu/employees",
  },
];
  
return (
  <Container fluid className="p-0 m-0 w-100">
    <EmpLoginNav />
    <div
      style={{
        height: 'calc(100vh - 41px)', // ajusta si tu nav mide distinto
        overflow: 'hidden',
      }}
    >
      <Carousel fade className="w-100 h-100" data-bs-theme="dark" interval={null}>
        {menuItems.map((item, idx) => (
          <Carousel.Item
          key={idx}
          className="position-relative d-flex align-items-center justify-content-center"
          style={{
            height: '100vh',
            backgroundImage: `url(${item.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Overlay oscuro translúcido */}
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.4)', // opacidad ajustable
              zIndex: 1,
            }}
          ></div>
        
          {/* Contenido centrado */}
          <div
            className="text-center"
            style={{ cursor: 'pointer', zIndex: 2 }}
            onClick={() => navigate(item.route)}
          >
            <h3 className={styles.carouselTitle}>{item.title}</h3>
          </div>
        </Carousel.Item>
        
        ))}
      </Carousel>
    </div>
  </Container>
);

}

export default EmployeeMenu;  