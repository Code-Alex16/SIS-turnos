import "./TurnoLlamadoModal.css";

function TurnoLlamadoModal({ turno }) {
  if (!turno) return null;

  return (
    <div className="turno-modal-backdrop">
      <div className={`turno-modal triaje-${turno.triaje}`}>
        <p className="turno-modal__eyebrow">Nuevo llamado</p>
        <h2 className="turno-modal__codigo">{turno.codigo}</h2>
        <p className="turno-modal__mensaje">Diríjase a {turno.area}</p>
        <div className="turno-modal__triaje">TRIAJE {turno.triaje}</div>
      </div>
    </div>
  );
}

export default TurnoLlamadoModal;