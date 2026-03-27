import React from "react";
import "../styles/KioskoPage.css";

const LETRAS = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
];

function TecladoAlfabeticoModal({ abierto, valorActual, maxLength, alCerrar, alAgregarCaracter, alBorrar }) {
  if (!abierto) return null;

  const deshabilitarTecla = valorActual.length >= maxLength;

  return (
    <div className="modal-overlay" onClick={alCerrar}>
      <div className="modal-contenido modal-contenido--teclado" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-simple">
          <h2 className="modal-titulo">Teclado alfabético</h2>
          <button type="button" className="modal-cerrar-x" onClick={alCerrar}>×</button>
        </div>

        <div className="modal-visor">{valorActual || "Sin caracteres ingresados"}</div>

        <div className="teclado-alfabetico-grid">
          {LETRAS.map((letra) => (
            <button
              key={letra}
              type="button"
              className="tecla-btn tecla-btn--sm"
              onClick={() => alAgregarCaracter(letra)}
              disabled={deshabilitarTecla}
            >
              {letra}
            </button>
          ))}

          <button
            type="button"
            className="tecla-btn tecla-btn--sm tecla-secundaria"
            onClick={() => alAgregarCaracter("-")}
            disabled={deshabilitarTecla}
          >
            -
          </button>

          <button type="button" className="tecla-btn tecla-btn--sm tecla-borrar" onClick={alBorrar}>
            BORRAR
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(TecladoAlfabeticoModal);