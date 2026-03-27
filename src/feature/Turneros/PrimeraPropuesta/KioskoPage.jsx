import { useEffect, useMemo, useRef, useState } from "react";
import HeaderKiosko from "../components/HeaderKiosko";
import TecladoNumerico from "../components/TecladoNumerico";
import PanelTriage from "../components/PanelTriage";
import SelectorServicioModal from "../components/SelectorServicioModal";
import TecladoAlfabeticoModal from "../components/TecladoAlfabeticoModal";
import TurnoModal from "../components/TurnoModal";
import MensajeModal from "../components/MensajeModal";
import { validarIdentificacion } from "../utils/validarIdentificacion";
import { generarTurno } from "../../../shared/turnosStorage";
import "./KioskoPage.css";

const LIMITE_IDENTIFICACION = 17;
const TIEMPO_AUTO_APERTURA = 3000;

function KioskoPage() {
  const [identificacion, setIdentificacion] = useState("");
  const [modalAlfabeticoAbierto, setModalAlfabeticoAbierto] = useState(false);
  const [modalServiciosAbierto, setModalServiciosAbierto] = useState(false);
  const [turnoGenerado, setTurnoGenerado] = useState(null);
  const [mensajeModal, setMensajeModal] = useState(null);

  const autoOpenTimeoutRef = useRef(null);

  const estadoIdentificacion = useMemo(
    () => validarIdentificacion(identificacion),
    [identificacion]
  );

  const agregarCaracter = (caracter) => {
    setIdentificacion((previo) => {
      if (previo.length >= LIMITE_IDENTIFICACION) return previo;
      return `${previo}${caracter}`.toUpperCase();
    });
  };

  const borrarUltimoCaracter = () => {
    setIdentificacion((previo) => previo.slice(0, -1));
  };

  const limpiarTemporizador = () => {
    if (autoOpenTimeoutRef.current) {
      clearTimeout(autoOpenTimeoutRef.current);
      autoOpenTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    limpiarTemporizador();

    if (!identificacion || modalServiciosAbierto || turnoGenerado) return;

    const resultado = validarIdentificacion(identificacion);

    if (!resultado.esValido) return;

    autoOpenTimeoutRef.current = setTimeout(() => {
      setModalServiciosAbierto(true);
    }, TIEMPO_AUTO_APERTURA);

    return () => limpiarTemporizador();
  }, [identificacion, modalServiciosAbierto, turnoGenerado]);

  const generarNuevoTurno = (servicio) => {
    const nuevoTurno = generarTurno({
      servicio,
      identificacion,
    });

    setModalServiciosAbierto(false);
    setTurnoGenerado(nuevoTurno);
    window.dispatchEvent(new Event("turnos-updated"));
  };

  const cerrarModalServicios = () => {
    limpiarTemporizador();
    setModalServiciosAbierto(false);
    setIdentificacion("");
  };

  const reiniciarFlujo = () => {
    limpiarTemporizador();
    setTurnoGenerado(null);
    setIdentificacion("");
    setModalAlfabeticoAbierto(false);
    setModalServiciosAbierto(false);
    setMensajeModal(null);
  };

  return (
    <div className="pantalla-kiosko">
      <HeaderKiosko />

      <div className="cuerpo-kiosko cuerpo-kiosko--sin-servicios">
        <main className="columna-centro columna-centro--amplia">
          <section className="caja-identificacion">
            <div className="caja-identificacion__encabezado">
              <span className="etiqueta-identificacion">
                Ingrese su identificación
              </span>

              <span
                className={`chip-validacion ${
                  estadoIdentificacion.esValido ? "chip-validacion--ok" : ""
                }`}
              >
                {estadoIdentificacion.tipoLabel}
              </span>
            </div>

            <input
              type="text"
              className="input-identificacion"
              value={identificacion}
              readOnly
              placeholder="Cédula, pasaporte o identificación"
              aria-label="Identificación ingresada"
            />

            <p
              className={`texto-ayuda ${
                identificacion && !estadoIdentificacion.esValido
                  ? "texto-ayuda--error"
                  : ""
              }`}
            >
              {identificacion
                ? estadoIdentificacion.mensaje
                : "Numérica: mínimo 10 dígitos. Alfanumérica: mínimo 6 caracteres. Máximo 17."}
            </p>
          </section>

          <TecladoNumerico
            alPresionarNumero={agregarCaracter}
            alAbrirTecladoAlfabetico={() => setModalAlfabeticoAbierto(true)}
            alBorrar={borrarUltimoCaracter}
          />
        </main>

        <aside className="columna-info">
          <PanelTriage />
        </aside>
      </div>

      <TecladoAlfabeticoModal
        abierto={modalAlfabeticoAbierto}
        valorActual={identificacion}
        maxLength={LIMITE_IDENTIFICACION}
        alCerrar={() => setModalAlfabeticoAbierto(false)}
        alAgregarCaracter={agregarCaracter}
        alBorrar={borrarUltimoCaracter}
      />

      <SelectorServicioModal
        abierto={modalServiciosAbierto}
        onClose={cerrarModalServicios}
        onSelect={generarNuevoTurno}
      />

      <TurnoModal
        abierto={Boolean(turnoGenerado)}
        turno={turnoGenerado}
        onClose={reiniciarFlujo}
      />

      <MensajeModal
        abierto={Boolean(mensajeModal)}
        titulo={mensajeModal?.titulo}
        contenido={mensajeModal?.contenido}
        onClose={() => setMensajeModal(null)}
      />
    </div>
  );
}

export default KioskoPage;