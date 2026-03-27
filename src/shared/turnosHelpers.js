const PRIORIDAD_TRIAGE = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  rojo: 1,
  naranja: 2,
  amarillo: 3,
  verde: 4,
  azul: 5,
};

function normalizarTriaje(triaje) {
  if (triaje === null || triaje === undefined || triaje === "") return null;

  const valor = String(triaje).trim().toLowerCase();

  if (["1", "2", "3", "4", "5"].includes(valor)) {
    return Number(valor);
  }

  return valor;
}

export function filtrarPendientesTriaje(turnos = []) {
  return turnos.filter(
    (turno) =>
      turno.tipo !== "procedimiento" &&
      (turno.estado === "pendiente_triaje" || turno.estado === "llamado_enfermeria") &&
      !turno.triaje
  );
}

export function filtrarPendientesMedico(turnos = []) {
  return turnos.filter(
    (turno) =>
      turno.tipo !== "procedimiento" &&
      turno.triaje &&
      (turno.estado === "pendiente_medico" || turno.estado === "llamado_medico")
  );
}

export function ordenarTurnosEnfermeria(turnos = []) {
  return [...turnos].sort((a, b) => {
    if (a.tipo !== b.tipo) {
      if (a.tipo === "prioritario") return -1;
      if (b.tipo === "prioritario") return 1;
    }

    const fechaA = new Date(a.creadoEn || 0).getTime();
    const fechaB = new Date(b.creadoEn || 0).getTime();
    return fechaA - fechaB;
  });
}

export function ordenarTurnosMedico(turnos = []) {
  return [...turnos].sort((a, b) => {
    const prioridadA = PRIORIDAD_TRIAGE[normalizarTriaje(a.triaje)] || 99;
    const prioridadB = PRIORIDAD_TRIAGE[normalizarTriaje(b.triaje)] || 99;

    if (prioridadA !== prioridadB) {
      return prioridadA - prioridadB;
    }

    const fechaA = new Date(a.creadoEn || 0).getTime();
    const fechaB = new Date(b.creadoEn || 0).getTime();
    return fechaA - fechaB;
  });
}

export function obtenerClaseTriaje(triaje) {
  const valor = normalizarTriaje(triaje);
  if (!valor) return "";
  return `triaje-${valor}`;
}

export function enmascararDocumento(documento = "") {
  if (!documento) return "";

  if (documento.length <= 4) return documento;

  const visibles = documento.slice(-4);
  const ocultos = "*".repeat(documento.length - 4);

  return `${ocultos}${visibles}`;
}