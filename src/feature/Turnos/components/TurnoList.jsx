function TurnoList() {

  const turnos = ["ET-94", "ET-95", "ET-96", "ET-97"];

  return (
    <div className="turno-list">
      <h3>TURNOS</h3>

      {turnos.map((t, i) => (
        <div key={i} className="turno-item">
          {t}
        </div>
      ))}
    </div>
  )
}

export default TurnoList