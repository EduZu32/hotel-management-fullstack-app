import PropTypes from "prop-types";
import { Card, Button, Col} from "react-bootstrap";
import "./employeeMenuCard.css";
export function EmpMenuCard ({title, imageUrl, route}) {
    return(
 
        <Card id="employeeMenuCard">
             <Col xs={8} md={8} className="justify-content-center text-center m-0 p-0 mx-auto">
             <Card.Img   variant="top" src={imageUrl}/>
             </Col>
            <Card.Body>
                <Button href={route}>{title}</Button>
            </Card.Body>
        </Card>


    )
}
EmpMenuCard.propTypes = {
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isrequired,
    route: PropTypes.string.isRequired,
}