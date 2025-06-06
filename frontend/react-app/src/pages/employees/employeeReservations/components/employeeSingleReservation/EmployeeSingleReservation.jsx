import PropTypes from "prop-types";
import { Container } from "react-bootstrap";

export default function EmpSingleReservation({numRoom}){
    return (
        <Container fluid>
            <Row>
                <Col>
                    
                </Col>
            </Row>
            <Row>
                <Col>
                
                </Col>
            </Row>
        </Container>
    )
 }

EmpSingleReservation.PropTypes = {
    numRoom : PropTypes.number.isRequired
}