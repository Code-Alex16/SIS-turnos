export const serviciosMock = [
  {
    id: "triaje-general",
    nombre: "Triaje",
    descripcion: "Atención General.",
    espera: 10,
    colorBoton: "#0d6efd"
  },
  {
    id: "procedimientos",
    nombre: "Procedimientos",
    descripcion: "Curaciones menores, Inyecciones, Puntos.",
    espera: 5,
    colorBoton: "#198754"
  },
  {
    id: "triaje-prioritario",
    nombre: "Triaje Grupo Prioritario",
    descripcion: "Personas de tercera edad, Embarazadas, Discapacidad.",
    espera: 2,
    colorBoton: "#fd7e14"
  }
];

export const coloresTriageMock = [
  { id: "rojo", nombre: "ROJO", urgencia: "EMERGENCIA", tiempo: "Atención Inmediata", colorFondo: "#da291c", textoBlanco: true },
  { id: "naranja", nombre: "NARANJA", urgencia: "MUY URGENTE", tiempo: "Atención < 10 min", colorFondo: "#ff8c00", textoBlanco: true },
  { id: "amarillo", nombre: "AMARILLO", urgencia: "URGENTE", tiempo: "Atención < 60 min", colorFondo: "#ffe600", textoBlanco: false },
  { id: "verde", nombre: "VERDE", urgencia: "POCO URGENTE", tiempo: "Atención < 120 min", colorFondo: "#009639", textoBlanco: true },
  { id: "azul", nombre: "AZUL", urgencia: "NO URGENTE", tiempo: "Atención < 240 min", colorFondo: "#005eb8", textoBlanco: true }
];