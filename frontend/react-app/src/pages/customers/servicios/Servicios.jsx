import Cabecera from "../../../components/Cabecera";
import "./servicios.css"
import IntroServicios from "./components/IntroServicios";
import NuestrosServicios from "./components/NuestrosServicios";
import BannerServicios from "./components/BannerServicios";

function Servicios() {

  return(
<div>
   <Cabecera 
 nombre="Servicios"
 clase="cabecera-servicios"/>
 <IntroServicios />
 <NuestrosServicios />
 <BannerServicios />
</div>
  );

}

export default Servicios