import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";
import "./logout.css";

const alert = withReactContent(Swal);

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert.fire({
      title: 'Cerrar Sesión',
      text: "¿Deseas cerrar sesión?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      customClass: {
        confirmButton: 'btn',
        cancelButton: 'btn'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear();
        navigate("/");
      }
    });
  };

  return (
    <span onClick={handleLogout} className="logout-btn" role="button">
      <img
        src="/logout.png"
        alt="Cerrar sesión"
        width="30"
        height="30"
        className="logout-icon"
      />
    </span>
  );
}

export default Logout;

