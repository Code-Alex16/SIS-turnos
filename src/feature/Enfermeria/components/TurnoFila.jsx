import React from "react";

const OPCIONES_TRIAGE = [
  { value: "", label: "Triaje" },
  { value: "rojo", label: "🔴 Rojo" },
  { value: "naranja", label: "🟠 Naranja" },
  { value: "amarillo", label: "🟡 Amarillo" },
  { value: "verde", label: "🟢 Verde" },
  { value: "azul", label: "🔵 Azul" },
];

function obtenerUltimos4(valor = "") {
  return String(valor).slice(-4);
}

function TurnoFila({ turno, vista, onAsignarTriaje, onLlamar }) {
  return (
    <div className={`item ${turno.triaje ? `triaje-${turno.triaje}` : "blanco"}`}>
      <span className="item-codigo">{turno.codigo}</span>

      <div className="acciones">
        {vista === "enfermeria" ? (
          <>
            <select
              className="select-triaje"
              onChange={(e) => onAsignarTriaje(turno.id, e.target.value)}
              value={turno.triaje || ""}
            >
              {OPCIONES_TRIAGE.map((opcion) => (
                <option key={opcion.value} value={opcion.value} disabled={opcion.value === ""}>
                  {opcion.label}
                </option>
              ))}
            </select>

            <button className="btn-llamar" type="button" onClick={() => onLlamar(turno)}>
              🔊
            </button>
          </>
        ) : (
          <>
            <span className="item-documento">****{obtenerUltimos4(turno.identificacion)}</span>

            <button className="btn-llamar" type="button" onClick={() => onLlamar(turno)}>
              🔊
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default React.memo(TurnoFila);