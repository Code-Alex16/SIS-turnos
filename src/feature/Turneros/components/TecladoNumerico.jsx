import React from "react";
import { ArrowLeftToLine } from "lucide-react";
import "./TecladoNumerico.css";

function TecladoNumerico({
  alPresionarNumero,
  alAbrirTecladoAlfabetico,
  alBorrar,
}) {
  const numeros = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  return (
    <div className="teclado-contenedor">
      <div className="teclado-grid">
        {numeros.map((numero) => (
          <button
            key={numero}
            type="button"
            className="tecla-btn"
            onClick={() => alPresionarNumero(numero)}
          >
            {numero}
          </button>
        ))}

        <button
          type="button"
          className="tecla-btn tecla-secundaria"
          onClick={alAbrirTecladoAlfabetico}
        >
          ABC
        </button>

        <button
          type="button"
          className="tecla-btn tecla-0"
          onClick={() => alPresionarNumero("0")}
        >
          0
        </button>

        <button
          type="button"
          className="tecla-btn tecla-borrar"
          onClick={alBorrar}
        >
          <ArrowLeftToLine size={32}/>
        </button>
      </div>
    </div>
  );
}

export default React.memo(TecladoNumerico);