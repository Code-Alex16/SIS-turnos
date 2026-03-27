function TurnoCard({ turno }) {
  if (!turno) return null;

  return (
    <div className={`turno-alerta triaje-${turno.triaje}`}>
      <h2>NUEVO LLAMADO</h2>
      <div className="codigo-turno">{turno.codigo}</div>
      <p>Diríjase a {turno.area}</p>
      <div className="triaje">TRIAJE {turno.triaje}</div>
    </div>
  );
}

export default TurnoCard;