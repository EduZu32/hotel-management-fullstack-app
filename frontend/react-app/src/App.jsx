import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom"
import ScrollToTop from "./utils/ScrollToTop.js";

// -- CLIENTES --
// -- Navegación y Footer --
import Menu from "./components/Menu.jsx"
import Search from "./components/Search.jsx";
import Footer from "./components/Footer.jsx"
import AvisoLegal from "./pages/customers/terminosLegales/avisoLegal/AvisoLegal.jsx";
import PoliticaPrivacidad from "./pages/customers/terminosLegales/politicaPrivacidad/PoliticaPrivacidad.jsx";
import TerminosCondiciones from "./pages/customers/terminosLegales/terminosCondiciones/TerminosCondiciones.jsx";
// -- Cuenta de Usuario --
import Datos from "./pages/customers/account/Datos/Datos.jsx";
import Recompensas from "./pages/customers/account/Recompensas/Recompensas.jsx";
import Reservas from "./pages/customers/account/Reservas/Reservas.jsx";
// -- Checkout --
import DatosReserva from "./pages/customers/checkout/datosReserva/DatosReserva.jsx";
// -- Secciones --
import Inicio from "./pages/customers/inicio/Inicio.jsx";
import Habitaciones from "./pages/customers/habitaciones/Habitaciones.jsx";
import Servicios from "./pages/customers/servicios/Servicios.jsx";
import Contacto from "./pages/customers/contacto/Contacto.jsx";
import Login from "./pages/customers/login/Login.jsx";
import Registro from "./pages/customers/registro/Registro.jsx";
import ResultadoBusqueda from "./pages/customers/resultadoBusqueda/ResultadoBusqueda.jsx";
// -- 404 Not Found --
import NotFound from "./pages/customers/NotFound/NotFound.jsx";

// -- EMPLEADOS -- 
import EmployeeLogin from "./pages/employees/employeeLogin/EmployeeLogin.jsx";
import EmployeeMenu from "./pages/employees/employeeMenu/EmployeeMenu.jsx";
import EmpRooms from "./pages/employees/employeeRooms/EmployeeRooms.jsx";
import EmpReservations from "./pages/employees/employeeReservations/EmployeeReservations.jsx";
import EmpReservationsList from "./pages/employees/employeeReservations/components/employeeReservationsList/EmployeeReservationsList.jsx";
import { EmployeeList } from "./pages/employees/employeeMenu/components/EmployeeList";

// -- Rutas Privadas --
import PrivateRoute from "./components/PrivateRoute.jsx";
import PrivateRouteClient from "./components/PrivateRouteClient.jsx";

// -- CSS --
import "./index.css";

function Layout() {
  const location = useLocation(); // Permite saber en que página estamos, nativo de react-router-dom

  const rutasConMenu = [ // Almacena las rutas en las que el menu público es visible
"/", "/habitaciones", "/servicios", "/contacto", "/login", 
    "/registro", "/search", "/datos",
    "/recompensas", "/reservas", "/aviso", "/privacidad", "/condiciones", "datosReserva"
  ];

    const mostrarMenu = rutasConMenu.some(ruta => location.pathname.startsWith(ruta));

  return (
     <>
      <ScrollToTop />
      {mostrarMenu && <Menu />}
      {mostrarMenu && <Search />}
      
      <div className="pages-container">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/habitaciones" element={<Habitaciones />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/search" element={<ResultadoBusqueda />} />
          <Route path="/datos" element={<PrivateRouteClient><Datos /></PrivateRouteClient>} />
          <Route path="/recompensas" element={<PrivateRouteClient><Recompensas /></PrivateRouteClient>} />
          <Route path="/reservas" element={<PrivateRouteClient><Reservas /></PrivateRouteClient>} />
          <Route path="/aviso" element={<AvisoLegal />} />
          <Route path="/privacidad" element={<PoliticaPrivacidad />} />
          <Route path="/condiciones" element={<TerminosCondiciones />} />
          <Route path="/datosReserva" element={<DatosReserva />} />
          <Route path="/checkout" element={<DatosReserva />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );

}



function App() {
  return(
<Router>
  <ScrollToTop />
  <div className="pages-container">
    <Routes>
  {/* Rutas Cliente Públicas */} 
        <Route path="*" element={<Layout />} />

        { /* Rutas Privadas Empleado */}
        <Route path="/employee/menu/employees" element={<EmployeeList />} />
        <Route path="/employee" element={<EmployeeLogin/>}/>
        <Route path="/employee/:menu" element={
          <PrivateRoute><EmployeeMenu /></PrivateRoute>} />
        <Route path="/employee/:menu/reservations" element={
          <PrivateRoute><EmpReservations/></PrivateRoute>
        }/>
        <Route path="/employee/:menu/rooms" element={
          <PrivateRoute><EmpRooms/></PrivateRoute>
        }/>
        <Route path="/employee/reservations-list" element={
          <PrivateRoute><EmpReservationsList/></PrivateRoute>
        } />
    </Routes>
  </div>

</Router>
  )
}

export default App
