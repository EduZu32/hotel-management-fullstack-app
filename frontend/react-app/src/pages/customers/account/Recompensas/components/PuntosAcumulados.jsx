import { useEffect, useState } from "react";
import "./puntosAcumulados.css";

function PuntosAcumulados() {
  const [puntos, setPuntos] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("clientToken");

    fetch("http://localhost:3000/api/clients/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener los puntos");
        return res.json();
      })
      .then((data) => {
        //console.log("Datos cliente:", data);
        setPuntos(data.account_points); // ← ahora debe venir desde `account`
      })
      .catch((err) => {
        console.error(err);
        setError("No se pudieron obtener los puntos.");
      });
  }, []);

  if (error) return <p>{error}</p>;
  if (puntos === null) return <p>Cargando puntos...</p>;

  const porcentajeDescuento = Math.floor(puntos / 100) * 5;

  return (
    <>
      <h2 className="puntos">{puntos} Puntos</h2>
      <p>Tus puntos acumulados equivalen a un <strong>{porcentajeDescuento}%</strong> de descuento en tu próxima reserva.</p>
    </>
  );
}

export default PuntosAcumulados;