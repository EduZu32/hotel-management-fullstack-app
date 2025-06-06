import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

export function EmpLoginError() {
    const alert = withReactContent(Swal)
    return(
        alert.fire({
            icon: "error",
            title: "Error:",
            text: "El usuario o la contraseña son incorrectos",
          })
    )
}
