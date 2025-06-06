import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";
import { Container, Form, Button, Col, Row } from 'react-bootstrap';

const alert = withReactContent(Swal);

function FormularioRegistro() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const [emailDuplicado, setEmailDuplicado] = useState(false);

  const onSubmit = async (data) => {
    setEmailDuplicado(false); // Reiniciar en cada intento

    const formattedData = {
      client_name: data.nombre,
      client_surname_one: data.primerApellido,
      client_surname_two: data.segundoApellido || "",
      client_telephone: data.telefono,
      client_email: data.correo,
      password: data.clave
    };

    try {
      const response = await axios.post("http://localhost:3000/api/clients", formattedData);

      if (response.status === 200 || response.status === 201) {
        alert.fire({
          title: 'Registro completado',
          text: 'Va a ser redirigido.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          customClass: { confirmButton: 'btn' }
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        });
      }
    } catch (error) {
      //console.error("Error en el registro:", error);

      if (error.response?.status === 409) {
        const mensaje = error.response.data?.error?.toLowerCase() || "";

        if (mensaje.includes("correo")) {
          setEmailDuplicado(true);
        }
      }
    }
  };

  return (
    <Container className="mt-5 mb-5">
      <h1 className="text-center">Formulario de Registro</h1>

      <Form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <Row>
          <Col md={6}>
            <Form.Group controlId="formNombre" className="mt-2">
              <Form.Control
                type="text"
                placeholder="Nombre *"
                {...register("nombre", { required: "Este campo es obligatorio" })}
              />
              {errors.nombre && <p className="text-danger">{errors.nombre.message}</p>}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formPrimerApellido" className="mt-2">
              <Form.Control
                type="text"
                placeholder="Primer Apellido *"
                {...register("primerApellido", { required: "Este campo es obligatorio" })}
              />
              {errors.primerApellido && <p className="text-danger">{errors.primerApellido.message}</p>}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="formSegundoApellido" className="mt-2">
              <Form.Control
                type="text"
                placeholder="Segundo Apellido"
                {...register("segundoApellido")}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formTelefono" className="mt-2">
              <Form.Control
                type="tel"
                placeholder="Teléfono *"
                {...register("telefono", { required: "Este campo es obligatorio" })}
              />
              {errors.telefono && <p className="text-danger">{errors.telefono.message}</p>}
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="formCorreo" className="mt-2">
          <Form.Control
            type="email"
            placeholder="Correo Electrónico *"
            {...register("correo", { required: "Este campo es obligatorio" })}
          />
          {errors.correo && <p className="text-danger">{errors.correo.message}</p>}
          {emailDuplicado && <p className="text-danger">Este correo ya está registrado</p>}
        </Form.Group>

    <Form.Group controlId="formClave" className="mt-2">
  <Form.Control
    type="password"
    placeholder="Contraseña *"
    {...register("clave", {
      required: "Este campo es obligatorio",
      minLength: {
        value: 8,
        message: "La contraseña debe tener al menos 8 caracteres"
      }
    })}
  />
  {errors.clave && <p className="text-danger">{errors.clave.message}</p>}
</Form.Group>

        <Button variant="primary" type="submit" className="mt-4 w-100">
          Registrarme
        </Button>
      </Form>
    </Container>
  );
}

export default FormularioRegistro;
