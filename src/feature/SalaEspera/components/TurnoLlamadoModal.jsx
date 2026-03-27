import React from "react";
import "./TurnoLlamadoModal.css";

function TurnoLlamadoModal({ turno }) {
  return (
    <div className="hospital-bloque-actual">
      <div className="hospital-imagen-box">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/99/Hospital_de_Especialidades_Portoviejo.jpg"
          alt="Hospital"
        />
      </div>

      <div className="hospital-turno-actual">
        {turno ? turno.codigo : "---"}
      </div>
    </div>
  );
}

export default React.memo(TurnoLlamadoModal);