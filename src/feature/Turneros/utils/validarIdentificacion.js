export function validarIdentificacion(valor) {
  const limpio = (valor || "").trim().toUpperCase();

  if (!limpio) {
    return {
      esValido: false,
      tipo: "vacio",
      tipoLabel: "Sin ingresar",
      mensaje:
        "Numérica: mínimo 10 dígitos. Alfanumérica: mínimo 6 caracteres.",
    };
  }

  const soloNumeros = /^\d+$/.test(limpio);
  const tieneLetras = /[A-Z]/.test(limpio);
  const alfanumerico = /^(?=.*[A-Z])(?=.*\d)[A-Z0-9-]+$/.test(limpio);

  if (soloNumeros) {
    if (limpio.length >= 10 && limpio.length <= 17) {
      return {
        esValido: true,
        tipo: "numerico",
        tipoLabel: limpio.length === 10 ? "Cédula" : "Identificación numérica",
        mensaje: "Identificación numérica válida.",
      };
    }

    return {
      esValido: false,
      tipo: "numerico",
      tipoLabel: "Numérica",
      mensaje: "La identificación numérica debe tener entre 10 y 17 dígitos.",
    };
  }

  if (alfanumerico || (tieneLetras && limpio.length >= 6)) {
    if (limpio.length >= 6 && limpio.length <= 17) {
      return {
        esValido: true,
        tipo: "alfanumerico",
        tipoLabel: "Pasaporte / alfanumérica",
        mensaje: "Identificación alfanumérica válida.",
      };
    }

    return {
      esValido: false,
      tipo: "alfanumerico",
      tipoLabel: "Alfanumérica",
      mensaje:
        "La identificación alfanumérica debe tener entre 6 y 17 caracteres.",
    };
  }

  return {
    esValido: false,
    tipo: "invalido",
    tipoLabel: "Formato inválido",
    mensaje: "Use solo letras, números o guion. Ejemplo: AB1234 o 0102030405.",
  };
}