import PropTypes from "prop-types";
import { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./ventanaPago.css";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const VentanaPago = ({ guestData, room, checkIn, checkOut }) => {
  const [show, setShow] = useState(false);
  const [sending, setSending] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    const cardNumberTest = cardNumber.replace(/\s/g, '');
     if (!/^\d{13,19}$/.test(cardNumberTest)) {
      Swal.fire({
        title: "Error",
        text: "El número de tarjeta debe tener entre 13 y 19 dígitos.",
        icon: "error",
        confirmButtonText: "Aceptar",
        customClass: { confirmButton: "btn" }
      });
      return;
    }

    if (!/^\d{3}$/.test(cvv)) {
       Swal.fire({
        title: "Error",
        text: "El CVC debe tener 3 dígitos.",
        icon: "error",
        confirmButtonText: "Aceptar",
        customClass: { confirmButton: "btn" }
      });
      return;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      Swal.fire({
        title: "Error",
        text: "La fecha de expiración debe estar en formato MM/YY.",
        icon: "error",
        confirmButtonText: "Aceptar",
        customClass: { confirmButton: "btn" }
      });
      return;
    }

    const [mes, año] = expiryDate.split('/').map(Number);
    const fechaActual = new Date();
    const añoActual = fechaActual.getFullYear() % 100;
    const mesActual = fechaActual.getMonth() + 1;

    if (año < añoActual || (año === añoActual && mes < mesActual)) {
      Swal.fire({
        title: "Error",
        text: "La tarjeta está caducada.",
        icon: "error",
        confirmButtonText: "Aceptar",
        customClass: { confirmButton: "btn" }
      });
      return;
    }

    setSending(true);

    if (!guestData.surname_one || !guestData.email || !guestData.phone || !guestData.bed_type) {
      Swal.fire({
        title: "Datos incompletos",
        text: "Por favor, completa todos los datos del invitado.",
        icon: "warning",
        confirmButtonText: "Aceptar",
        customClass: { confirmButton: "btn" }
      });
      setSending(false);
      return;
    }

try {
    const empId = 2;
    const reservaData = JSON.parse(sessionStorage.getItem("reservaData")) || {};
    //console.log("reservaData desde sessionStorage:", reservaData);
    //console.log("Adults:", reservaData.adults, "Children:", reservaData.children);

    const selectedRoom = room || reservaData.room;
    const entrada = checkIn || reservaData.checkIn;
    const salida = checkOut || reservaData.checkOut;
    const nights = Math.ceil((new Date(salida) - new Date(entrada)) / (1000 * 60 * 60 * 24));

    const tarifaHabitacion = selectedRoom.room_price * nights;
    const subtotal = tarifaHabitacion;
    const iva = subtotal * 0.21;
    let total = subtotal + iva;

    const payload = {
      res_room_id: selectedRoom.room_id,
      res_room_hotel_id: selectedRoom.room_hotel_id || 1,
      res_checkin: entrada,
      res_checkout: salida,
      res_checkin_by: empId,
      res_checkout_by: empId,
      res_observations: guestData.comment || "",
      res_adults: parseInt(reservaData.adults) || 1,
      res_children: parseInt(reservaData.children) || 0,
      res_bed_preference: guestData.bed_type || "Cama Individual",
      invoiceData: {
        invoice_total_price: total.toFixed(2),
        invoice_details: `Habitación ${selectedRoom.room_type}, ${nights} noches`,
        invoice_pay_method: "Tarjeta",
        invoice_points_used: parseInt(sessionStorage.getItem("puntosUsados")) || 0
      }
    };

    const token = sessionStorage.getItem("clientToken");
    const isClient = !!token;

    let endpoint = "http://localhost:3000/api/reservations/guest";
    let headers = {};

    if (isClient) {
      endpoint = "http://localhost:3000/api/reservations/client";
      headers = { Authorization: `Bearer ${token}` };
    } else {
      payload.guest_name = guestData.name;
      payload.guest_lastname = guestData.surname_one || "Sin Apellido";
      payload.guest_email = guestData.email || "no-email@hotel.com";
      payload.guest_phone = guestData.phone || "000000000";
      payload.guest_preferences = guestData.bed_type || "individual";
    }

      await axios.post(endpoint, payload, { headers });

    Swal.fire({
      icon: "success",
      title: "Reserva confirmada",
      text: "Pronto recibirá un email con los detalles de su reserva.",
      confirmButtonText: "Aceptar",
      customClass: {
        confirmButton: 'btn'
      }
    }).then(() => {
      setCardNumber("");
      setExpiryDate("");
      setCvv("");

      Object.keys(sessionStorage).forEach(key => {
        if (!["clientUser", "clientToken"].includes(key)) {
          sessionStorage.removeItem(key);
        }
      });

      handleClose();
      navigate("/");
    });

  } catch (error) {
    console.error("Error creando la reserva:", error.response?.data || error.message);
    Swal.fire({
      title: "No se ha podido hacer la reserva",
      text: "Error creando la reserva. Contacte con atención al cliente.",
      icon: "error",
      confirmButtonText: "Aceptar",
      customClass: { confirmButton: "btn" }
    });
  } finally {
    setSending(false);
  }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Proceder con el Pago
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className="custom-modal-header">
          <Modal.Title>Pago con Tarjeta</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h5>Detalles de Pago</h5>
          <Form onSubmit={handlePaymentSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre en la tarjeta</Form.Label>
              <Form.Control type="text" placeholder="Ej: Juan Pérez" required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Número de tarjeta
                <img src="src/assets/img/imgVentanaPago/pago.png" width="30%" alt="tarjetas" />
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="**** **** **** ****"
                maxLength="19"
                required
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value.replace(/[^\d]/g, ""))}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha de Expiración</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="MM/YY"
                    maxLength="5"
                    required
                    value={expiryDate}
                    onChange={(e) => {
                      let input = e.target.value.replace(/\D/g, "");
                      if (input.length >= 3) {
                        input = input.slice(0, 2) + "/" + input.slice(2, 4);
                      }
                      setExpiryDate(input);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>CVC</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="123"
                    maxLength="3"
                    required
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="success" className="w-100" type="submit" disabled={sending}>
              {sending ? "Procesando..." : "Pagar Ahora"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default VentanaPago;

VentanaPago.propTypes = {
  guestData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    surname_one: PropTypes.string.isRequired,
    surname_two: PropTypes.string,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    bed_type: PropTypes.string.isRequired,
    comment: PropTypes.string
  }).isRequired,
  room: PropTypes.object,
  checkIn: PropTypes.string,
  checkOut: PropTypes.string
};
