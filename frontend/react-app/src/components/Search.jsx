import { useState, useRef, useEffect } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import "./search.css";
import HuespedesSelector from "./HuespedesSelector";

function Search() {
  const navigate = useNavigate(); 
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);
  const [huespedes, setHuespedes] = useState({ adultos: 1, ninos: 0, bebes: 0 });

  const handleDateClick = () => {
    setShowCalendar(prev => !prev);
  };

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setShowCalendar(false);
      }
    });
    return () => document.removeEventListener("mousedown", handleDateClick);
  }, []);

  const formatDate = (date) => {
    const localDate = new Date(date);
    localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
    const day = localDate.getDate().toString().padStart(2, "0");
    const month = (localDate.getMonth() + 1).toString().padStart(2, "0");
    const year = localDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const toISOStringDate = (date) => {
    const d = new Date(date);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().split("T")[0];
  };

  const handleSearch = () => {
    const checkIn = toISOStringDate(state[0].startDate);
    const checkOut = toISOStringDate(state[0].endDate);
    const { adultos, ninos } = huespedes;

    sessionStorage.setItem("checkin", checkIn);
    sessionStorage.setItem("checkout", checkOut);

   //console.log("Parámetros enviados a la URL:", { checkIn, checkOut, adultos, ninos });

    navigate(`/search?checkIn=${checkIn}&checkOut=${checkOut}&adults=${adultos}&children=${ninos}`);
  };

  return (
    <Container fluid className="buscador" id="buscador">
      <Form className="w-100">
        <Row className="align-items-end flex-wrap gy-3">
          <Col xs={12} sm={6} md={3}>
            <Form.Group className="d-flex align-items-center gap-2">
              <Form.Label className="mb-0 label"><h5 className="mb-0">Llegada</h5></Form.Label>
              <Form.Control
                type="text"
                placeholder="Seleccionar fecha"
                onClick={() => handleDateClick('checkin')}
                value={state[0].startDate ? formatDate(state[0].startDate) : ''}
                readOnly
              />
            </Form.Group>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <Form.Group className="d-flex align-items-center gap-2">
              <Form.Label className="mb-0 label"><h5 className="mb-0">Salida</h5></Form.Label>
              <Form.Control
                type="text"
                placeholder="Seleccionar fecha"
                onClick={() => handleDateClick('checkout')}
                value={formatDate(state[0].endDate)}
                readOnly
              />
            </Form.Group>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <Form.Group className="d-flex align-items-center gap-2">
              <Form.Label className="mb-0 label"><h5 className="mb-0">Huéspedes</h5></Form.Label>
              <div className="w-100">
                <HuespedesSelector huespedes={huespedes} setHuespedes={setHuespedes} />
              </div>
            </Form.Group>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <Button className="w-100" onClick={handleSearch}>
              Buscar
            </Button>
          </Col>
        </Row>
      </Form>

{showCalendar && (
  <div ref={calendarRef} className="calendar-container mt-3">
    <DateRange
      editableDateInputs={true}
      onChange={item => {
        const { startDate, endDate } = item.selection;
        const today = new Date();
        const oneDay = 24 * 60 * 60 * 1000;

        // No permitir fechas pasadas
        const validStartDate = startDate < today ? today : startDate;

        // Asegurar que la fecha de salida sea posterior
        const validEndDate = endDate <= validStartDate
          ? new Date(validStartDate.getTime() + oneDay)
          : endDate;

        setState([{ ...item.selection, startDate: validStartDate, endDate: validEndDate }]);
      }}
      moveRangeOnFirstSelection={false}
      ranges={state}
      showDateDisplay={false}
      minDate={new Date()} // Evitar fechas anteriores a la fecha actual
    />
    <Button className="btn-listo mt-2" onClick={() => setShowCalendar(false)}>Listo</Button>
  </div>
)}

    </Container>
  );
}

export default Search;
