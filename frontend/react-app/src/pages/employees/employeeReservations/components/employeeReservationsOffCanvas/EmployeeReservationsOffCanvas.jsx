import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Offcanvas, Form, Button, Row, Col } from 'react-bootstrap';
import axios from "axios";
import { FaDownload } from "react-icons/fa";


const mapEstadoReservaToBackend = (estado) => {
  switch (estado) {
    case "Check In Realizado": return "checkin";
    case "Check Out Realizado": return "checkout";
    case "Reserva Cerrada": return "closed";
    case "Pendiente": return "pending";
    default: return "pending";
  }
};

const mapEstadoReservaToFrontend = (estado) => {
  switch (estado) {
    case "checkin": return "Check In Realizado";
    case "checkout": return "Check Out Realizado";
    case "closed": return "Reserva Cerrada";
    case "pending": return "Pendiente";
    default: return "Estado de la reserva";
  }
};

export function EmpReservationOffCanvas({ show, onHide, reservation, onUpdate }) {
  const [reservaCargada, setReservaCargada] = useState(null);
  const [dateIn, setDateIn] = useState(null);
  const [dateOut, setDateOut] = useState(null);
  const [estadoReserva, setEstadoReserva] = useState("");
  const [clientData, setClientData] = useState({});
  const [observations, setObservations] = useState("");
  const [roomId, setRoomId] = useState("");
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);

  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    const fetchReservation = async () => {
      if (!reservation?.idReserva) return;
      const token = sessionStorage.getItem("Token");

      const response = await fetch(`http://localhost:3000/api/reservations/${reservation.idReserva}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error("No se pudo obtener la reserva");

      const data = await response.json();
      setReservaCargada(data);
      setDateIn(formatDate(data.res_checkin));
      setDateOut(formatDate(data.res_checkout));
      setEstadoReserva(mapEstadoReservaToFrontend(data.state));
      setObservations(data.res_observations || "");
      setRoomId(data.res_room_id || "");
      setClientData({
        client_id: data.client_id || data.guest_id || null,
        client_name: data.client_name || data.guest_name || "",
        client_surname_one: data.client_surname_one || data.guest_lastname || "",
        client_surname_two: data.client_surname_two || "",
        client_doc_type: data.client_doc_type || "",
        client_doc_id: data.client_doc_id || "",
        client_telephone: data.client_telephone || data.guest_phone || "",
        client_email: data.client_email || data.guest_email || ""
      });

    };

    fetchReservation();
  }, [reservation]);

  const handleClientChange = (e) => {
    const { name, value } = e.target;
    setClientData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      const token = sessionStorage.getItem("Token");
      const estadoParaBackend = mapEstadoReservaToBackend(estadoReserva);

      const formData = new FormData();
      formData.append("status", estadoParaBackend);
      formData.append("employeeId", 2);
      formData.append("checkin", dateIn);
      formData.append("checkout", dateOut);
      formData.append("observations", observations);
      formData.append("roomId", roomId);
      if (file1 instanceof File && file1.size > 0) formData.append("res_file_one", file1);
      if (file2 instanceof File && file2.size > 0) formData.append("res_file_two", file2);
      if (file3 instanceof File && file3.size > 0) formData.append("res_file_three", file3);

      await axios.put(
        `http://localhost:3000/api/reservations/${reservaCargada?.res_id}/status`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (reservaCargada?.client_id) {
        await axios.put(
          `http://localhost:3000/api/clients/${clientData.client_id}`,
          clientData,
          {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          }
        );
    }

      setFile1(null);
      setFile2(null);
      setFile3(null);

      if (onUpdate) onUpdate();
      onHide();
    } catch (error) {
      console.error("Error al guardar cambios de estado:", error);
    }
  };

  if (!reservation?.idReserva || !reservaCargada) return null;

  return (
    <Offcanvas show={show} onHide={onHide} placement="end" className="w-100">
      <Offcanvas.Header className="border-bottom" closeButton>
        <Col xs="2" className="m-1">
          <Offcanvas.Title>Reserva número: {reservaCargada?.res_id || ""}</Offcanvas.Title>
        </Col>
        <Col xs="2" className="m-1">
          <Offcanvas.Title>Estado: {estadoReserva || ""}</Offcanvas.Title>
        </Col>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form>
          <Row>
            <Col xs="auto">
              <Button variant="primary" onClick={handleSaveChanges}>Guardar Cambios</Button>
            </Col>
            <Col xs="auto">
              <Form.Select
                aria-label="Estado de la reserva"
                value={estadoReserva}
                onChange={(e) => setEstadoReserva(e.target.value)}
              >
                <option disabled>Estado de la reserva</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Check In Realizado">Check In Realizado</option>
                <option value="Check Out Realizado">Check Out Realizado</option>
                <option value="Reserva Cerrada">Reserva Cerrada</option>
              </Form.Select>
            </Col>
          </Row>

          <h3>Información del cliente:</h3>
          <Row className="align-items-center mb-3">
            <Col xs="auto">
              <Form.Group>
                <Form.Label>Nombre de cliente:</Form.Label>
                <Form.Control type="text" name="client_name" value={clientData.client_name || ""} onChange={handleClientChange} />
              </Form.Group>
            </Col>
            <Col xs="auto">
              <Form.Group>
                <Form.Label>1º apellido:</Form.Label>
                <Form.Control type="text" name="client_surname_one" value={clientData.client_surname_one || ""} onChange={handleClientChange} />
              </Form.Group>
            </Col>
            <Col xs="auto">
              <Form.Group>
                <Form.Label>2º apellido:</Form.Label>
                <Form.Control type="text" name="client_surname_two" value={clientData.client_surname_two || ""} onChange={handleClientChange} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="align-items-center border-bottom pb-3 mb-3">
            <Col xs="auto">
              <Form.Group>
                <Form.Label>Tipo de documento:</Form.Label>
                <Form.Control type="text" name="client_doc_type" value={clientData.client_doc_type || ""} onChange={handleClientChange} />
              </Form.Group>
            </Col>
            <Col xs="auto">
              <Form.Group>
                <Form.Label>Nº documento:</Form.Label>
                <Form.Control type="text" name="client_doc_id" value={clientData.client_doc_id || ""} onChange={handleClientChange} />
              </Form.Group>
            </Col>
            <Col xs="auto">
              <Form.Group>
                <Form.Label>Prefijo:</Form.Label>
                <Form.Control type="text" defaultValue="NO ESTA DEFINIDO" readOnly />
              </Form.Group>
            </Col>
            <Col xs="auto">
              <Form.Group>
                <Form.Label>Número de contacto:</Form.Label>
                <Form.Control type="text" name="client_telephone" value={clientData.client_telephone || ""} onChange={handleClientChange} />
              </Form.Group>
            </Col>
            <Col xs="auto">
              <Form.Group>
                <Form.Label>Email de contacto:</Form.Label>
                <Form.Control type="text" name="client_email" value={clientData.client_email || ""} onChange={handleClientChange} />
              </Form.Group>
            </Col>
          </Row>

          <h3>Información de la habitación</h3>
          <Row className="align-items-center border-bottom pb-3 mb-3">
            <Col xs="auto">
              <Form.Group>
                <Form.Label>Habitación asignada:</Form.Label>
                <Form.Control type="text" value={roomId || ""} onChange={(e) => setRoomId(e.target.value)} />
              </Form.Group>
            </Col>
            <Col xs="auto">
              <Form.Group>
                <Form.Label>Tipo de habitación:</Form.Label>
                <Form.Control type="text" defaultValue={reservaCargada?.room_type || ""} readOnly />
              </Form.Group>
            </Col>
            <Col xs="auto">
              <Form.Group>
                <Form.Label>Preferencia cama:</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={reservaCargada?.res_bed_preference || "No"}
                  readOnly
                />
              </Form.Group> 
            </Col>
          </Row>

          <Row>
            <Form.Group>
              <Form.Label>Observaciones:</Form.Label>
              <Form.Control type="text" value={observations} onChange={(e) => setObservations(e.target.value)} />
            </Form.Group>
          </Row>

          <h3 className="mt-4">Gestión de reserva:</h3>
          <Row className="align-items-center pb-3">
            <Col xs="auto">
              <Form.Group>
                <Form.Label>Fecha checkin:</Form.Label>
                <Form.Control type="date" value={dateIn || ""} onChange={(e) => setDateIn(e.target.value)} />
              </Form.Group>
            </Col>
            <Col xs="auto">
              <Form.Group>
                <Form.Label>Fecha checkout:</Form.Label>
                <Form.Control type="date" value={dateOut || ""} onChange={(e) => setDateOut(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="align-items-center border-bottom pb-3">
          <Col xs="auto">
          <Form.Group>
            <Form.Label>Subir documento 1:</Form.Label>
            <Form.Control type="file" onChange={(e) => setFile1(e.target.files[0])} />
            {reservaCargada?.res_file_one && (
              <a
                href={`http://localhost:3000/api/reservations/${reservaCargada.res_id}/download/res_file_one?token=${sessionStorage.getItem("Token")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ms-2 d-inline-block"
              >
                <FaDownload title="Descargar documento 1" />
              </a>
            )}
          </Form.Group>
        </Col>

        <Col xs="auto">
          <Form.Group>
            <Form.Label>Subir documento 2:</Form.Label>
            <Form.Control type="file" onChange={(e) => setFile2(e.target.files[0])} />
            {reservaCargada?.res_file_two && (
              <a
                href={`http://localhost:3000/api/reservations/${reservaCargada.res_id}/download/res_file_two?token=${sessionStorage.getItem("Token")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ms-2 d-inline-block"
              >
                <FaDownload title="Descargar documento 2" />
              </a>
            )}
          </Form.Group>
        </Col>

        <Col xs="auto">
          <Form.Group>
            <Form.Label>Subir documento 3:</Form.Label>
            <Form.Control type="file" onChange={(e) => setFile3(e.target.files[0])} />
            {reservaCargada?.res_file_three && (
              <a
                href={`http://localhost:3000/api/reservations/${reservaCargada.res_id}/download/res_file_three?token=${sessionStorage.getItem("Token")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ms-2 d-inline-block"
              >
                <FaDownload title="Descargar documento 3" />
              </a>
            )}
          </Form.Group>
        </Col>

          </Row>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

EmpReservationOffCanvas.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  reservation: PropTypes.shape({
    idReserva: PropTypes.string.isRequired,
  }),
  onUpdate: PropTypes.func,
};
