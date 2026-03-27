import React from "react";
import "../styles/KioskoPage.css";

function MensajeModal({ abierto, titulo, contenido, onClose }) {
  if (!abierto) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-contenido modal-contenido--mensaje" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-titulo">{titulo}</h2>
        <div className="modal-mensaje">{contenido}</div>
        <button type="button" className="modal-boton" onClick={onClose}>
          CERRAR
        </button>
      </div>
    </div>
  );
}

export default React.memo(MensajeModal);
