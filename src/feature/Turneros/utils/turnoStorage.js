export function generarYGuardarTurno({ servicio, identificacion }) {
  let tipoKey = "";
  let prefijo = "";

  if (servicio.id === "triaje-general") {
    tipoKey = "normal";
    prefijo = "ET";
  }

  if (servicio.id === "triaje-prioritario") {
    tipoKey = "prioritario";
    prefijo = "ETG";
  }

  if (servicio.id === "procedimientos") {
    tipoKey = "procedimiento";
    prefijo = "PR";
  }

  const correlativos = JSON.parse(localStorage.getItem("correlativos") || "{}");
  correlativos[tipoKey] = (correlativos[tipoKey] || 0) + 1;
  localStorage.setItem("correlativos", JSON.stringify(correlativos));

  const numero = correlativos[tipoKey];
  const codigo = `${prefijo}-${String(numero).padStart(3, "0")}`;

  const nuevoTurno = {
    id: Date.now(),
    codigo,
    documento: identificacion,
    identificacion,
    tipo: tipoKey,
    servicio,
    triaje: null,
  };

  if (tipoKey !== "procedimiento") {
    const lista = JSON.parse(localStorage.getItem("turnos") || "[]");
    lista.push(nuevoTurno);
    localStorage.setItem("turnos", JSON.stringify(lista));
  }

  return nuevoTurno;
}