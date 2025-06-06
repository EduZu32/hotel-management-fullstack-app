import { Container } from "react-bootstrap";
import RoomCard from "./components/RoomCard";
import "./habitaciones.css";
import Cabecera from "../../../components/Cabecera";
import IntroHabitaciones from "./components/IntroHabitaciones";
import BannerHabitaciones from "./components/BannerHabitaciones";
import { useState, useEffect } from "react";

function Habitaciones() {
  const [tipos, setTipos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/rooms/types")
      .then((response) => {
        if (!response.ok) throw new Error("Error en la respuesta del servidor");
        return response.json();
      })
      .then((data) => {
        const datosFiltrados = data.map(
          ({ room_type, room_price, room_capacity }) => ({
            tipo: room_type,
            precio: room_price,
            capacidad: room_capacity,
          })
        );
        setTipos(datosFiltrados);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);

  const renderRoomCards = (roomTypes) => {
    return roomTypes.map((room, index) => (
      <div key={index}>
        <RoomCard
          precio={room.precio}
          capacidad={room.capacidad}
          tipo={room.tipo}
          whiteIcons={room.tipo === "suite" || room.tipo === "suite-family" || room.tipo === "standard" || room.tipo === "standard-family" ? "true" : undefined}
        />
        {index < roomTypes.length - 1 && <hr />}
      </div>
    ));
  };

  return (
    <div>
      <Cabecera nombre="Habitaciones" clase="cabecera-habitaciones" />
      <IntroHabitaciones />

      <Container fluid className="room-container">
        <Container className="habitaciones">
          <h1>Habitaciones funcionales y cómodas</h1>
          {renderRoomCards(
            tipos.filter((room) => room.tipo === "standard" || room.tipo === "standard-family")
          )}
        </Container>
      </Container>

      <Container className="habitaciones">
        <h1>Más espacio, más comodidad</h1>
        {renderRoomCards(
          tipos.filter((room) => room.tipo === "plus" || room.tipo === "plus-family")
        )}
      </Container>

      <Container fluid className="room-container">
        <Container className="habitaciones">
          <h1>La mejor experiencia de alojamiento</h1>
          {renderRoomCards(
            tipos.filter((room) => room.tipo === "suite" || room.tipo === "suite-family")
          )}
        </Container>
      </Container>
      <BannerHabitaciones />
    </div>
  );
}

export default Habitaciones;
