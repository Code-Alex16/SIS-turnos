import { useMemo, useState } from "react";
import HeaderKiosko from "../components/HeaderKiosko";
import TecladoNumerico from "../components/TecladoNumerico";
import PanelTriage from "../components/PanelTriage";
import SelectorServicioModal from "../components/SelectorServicioModal";
import TecladoAlfabeticoModal from "../components/TecladoAlfabeticoModal";
import TurnoModal from "../components/TurnoModal";
import MensajeModal from "../components/MensajeModal";
import { validarIdentificacion } from "../utils/validarIdentificacion";
import "./KioskoPage.css";

const LIMITE_IDENTIFICACION = 17;

function KioskoPage() {
  const [identificacion, setIdentificacion] = useState("");
  const [modalAlfabeticoAbierto, setModalAlfabeticoAbierto] = useState(false);
  const [modalServiciosAbierto, setModalServiciosAbierto] = useState(false);
  const [turnoGenerado, setTurnoGenerado] = useState(null);
  const [mensajeModal, setMensajeModal] = useState(null);

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

  const abrirServicios = () => {
    const resultado = validarIdentificacion(identificacion);

    if (!resultado.esValido) {
      setMensajeModal({
        titulo: "Identificación inválida",
        contenido: resultado.mensaje,
      });
      return;
    }

    setModalServiciosAbierto(true);
  };

  const generarTurno = (servicio) => {
    const prefijos = {
      "triaje-general": "TR",
      procedimientos: "PR",
      "triaje-prioritario": "TG",
    };

    const numero = String(Math.floor(Math.random() * 999) + 1).padStart(3, "0");

    setModalServiciosAbierto(false);
    setTurnoGenerado({
      codigo: `${prefijos[servicio.id] || "TK"}-${numero}`,
      servicio,
      identificacion,
    });
  };

  const reiniciarFlujo = () => {
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
              <span className="etiqueta-identificacion">Ingrese su identificación</span>
              <span className={`chip-validacion ${estadoIdentificacion.esValido ? "chip-validacion--ok" : ""}`}>
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

            <p className={`texto-ayuda ${identificacion && !estadoIdentificacion.esValido ? "texto-ayuda--error" : ""}`}>
              {identificacion
                ? estadoIdentificacion.mensaje
                : "Numérica: mínimo 10 dígitos. Alfanumérica: mínimo 6 caracteres. Máximo 17."}
            </p>
          </section>

          <TecladoNumerico
            alPresionarNumero={agregarCaracter}
            alBorrar={borrarUltimoCaracter}
            alAbrirTecladoAlfabetico={() => setModalAlfabeticoAbierto(true)}
            alContinuar={abrirServicios}
            deshabilitarContinuar={identificacion.length === 0}
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
        onClose={() => setModalServiciosAbierto(false)}
        onSelect={generarTurno}
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
