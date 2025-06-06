import { Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import RoomDetails from "./RoomDetails";
import "./roomCard.css";

function RoomCard({ precio, capacidad, tipo, compacto = false, whiteIcons = false }) {

  const titulos = {
    "standard": "Habitación Estándar",
    "standard-family": "Habitación Familiar Estándar",
    "plus": "Habitación Brisa",
    "plus-family": "Habitación Familiar Brisa",
    "suite": "Suite de Lujo",
    "suite-family": "Suite Familiar de Lujo",
  };
  const titulo = titulos[tipo] || "Habitación No Definida";

      const descripciones = {
    "standard": "Una opción sencilla y acogedora, ideal para quienes buscan comodidad sin complicaciones. Equipada con todo lo esencial para una estancia agradable a un precio accesible.",
    "standard-family": "El espacio perfecto para compartir en familia. Amplia, confortable y equipada con todo lo necesario para una estancia placentera. Disponemos de cunas bajo solicitud.",
    "plus": "Un refugio espacioso con un diseño moderno y elegante. Perfecta para quienes buscan un ambiente acogedor con un toque de estilo.",
    "plus-family": "Un habitación con espacio y camas extra, con un aire elegante y de modernidad. Perfecta para familiar o grupos que buscan una habitación con extra en comfort, lujo y espacio.",
    "suite": "Lujo y confort con vistas al mar. Esta amplia suite cuenta con terraza privada, sala de estar y una cocina totalmente equipada para una experiencia inigualable.",
    "suite-family": "Nuestra suite más exclusiva, diseñada para quienes buscan el máximo confort. Dispone de dos dormitorios independientes, sala de estar, cocina equipada y una terraza privada con vistas espectaculares.",
  };

    const descripcion = descripciones[tipo] || "Información no disponible."

    const imagenUrl = `src/assets/img/imgHabitaciones/rooms/${tipo}.jpg`

  return (
    <Container className="room">
      <Row>
        <Col xs={12} md={4} className="room-imagen d-flex align-items-center">
          <img src={imagenUrl} width="100%" alt={titulo} className="img-effect" />
        </Col>
        <Col xs={12} md={8} className="room-text d-flex align-items-center">
          <div>
            <h3>{titulo}</h3>
            {!compacto && <p>{descripcion}</p>}
            {!compacto && <RoomDetails tipo={tipo} whiteIcons={whiteIcons} />}
         <p><b>Precio:</b> desde {precio}€ por noche | <b>Capacidad:</b> {capacidad}</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

RoomCard.propTypes = {
  precio: PropTypes.number.isRequired,
  capacidad: PropTypes.string.isRequired,
  descripcion: PropTypes.string,
  imagenUrl: PropTypes.string.isRequired,
  tipo: PropTypes.string.isRequired,
  compacto: PropTypes.bool,
  whiteIcons: PropTypes.bool,
};

export default RoomCard;