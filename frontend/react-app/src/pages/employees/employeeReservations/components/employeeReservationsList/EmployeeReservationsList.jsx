import PropTypes from "prop-types";
import { Container, Table } from "react-bootstrap";

export default function EmpReservationsList({ data, onRowClick }) {
  const formatDate = (isoDate) => {
    if (!isoDate) return "Fecha inválida";
    const date = new Date(isoDate);
    return date.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" });
  };
  const formattedData = data.map(res => ({
    idReserva: res.res_id?.toString() || res.idReserva,
    idRoom: res.res_room_id?.toString() || res.idRoom,
    nameRes: res.client_name || res.guest_name + " " + res.guest_lastname|| `Cliente ${res.res_client_id}`,
    dateIn: formatDate(res.res_checkin || res.dateIn),
    dateOut: formatDate(res.res_checkout || res.dateOut),
    state: res.res_is_closed
  ? "Reserva Cerrada"
  : res.res_is_checkout
  ? "Check Out Realizado"
  : res.res_is_checkin
  ? "Check In Realizado"
  : "Pendiente"

  }));

  return (
    <Container fluid className="p-0">
      <h2 className="mb-4">Gestión de Reservas</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nº Reserva</th>
            <th>Nº Habitación</th>
            <th>Nombre reserva</th>
            <th>Fecha Check In</th>
            <th>Fecha Check Out</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {formattedData.length > 0 ? (
            formattedData.map((row, rowIndex) => (
              <tr key={rowIndex} onClick={() => onRowClick(row)} style={{ cursor: 'pointer' }}>
                <td>{row.idReserva}</td>
                <td>{row.idRoom}</td>
                <td>{row.nameRes}</td>
                <td>{row.dateIn}</td>
                <td>{row.dateOut}</td>
                <td>{row.state}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No hay reservas disponibles</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

//Validación de PropTypes
EmpReservationsList.propTypes = {
  data: PropTypes.array.isRequired,
  onRowClick: PropTypes.func.isRequired,
};
