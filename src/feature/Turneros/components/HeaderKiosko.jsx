import { useState, useEffect } from "react";
import { configKiosko } from "../config/kioskoConfig";
import ClockDisplay from "../components/Clock/ClockDisplay";
import { Clock } from "lucide-react";

function HeaderKiosko() {
  const [fechaActual, setFechaActual] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setFechaActual(new Date());
    }, 1000);
    return () => clearInterval(intervalo);
  }, []);

  const horaFormateada = fechaActual.toLocaleTimeString("es-EC", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  const fechaFormateada = fechaActual.toLocaleDateString("es-EC", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  return (
    <header className="kiosko-encabezado">
      <div className="encabezado-logo">
        <div className="logo-caja">
          <img src={configKiosko.urlLogo} alt="Ministerio de salud publica"/>
        </div>
      </div>
      
      <div className="encabezado-textos">
        <h1 className="titulo-principal">
          <span className="cruz-roja">+</span> {configKiosko.tituloSistema}
        </h1>
        <h2 className="subtitulo-principal">{configKiosko.subtituloSistema}</h2>
      </div>

      <ClockDisplay/>
    </header>
  );
}

export default HeaderKiosko;