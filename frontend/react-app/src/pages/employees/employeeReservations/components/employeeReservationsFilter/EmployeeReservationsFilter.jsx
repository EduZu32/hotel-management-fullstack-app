import { useForm} from "react-hook-form";
import axios from "axios";
import {Button, Container, Navbar, Row, Col} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';




export default function EmpReservationsFilter({setFilteredData}){
  const { register, handleSubmit } = useForm();



  const onSubmit = async (data) => {
    try {
      const token = sessionStorage.getItem("Token");
  
      // Construimos filtros solo si están llenos
      const params = {};
      if (data.clientRoom) params.room = data.clientRoom;
      if (data.clientId) params.doc_id = data.clientId;
      if (data.clientName) params.name = data.clientName;
      if (data.clientDate) params.checkin = data.clientDate;
  
      const response = await axios.get("http://localhost:3000/api/reservations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params
      });
  
      //console.log("Reservas filtradas:", response.data);
      setFilteredData(response.data); // Actualiza el estado con los datos filtrados
  
    } catch (error) {
      console.error("Error al buscar reservas:", error);
      // Swal.fire("Error", "No se pudieron cargar las reservas", "error");
    }
  };
  
    return(
      <Container fluid>
        
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Navbar.Brand href="#home">Filtrar por:</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className='justify-content-end'>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row className="align-items-end">
  <Form.Group as={Col} className="mb-3" controlId="formRoom">
    <Form.Label>Nº de habitación:</Form.Label>
    <Form.Control type="text" {...register("clientRoom")} />
  </Form.Group>
  <Form.Group as={Col} className="mb-3" controlId="formId">
    <Form.Label>Documento identidad:</Form.Label>
    <Form.Control type="text" {...register("clientId")} />
  </Form.Group>
  <Form.Group as={Col} className="mb-3" controlId="formName">
    <Form.Label>Nombre de cliente:</Form.Label>
    <Form.Control type="text" placeholder="Introduce el nombre sin apellidos" {...register("clientName")} />
  </Form.Group>
  <Form.Group as={Col} className="mb-3" controlId="formDate">
    <Form.Label>Fecha checkIn:</Form.Label>
    <Form.Control type="date" {...register("clientDate")} />
  </Form.Group>
  <Col className="mb-3">
    <Button variant="primary" type="submit">Buscar</Button>
  </Col>
  <Col className="mb-3">
    <Button variant="secondary" onClick={() => window.location.href = "/employee/menu"}>
      Volver al menú
    </Button>
  </Col>
</Row>

            </Form>
          </Navbar.Collapse>
      </Navbar>
    </Container>
    )
}