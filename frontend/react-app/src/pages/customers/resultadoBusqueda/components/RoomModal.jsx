import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import RoomDetailsModal from "../../habitaciones/components/RoomDetailsModal";
import "./roomModal.css"

function RoomModal({ show, onHide, room }) {
  if (!room) return null;

  

  return (
    <Modal show={show} onHide={onHide} size="lg">
<Modal.Header
  closeButton
  style={{ borderBottom: 'none', paddingBottom: '0px' }}
/>
      <Modal.Body>
        <RoomDetailsModal
          descripcion={room.room_description}
          imagenUrl={`/images/${room.room_type}.jpg`}
          tipo={room.room_type}
        />
      </Modal.Body>
    </Modal>
  );
}

RoomModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  room: PropTypes.shape({
    room_price: PropTypes.number,
    room_capacity: PropTypes.number,
    room_description: PropTypes.string,
    room_type: PropTypes.string,
  }),
};

export default RoomModal;

