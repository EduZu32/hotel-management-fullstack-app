import { Container, Form, Button, Col, Row } from "react-bootstrap";
import { useState } from 'react';
import "./contacto.css";

function Contacto() {

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    message: '',
    reason: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:3000/api/contact/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          surname: formData.surname,
          email: formData.email,
          subject: formData.reason,
          content: formData.message,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Mensaje enviado correctamente");
        setFormData({
          name: '',
          surname: '',
          email: '',
          message: '',
          reason: ''
        });
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      alert("No se pudo enviar el mensaje. Inténtelo más tarde.");
    }
  };
  

  return(
<div>
  <Container fluid className="contenedor-contacto">
<Container>
  <h1 className="text-center">Formulario de Contacto</h1>
<p className="text-center"><b>Envíenos su mensaje y le contactaremos en un plazo máximo de 24 horas.</b></p>
  <Form onSubmit={handleSubmit} className="formulario-contacto">
        <Row>
          <Col xs={12} md={6}>
            <Form.Group controlId="formName">
              <Form.Control
                type="text"
                placeholder="Nombre *"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mb-3"
              />
            </Form.Group>
          </Col>

            <Col xs={12} md={6}>
            <Form.Group controlId="formSurname">
              <Form.Control
                type="text"
                placeholder="Apellidos *"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                required
                className="mb-3"
              />
            </Form.Group>
          </Col>
 </Row>
    
 <Row>
        <Col xs={12} md={6}>
            <Form.Group controlId="formEmail">
              <Form.Control
                type="email"
                placeholder="Correo electrónico *"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mb-3"
              />
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
<Form.Group controlId="formReason">
          <Form.Control
            as="select"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
            className="mb-3"
          >
            <option value="">-- Seleccione el motivo de su mensaje --</option>
            <option value="consulta">Consulta</option>
            <option value="soporte">Reservar un servicio</option>
            <option value="sugerencia">Sugerencia</option>
            <option value="queja">Quejas y Reclamaciones</option>
            <option value="otros">Otros</option>
          </Form.Control>
        </Form.Group>
          </Col>
        </Row>

        

        <Form.Group controlId="formMessage">
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Escribe tu mensaje"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="mb-3"
          />
        </Form.Group>

        <Button className="btn" type="submit">
          Enviar
        </Button>
      </Form>
      </Container>
  </Container>
</div>
  );

}


export default Contacto