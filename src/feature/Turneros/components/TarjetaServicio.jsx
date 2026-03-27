function TarjetaServicio({ datos, estaSeleccionada, funcionAlHacerClic }) {
  let claseTarjeta = "tarjeta-servicio";
  if (estaSeleccionada) {
    claseTarjeta = "tarjeta-servicio tarjeta-activa";
  }

  return (
    <div 
      className={claseTarjeta} 
      style={{ backgroundColor: datos.colorBoton }}
      onClick={() => funcionAlHacerClic(datos.id)}
    >
      <div className="tarjeta-icono">
        O
      </div>
      <div className="tarjeta-textos">
        <h3>{datos.nombre}</h3>
        <p>{datos.descripcion}</p>
      </div>
      <div className="tarjeta-espera">
        <span className="numero-espera">{datos.espera}</span>
        <span className="texto-espera">En espera</span>
      </div>
    </div>
  );
}

export default TarjetaServicio;