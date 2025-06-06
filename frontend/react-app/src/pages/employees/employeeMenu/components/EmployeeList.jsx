
import { useEffect, useState } from "react";
import { EmpLoginNav } from './../../components/employeeLoginNav/EmployeeLoginNav';
import Swal from "sweetalert2";
export function EmployeeList() {
  const [selectedEmployeeShifts, setSelectedEmployeeShifts] = useState([]);
const [showShiftOffcanvas, setShowShiftOffcanvas] = useState(false);
const [selectedEmployeeName, setSelectedEmployeeName] = useState("");
  const [employees, setEmployees] = useState([]);
  const [totalWorked, setTotalWorked] = useState(null);
  const token = sessionStorage.getItem("Token");
  const loggedUser = JSON.parse(sessionStorage.getItem("User"));
  const myId = loggedUser?.id;

  const fetchSummary = () => {
    fetch("http://localhost:3000/api/shifts/summary", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) =>
        console.error("Error cargando resumen de empleados:", err)
      );
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const handleToggleActive = async (empId, isActive, empName) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/employees/${empId}/toggle`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error();

      alert(
        `${isActive ? "Cuenta desactivada" : "Cuenta activada"}: ${empName}`
      );

      fetchSummary();
    } catch (error) {
      alert("No se pudo cambiar el estado del empleado.", error);
    }
  };
   const [showOffcanvas, setShowOffcanvas] = useState(false);
const [newEmployee, setNewEmployee] = useState({
  emp_doc_id: "",
  emp_name: "",
  emp_surname_one: "",
  emp_surname_two: "",
  emp_telephone: "",
  emp_manager_id: "",
  emp_email: "",
  emp_password: "",
  emp_hotel_id: loggedUser?.hotel_id || "1",
  emp_role: "staff",
  emp_active: true,
});

const handleInputChange = (e) => {
  const { name, value, type, checked } = e.target;
  setNewEmployee((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
  }));
};

const handleCreateEmployee = async () => {
  try {
    console.log(newEmployee.emp_manager_id);
    const response = await fetch("http://localhost:3000/api/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newEmployee),
    });

    if (!response.ok) {
    // Errores HTTP como 400, 500, etc
    const errorData = await response.json();
    console.error('Error en la respuesta:', errorData);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Complete todos los campos",
    });
    // Mostrar mensaje al usuario o guardar el error en estado
  } else {
    const data = await response.json();
    console.log('Empleado creado:', data);
     Swal.fire({
        icon: "success",
        title: "Empleado creado",
        text: "El empleado se ha creado correctamente.",
        timer: 2000,
        showConfirmButton: false,
      });
      // Cerrar el Offcanvas
      setShowOffcanvas(false);
      // Limpiar el formulario
      setNewEmployee({
        emp_doc_id: "",
        emp_name: "",
        emp_surname_one: "",
        emp_surname_two: "",
        emp_telephone: "",
        emp_manager_id: "",
        emp_email: "",
        emp_password: "",
        emp_hotel_id: loggedUser?.hotel_id || "1",
        emp_role: "staff",
        emp_active: true,
      });
      // Refresca la tabla
      fetchSummary();
  }
} catch (error) {
  // Error de red o cualquier otro error inesperado
  console.error('Error en la petición:', error);  
  Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo conectar con el servidor.",
    });
}

};
const fetchEmployeeShifts = async (empId, empName) => {
  try {
    const res = await fetch(`http://localhost:3000/api/shifts/history/${empId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error();
    const data = await res.json();
     console.log("Turnos recibidos:", data); 
    setSelectedEmployeeShifts(data.shifts);
    setTotalWorked(data.total);
    setSelectedEmployeeName(empName);
    setShowShiftOffcanvas(true);
  } catch (err) {
    console.error("Error al cargar los turnos:", err);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudieron cargar los turnos del empleado.",
    });
  }
};

  return (
    <div className = "container-fluid">
      <EmpLoginNav></EmpLoginNav>

      <div className="container mt-3">
  <button className="btn btn-primary m-1" onClick={() => setShowOffcanvas(true)}>
    Crear empleado
  </button>
  <button className="btn btn-secondary m-1" onClick={() => window.location.href = "/employee/menu"}>
    Volver
  </button>
</div>
<div className="container mt-4">
      <h2>Empleados</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Turnos</th>
            <th>Horas trabajadas</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.emp_id}>
              <td>{emp.full_name.trim()}</td>
              <td>{emp.emp_email}</td>
              <td>{emp.emp_role}</td>
              <td>{emp.shift_count}</td>
              <td>{emp.hours}h {emp.minutesOnly}min</td>
              <td>{emp.emp_active ? "Activo" : "Inactivo"}</td>
              <td>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() =>
                    handleToggleActive(
                      emp.emp_id,
                      emp.emp_active,
                      emp.full_name.trim()
                    )
                  }
                  disabled={emp.emp_id === myId}
                  title={
                    emp.emp_id === myId
                      ? "No puedes modificarte a ti mismo"
                      : ""
                  }
                >
                  {emp.emp_active ? "Desactivar" : "Activar"}
                </button>
                <button
  className="btn btn-sm btn-info ms-2"
  onClick={() => fetchEmployeeShifts(emp.emp_id, emp.full_name.trim())}
>
  Ver
</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
<div
  className={`offcanvas offcanvas-start ${showOffcanvas ? "show" : ""}`}
  tabIndex="-1"
  style={{ visibility: showOffcanvas ? "visible" : "hidden" }}
>
  <div className="offcanvas-header">
    <h5 className="offcanvas-title">Nuevo empleado</h5>
    <button
      type="button"
      className="btn-close"
      onClick={() => setShowOffcanvas(false)}
    ></button>
  </div>
  <div className="offcanvas-body">
    <form>
      <div className="mb-2">
        <label className="form-label">DNI</label>
        <input
          type="text"
          className="form-control"
          name="emp_doc_id"
          value={newEmployee.emp_doc_id}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Nombre</label>
        <input
          type="text"
          className="form-control"
          name="emp_name"
          value={newEmployee.emp_name}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Primer apellido</label>
        <input
          type="text"
          className="form-control"
          name="emp_surname_one"
          value={newEmployee.emp_surname_one}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Segundo apellido</label>
        <input
          type="text"
          className="form-control"
          name="emp_surname_two"
          value={newEmployee.emp_surname_two}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Teléfono</label>
        <input
          type="text"
          className="form-control"
          name="emp_telephone"
          value={newEmployee.emp_telephone}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          name="emp_email"
          value={newEmployee.emp_email}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Contraseña</label>
        <input
          type="password"
          className="form-control"
          name="emp_password"
          value={newEmployee.emp_password}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Rol</label>
        <select
          className="form-select"
          name="emp_role"
          value={newEmployee.emp_role}
          onChange={handleInputChange}
        >
          <option value="staff">Empleado</option>
          <option value="manager">Administrador</option>
        </select>
      </div>
      
      <div className="mb-2">
        <label className="form-label">ID del Manager</label>
        <input
          type="text"
          className="form-control"
          name="emp_manager_id"
          value={newEmployee.emp_manager_id || ""}
          onChange={handleInputChange}
          placeholder="Introduce ID del manager"
        />
      </div>

      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          name="emp_active"
          checked={newEmployee.emp_active}
          onChange={handleInputChange}
        />
        <label className="form-check-label">Activo</label>
      </div>
      <button
        type="button"
        className="btn btn-success"
        onClick={handleCreateEmployee}
      >
        Crear empleado
      </button>
    </form>
  </div>
</div>
<div
  className={`offcanvas offcanvas-end ${showShiftOffcanvas ? "show" : ""}`}
  tabIndex="-1"
  style={{
    visibility: showShiftOffcanvas ? "visible" : "hidden",
    width: "100vw",
    maxWidth: "100vw"
  }}
>
  <div className="offcanvas-header">
    <h5 className="offcanvas-title">Turnos de {selectedEmployeeName}</h5>
    <button
      type="button"
      className="btn-close"
      onClick={() => setShowShiftOffcanvas(false)}
    ></button>
  </div>
  <div className="offcanvas-body">
    {selectedEmployeeShifts.length > 0 ? (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id. Turno</th>
            <th>Fecha de Inicio</th>
            <th>Fecha Fin</th>
            <th>Horas trabajadas</th>
          </tr>
        </thead>
        <tbody>
          {selectedEmployeeShifts.map((shift) => (
            <tr key={shift.shift_id}>
              <td>{shift.shift_id}</td>
              <td>{shift.start}</td>
              <td>{shift.duration}</td>
              <td>{Math.round(shift.minutes)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>No hay turnos disponibles para este empleado.</p>
    )}
  </div>
</div>

    </div>
    
  );

  
}
