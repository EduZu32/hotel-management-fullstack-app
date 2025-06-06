import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

function RoomDetails({ tipo, whiteIcons = false }) {
  const imgUrl = (name) =>
    `src/assets/icons/${name}${whiteIcons ? "-white" : ""}.png`;

  const icon = (imgName, text) => (
    <Col md={4} className="d-flex align-items-center">
      <img src={imgUrl(imgName)} width="10%" className="me-4" />
      <h4 className="mt-2"><b>{text}</b></h4>
    </Col>
  );

  const base = (
    <Row className="justify-content-center">
      {icon("piscina", "Acceso a Piscina")}
      {icon("desayuno", "Desayuno Incluído")}
      {icon("wifi", "Wifi Gratuíto")}
    </Row>
  );

  const plusExtras = (
    <Row className="justify-content-center mt-2">
      {icon("habitacionAmplia", "Habitación Amplia")}
      {icon("lavanderia", "Lavandería")}
      {icon("minibar", "Minibar")}
    </Row>
  );

  const suiteExtras = (
    <Row className="justify-content-center mt-2">
      {icon("wine", "Vino de cortesía")}
      {icon("terrace", "Terraza Privada")}
      {icon("cocina", "Cocina Propia")}
    </Row>
  );

  let includes;

  switch (tipo) {
    case "standard":
    case "standard-family":
      includes = base;
      break;

    case "plus":
    case "plus-family":
      includes = (
        <>
          {base}
          {plusExtras}
        </>
      );
      break;

    case "suite":
    case "suite-family":
      includes = (
        <>
          {base}
          {plusExtras}
          {suiteExtras}
        </>
      );
      break;

    default:
      includes = <p>Información adicional no disponible.</p>;
  }

  return includes;
}

RoomDetails.propTypes = {
  tipo: PropTypes.string.isRequired,
  whiteIcons: PropTypes.bool,
};

export default RoomDetails;
