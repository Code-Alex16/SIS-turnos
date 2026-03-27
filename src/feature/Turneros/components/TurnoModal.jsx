import React from "react";
import "../styles/KioskoPage.css";

function TurnoModal({ abierto, turno, onClose }) {
  if (!abierto || !turno) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-contenido modal-contenido--turno">
        <h2 className="modal-titulo">Turno generado</h2>
        <p className="modal-subtitulo">Diríjase a la sala de espera y permanezca atento a la llamada.</p>

        <div className="modal-codigo">{turno.codigo}</div>

        <div className="resumen-turno">
          <p><strong>Servicio:</strong> {turno.servicio.nombre}</p>
          <p><strong>Identificación:</strong> {turno.identificacion}</p>
        </div>

        <button type="button" className="modal-boton" onClick={onClose}>
          FINALIZAR
        </button>
      </div>
    </div>
  );
}

export default React.memo(TurnoModal);
