import { useEffect, useMemo, useState } from "react";
import TurnoList from "../components/TurnoList";
import TurnoLlamadoModal from "../components/TurnoLlamadoModal";
import {
  obtenerTurnoMedico,
  obtenerTurnos,
} from "../../../shared/turnosStorage";
import {
  enmascararDocumento,
  filtrarPendientesMedico,
  ordenarTurnosMedico,
} from "../../../shared/turnosHelpers";
import "../pages/style3.css";

function TurnosMedico() {
  const [turnos, setTurnos] = useState([]);
  const [turnoActual, setTurnoActual] = useState(null);

  const cargarDatos = () => {
    setTurnos(obtenerTurnos());
    setTurnoActual(obtenerTurnoMedico());
  };

  useEffect(() => {
    cargarDatos();

    const syncDatos = () => cargarDatos();

    window.addEventListener("storage", syncDatos);
    window.addEventListener("turnos-updated", syncDatos);

    return () => {
      window.removeEventListener("storage", syncDatos);
      window.removeEventListener("turnos-updated", syncDatos);
    };
  }, []);

  const turnosPendientes = useMemo(() => {
    return ordenarTurnosMedico(filtrarPendientesMedico(turnos)).map((turno) => ({
      ...turno,
      identificacion: enmascararDocumento(turno.identificacion),
    }));
  }, [turnos]);

  return (
    <div className="pantalla-turnos hospital-turnos-layout">
      <section className="hospital-turnos-principal">
        <TurnoLlamadoModal turno={turnoActual} />
      </section>

      <aside className="hospital-turnos-lateral">
        <TurnoList
          titulo="Turnos de Médico"
          turnos={turnosPendientes}
          variante="medico"
        />
      </aside>
    </div>
  );
}

export default TurnosMedico;