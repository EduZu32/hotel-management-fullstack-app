import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "./EmployeeLoginNav.module.css"

export function EmpLoginNav(){
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUser = sessionStorage.getItem("User");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUserName(userData.name);
    }
  }, []);
  
  useEffect(() => {
    const handleUnload = () => {
      const token = sessionStorage.getItem("Token");
      const storedUser = sessionStorage.getItem("User");
  
      if (!token || !storedUser) return;
  
      const user = JSON.parse(storedUser);
  
      // Cerrar turno automáticamente al cerrar navegador
      navigator.sendBeacon(`http://localhost:3000/api/shifts/logout/${user.id}`);
      //console.log("Turno cerrado automáticamente al cerrar el navegador");
    };
  
    window.addEventListener("beforeunload", handleUnload);
  
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);
  

  const handleLogout = async () => {
    const token = sessionStorage.getItem("Token");
    const storedUser = sessionStorage.getItem("User");
  
    if (storedUser && token) {
      const { id } = JSON.parse(storedUser);
  
      try {
        await fetch(`http://localhost:3000/api/shifts/logout/${id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });        
      } catch (error) {
        console.error("Error al cerrar turno:", error);
      }
    }
  
    sessionStorage.removeItem("Token");
    sessionStorage.removeItem("User");
    navigate("/employee");
  };

  return(
    <nav className="z-3 align-items-start min-vw-100 navbar navbar-expand-lg bg-body-tertiary m-0 p-0 ">
      <div className="container-fluid navbar-custom d-flex justify-content-between align-items-center">
  <NavLink className="navbar-brand" to="/employee/menu"><img className={styles.empNavImage}
          src="/public/logotipo.png"
          alt="Dunas de Oro"
        /></NavLink>
  
  <div className="d-flex align-items-center gap-3">
    {userName && <span className="fw-bold">Bienvenido, {userName}</span>}
    {userName && (
      <Button variant="outline-danger" onClick={handleLogout}>
        Cerrar sesión
      </Button>
    )}
  </div>
</div>

    </nav>
  );
}