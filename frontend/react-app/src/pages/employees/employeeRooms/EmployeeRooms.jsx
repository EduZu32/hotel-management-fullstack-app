import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Form, Button } from "react-bootstrap";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { EmpLoginNav } from './../components/employeeLoginNav/EmployeeLoginNav';
export default function EmpRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("todas");

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("Token");
      const response = await axios.get("http://localhost:3000/api/rooms", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRooms(response.data);
    } catch (error) {
      console.error("❌ Error al obtener habitaciones:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleToggleRoom = async (roomId, isEnabled) => {
    const token = sessionStorage.getItem("Token");
    const endpoint = isEnabled
      ? `http://localhost:3000/api/rooms/${roomId}/disable`
      : `http://localhost:3000/api/rooms/${roomId}/enable`;

    try {
      await axios.put(endpoint, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchRooms(); //Refrescar
    } catch (err) {
      console.error("Error al cambiar estado:", err);
      alert("Error al cambiar el estado de la habitación");
    }
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const filteredRooms = rooms.filter((room) => {
    if (filterStatus === "habilitadas") return room.room_is_enabled === 1;
    if (filterStatus === "deshabilitadas") return room.room_is_enabled === 0;
    return true;
  });

  const user = JSON.parse(sessionStorage.getItem("User"));
  const isManager = user?.role === "manager";


  return (
    <div className ="container-fluid">
      <EmpLoginNav></EmpLoginNav>
 <Container className="mt-4">
      <h2 className="mb-4 text-center">Gestión de Habitaciones</h2>
    <div className="mb-3 text-center">
      <Button variant="secondary" onClick={() => window.location.href = "/employee/menu"}>
        Volver al menú
      </Button>
    </div>
      <Form.Select
        value={filterStatus}
        onChange={handleFilterChange}
        className="mb-4 w-auto"
      >
        <option value="todas">Todas</option>
        <option value="habilitadas">Habilitadas</option>
        <option value="deshabilitadas">Deshabilitadas</option>
      </Form.Select>

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Row xs={1} sm={2} md={3} lg={4}>
          {filteredRooms.map((room) => (
            <Col key={room.room_id} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title className="text-capitalize">{room.room_type}</Card.Title>
                  <Card.Text>
                    ID: {room.room_id}<br />
                    Capacidad: {room.room_capacity}<br />
                    Hotel: {room.room_hotel_id}<br />
                    Estado:{" "}
                    {room.room_is_enabled ? (
                      <span className="text-success fw-bold">
                        Habilitada <FaCheckCircle />
                      </span>
                    ) : (
                      <span className="text-danger fw-bold">
                        Deshabilitada <FaTimesCircle />
                      </span>
                    )}<br />
                    Jacuzzi: {room.room_has_jacuzzi ? "Sí" : "No"}<br />
                    Balcón: {room.room_has_balcony ? "Sí" : "No"}<br />
                    Servicio incluido: {room.room_has_service ? "Sí" : "No"}<br />
                  </Card.Text>

                  {isManager && (
                    <Button
                      variant={room.room_is_enabled ? "danger" : "success"}
                      onClick={() => handleToggleRoom(room.room_id, room.room_is_enabled)}
                    >
                      {room.room_is_enabled ? (
                        <>Deshabilitar <FaTimesCircle /></>
                      ) : (
                        <>Habilitar <FaCheckCircle /></>
                      )}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>

    </div>
   
  );
}
