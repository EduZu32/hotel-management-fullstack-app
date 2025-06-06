// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
 //<StrictMode>
    <App />
  //</StrictMode>, 

  /*
  Tenia un problema con el StrictMode que no me permitia renderizar la pagina correctamente por lo que lo comente porque me causaba la doble 
   ejecucion de useEffect en resuladoBusqeuda y de esa forma me ejecuataba 2 veces el fetch() a la base de datos.
   
   */
)
