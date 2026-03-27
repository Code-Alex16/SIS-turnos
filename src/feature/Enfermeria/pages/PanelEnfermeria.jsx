import { useState } from "react";
import { Header } from "../../../components/layout/Header/Header";
import './PanelEnfermeria.css'

function PanelEnfermeria() {

  const [turnos] = useState([
    { id: 1, codigo: "ET-101", triaje: 1 },
    { id: 2, codigo: "ET-102", triaje: 2 },
    { id: 3, codigo: "ET-103", triaje: 3 },
  ]);

  const llamarTurno = (turno) => {
    localStorage.setItem("turnoActual", JSON.stringify({
      codigo: turno.codigo,
      area: "Consultorio 1",
      triaje: turno.triaje
    }));
  };

  const logosrc = '/logos/MSP.png';

  return (
    <div className="enfermeria-page">
  <Header logoSrc={logosrc} />

  <h1 className="enfermeria-page__title">ENFERMERÍA</h1>

  <section className="enfermeria-board">
    <div className="enfermeria-board__header">Pacientes</div>

    <div className="enfermeria-list">
      {turnos.map((turno) => (
        <div
          key={turno.id}
          className={`enfermeria-item enfermeria-item--t${turno.triaje}`}
        >
          <span>{turno.codigo}</span>

          <button onClick={() => llamarTurno(turno)}>
            🔊
          </button>
        </div>
      ))}
    </div>
  </section>
</div>
  );
}

export default PanelEnfermeria;