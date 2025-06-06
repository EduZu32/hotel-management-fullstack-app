import { Container, Row, Col } from "react-bootstrap";
import "./nuestrosServicios.css";

function NuestrosServicios() {


  return(
    <div>
<Container className="contenedor-servicios">
    <h1>Tratamientos y experiencias relajantes</h1>
    <Row className="filaServicios justify-content-center">
          <Col md={4}>
            <img src="src/assets/img/imgServicios/servicios/piscina.jpg" width="100%" alt="Piscina" className="img-effect"  />
            <h3>Acceso a Piscina</h3>
            <p>
              Los visitantes externos también pueden disfrutar de nuestra piscina adquiriendo un pase diario. 
              Relájate y disfruta de un ambiente exclusivo para todos.
            </p>
            <p><strong>Duración:</strong> 1 día | <strong>Precio:</strong> 7€ por persona</p>
          </Col>
          <Col md={4}>
            <img src="src/assets/img/imgServicios/servicios/hidroterapia.jpg" width="100%" alt="Circuito Hidroterapia" className="img-effect"  />
            <h3>Circuito Hidroterapia</h3>
            <p>
              Jacuzzis, saunas, baños de vapor y duchas de sensaciones con
              esencias marinas para relajar cuerpo y mente.
            </p>
           <p><strong>Duración:</strong> 2,5 horas | <strong>Precio:</strong> 40€</p>
          </Col>
          <Col md={4}>
            <img src="src/assets/img/imgServicios/servicios/detox.jpg" width="100%" alt="Tratamiento Corporal Detox" className="img-effect"  />
            <h3>Tratamiento Corporal Detox</h3>
            <p>
           Un tratamiento que ayuda a eliminar toxinas y revitaliza la piel, ideal después de un baño de vapor o jacuzzi.
            </p>
            <p><strong>Duración:</strong> 1 hora | <strong>Precio:</strong> 55€</p>
          </Col>
        </Row>

        <Row className="filaServicios justify-content-center">
          <Col md={4}>
            <img src="src/assets/img/imgServicios/servicios/relajante.jpg" width="100%" alt="Masaje Relajante" className="img-effect"  />
            <h3>Masaje Relajante</h3>
            <p>
              Nuestro masaje relajante alivia tensiones y favorece la relajación profunda.
            </p>
             <p><strong>Duración:</strong> 1 hora | <strong>Precio:</strong> 45€</p>
          </Col>
          <Col md={4}>
            <img src="src/assets/img/imgServicios/servicios/terapeutico.jpg" width="100%" alt="Masaje Terapéutico" className="img-effect"  />
            <h3>Masaje Terapéutico</h3>
            <p>
              Tratamiento específico para aliviar dolores musculares y mejorar la movilidad.
            </p>
              <p><strong>Duración:</strong> 1,5 horas | <strong>Precio:</strong> 65€</p>
          </Col>
          <Col md={4}>
            <img src="src/assets/img/imgServicios/servicios/aromaterapia.jpg" width="100%" alt="Masaje de Aromaterapia" className="img-effect"  />
            <h3>Masaje de Aromaterapia</h3>
            <p>
              Un masaje relajante que combina aceites esenciales para promover el bienestar emocional y físico.
            </p>
            <p><strong>Duración:</strong> 1 hora | <strong>Precio:</strong> 50€</p>
          </Col>
        </Row>
            <Row className="filaServicios justify-content-center">
          <Col md={4}>
            <img src="src/assets/img/imgServicios/servicios/piedras.jpg" width="100%" alt="Masaje con Piedras Calientes" className="img-effect"  />
            <h3>Masaje con Piedras Calientes</h3>
            <p>
             Este tipo de masaje utiliza piedras volcánicas calientes para reducir el estrés y mejorar la circulación.
            </p>
            <p><strong>Duración:</strong> 1 hora | <strong>Precio:</strong> 60€</p>
          </Col>
          <Col md={4}>
            <img src="src/assets/img/imgServicios/servicios/exfoliacion.jpg" width="100%" alt="Exfoliación Corporal" className="img-effect"  />
            <h3>Exfoliación Corporal</h3>
            <p>
              Tratamiento de eliminación de células muertas con sales o azúcar, dejando la piel suave.
            </p>
           <p><strong>Duración:</strong> 1,5 horas | <strong>Precio:</strong> 70€</p>
          </Col>
          <Col md={4}>
            <img src="src/assets/img/imgServicios/servicios/manicura.jpg" width="100%" alt="Manicura y Pedicura" className="img-effect"  />
            <h3>Manicura y Pedicura Spa</h3>
            <p>
           Tratamientos de cuidado y embellecimiento de manos y pies con productos de alta calidad.
            </p>
            <p><strong>Duración:</strong> 1 hora | <strong>Precio:</strong> 40€</p>
          </Col>
        </Row>

        
    </Container>

    <Container className="contenedor-servicios">
<h1>Aventuras en Cabo de Gata</h1>
<Row className="filaServicios justify-content-center">
          <Col md={4}>
            <img src="src/assets/img/imgServicios/servicios/kayak.jpg" width="100%" alt="Excursión en Kayak" className="img-effect"  />
            <h3>Excursión en Kayak</h3>
            <p>
              Navega en kayak por aguas tranquilas y explora paisajes únicos en solitario o en grupo.
            </p>
             <p><strong>Duración:</strong> 6 horas | <strong>Precio:</strong> 100€ por kayak</p>
          </Col>
          <Col md={4}>
            <img src="src/assets/img/imgServicios/servicios/snorkel.jpg" width="100%" alt="Snorkel" className="img-effect"  />
            <h3>Aventura Submarina</h3>
            <p>
              Descubre Cabo de Gata como nunca antes lo habías visto con nuestro servicio de snorkel.
            </p>
              <p><strong>Duración:</strong> 3,5 horas | <strong>Precio:</strong> 150€</p>
          </Col>
          <Col md={4}>
            <img src="src/assets/img/imgServicios/servicios/senderismo.jpg" width="100%" alt="Masaje de Aromaterapia" className="img-effect"  />
            <h3>Senderismo en Cabo de Gata</h3>
            <p>
              Aventura grupal en la ruta de El Pocico- Las Marinas, apta para principiantes y con inmejorables vistas.
            </p>
            <p><strong>Duración:</strong> 6 horas | <strong>Precio:</strong> 10€ por persona</p>
          </Col>
        </Row>

    </Container>

    </div>
  );
}
export default NuestrosServicios