const KEYS = {
  TURNOS: "turnos",
  CORRELATIVOS: "correlativos",
  TURNO_ENFERMERIA: "turnoEnfermeria",
  TURNO_MEDICO: "turnoMedico",
};

function leerJSON(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function guardarJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function obtenerTurnos() {
  return leerJSON(KEYS.TURNOS, []);
}

export function guardarTurnos(turnos) {
  guardarJSON(KEYS.TURNOS, turnos);
}

export function obtenerCorrelativos() {
  return leerJSON(KEYS.CORRELATIVOS, {});
}

export function guardarCorrelativos(correlativos) {
  guardarJSON(KEYS.CORRELATIVOS, correlativos);
}

function resolverConfiguracionServicio(servicio) {
  if (servicio?.id === "triaje-general") {
    return { tipo: "normal", prefijo: "ET" };
  }

  if (servicio?.id === "triaje-prioritario") {
    return { tipo: "prioritario", prefijo: "ETG" };
  }

  if (servicio?.id === "procedimientos") {
    return { tipo: "procedimiento", prefijo: "PR" };
  }

  return { tipo: "normal", prefijo: "ET" };
}

export function generarTurno({ servicio, identificacion }) {
  const { tipo, prefijo } = resolverConfiguracionServicio(servicio);

  const correlativos = obtenerCorrelativos();
  correlativos[tipo] = (correlativos[tipo] || 0) + 1;
  guardarCorrelativos(correlativos);

  const numero = correlativos[tipo];
  const codigo = `${prefijo}-${String(numero).padStart(3, "0")}`;

  const nuevoTurno = {
    id: Date.now(),
    codigo,
    identificacion,
    documento: identificacion,
    tipo,
    servicio,
    estado: tipo === "procedimiento" ? "pendiente_procedimiento" : "pendiente_triaje",
    triaje: null,
    area: null,
    llamadoEn: null,
    creadoEn: new Date().toISOString(),
  };

  const turnos = obtenerTurnos();
  turnos.push(nuevoTurno);
  guardarTurnos(turnos);

  return nuevoTurno;
}

export function actualizarTurno(turnoActualizado) {
  const turnos = obtenerTurnos().map((turno) =>
    turno.id === turnoActualizado.id ? turnoActualizado : turno
  );
  guardarTurnos(turnos);
  return turnoActualizado;
}

export function asignarTriaje(turnoId, triaje) {
  const turnos = obtenerTurnos();
  const turno = turnos.find((item) => item.id === turnoId);

  if (!turno) return null;

  turno.triaje = triaje;
  turno.estado = "pendiente_medico";

  guardarTurnos(turnos);
  return turno;
}

export function llamarTurnoEnfermeria(turno) {
  const turnoLlamado = {
    ...turno,
    area: "TRIAJE",
    llamadoEn: new Date().toISOString(),
    estado: "llamado_enfermeria",
  };

  actualizarTurno(turnoLlamado);
  guardarJSON(KEYS.TURNO_ENFERMERIA, turnoLlamado);

  return turnoLlamado;
}

export function llamarTurnoMedico(turno, area = "CONSULTORIO 1") {
  const turnoLlamado = {
    ...turno,
    area,
    llamadoEn: new Date().toISOString(),
    estado: "llamado_medico",
  };

  actualizarTurno(turnoLlamado);
  guardarJSON(KEYS.TURNO_MEDICO, turnoLlamado);

  return turnoLlamado;
}

export function obtenerTurnoEnfermeria() {
  return leerJSON(KEYS.TURNO_ENFERMERIA, null);
}

export function obtenerTurnoMedico() {
  return leerJSON(KEYS.TURNO_MEDICO, null);
}

export function eliminarTurno(turnoId) {
  const turnos = obtenerTurnos().filter((turno) => turno.id !== turnoId);
  guardarTurnos(turnos);
}

export function limpiarTurnoEnfermeria() {
  localStorage.removeItem(KEYS.TURNO_ENFERMERIA);
}

export function limpiarTurnoMedico() {
  localStorage.removeItem(KEYS.TURNO_MEDICO);
}