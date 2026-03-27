import { useState } from "react";
import HeaderKiosko from "../components/HeaderKiosko";
import TarjetaServicio from "../components/TarjetaServicio";
import TecladoNumerico from "../components/TecladoNumerico";
import PanelTriage from "../components/PanelTriage";
import { serviciosMock } from "../data/kioskoMockData";
import "../styles/KioskoPage.css";

function KioskoPage() {
  const [cedulaIngresada, setCedulaIngresada] = useState("");
  const [idServicioSeleccionado, setIdServicioSeleccionado] = useState(null);
  const [modalConfig, setModalConfig] = useState(null);

  const manejarIngresoNumero = (numero) => {
    if (cedulaIngresada.length < 10) {
      setCedulaIngresada(cedulaIngresada + numero);
    }
  };

  const manejarBorrado = () => {
    if (cedulaIngresada.length > 0) {
      setCedulaIngresada(cedulaIngresada.slice(0, -1));
    }
  };

  const manejarImpresion = () => {
    if (idServicioSeleccionado === null) {
      setModalConfig({
        tipo: "aviso",
        titulo: "AVISO",
        contenido: "Por favor, seleccione un tipo de turno a la izquierda."
      });
      return;
    }
    
    if (cedulaIngresada.length === 0) {
      setModalConfig({
        tipo: "aviso",
        titulo: "AVISO",
        contenido: "Por favor, ingrese su número de cédula en el teclado."
      });
      return;
    }

    let prefijo = "ET";
    if (idServicioSeleccionado === "procedimientos") {
      prefijo = "PR";
    } else if (idServicioSeleccionado === "triaje-prioritario") {
      prefijo = "TG";
    }

    const numeroAleatorio = Math.floor(Math.random() * 999) + 1;
    const numeroFormateado = String(numeroAleatorio).padStart(3, '0');
    const codigoFinal = `${prefijo} - ${numeroFormateado}`;
    
    setModalConfig({
      tipo: "turno",
      titulo: "TURNO",
      contenido: codigoFinal
    });
  };

  const cerrarModal = () => {
    if (modalConfig && modalConfig.tipo === "turno") {
      setCedulaIngresada("");
      setIdServicioSeleccionado(null);
    }
    setModalConfig(null);
  };

  return (
    <div className="pantalla-kiosko">
      <HeaderKiosko />
      
      <div className="cuerpo-kiosko">
        <div className="columna-servicios">
          {serviciosMock.map(servicio => (
            <TarjetaServicio 
              key={servicio.id}
              datos={servicio}
              estaSeleccionada={idServicioSeleccionado === servicio.id}
              funcionAlHacerClic={setIdServicioSeleccionado}
            />
          ))}
        </div>

        <div className="columna-centro">
          <div className="caja-cedula">
            <span className="etiqueta-cedula">Ingrese su Cédula:</span>
            <input 
              type="text" 
              className="input-cedula"
              value={cedulaIngresada} 
              readOnly 
              placeholder="- - - - - - - - -"
            />
          </div>
          <TecladoNumerico 
            alPresionarNumero={manejarIngresoNumero}
            alBorrar={manejarBorrado}
            alImprimir={manejarImpresion}
          />
        </div>

        <div className="columna-info">
          <PanelTriage />
        </div>
      </div>

      {modalConfig && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <h2 className="modal-titulo">{modalConfig.titulo}</h2>
            <div className={modalConfig.tipo === "turno" ? "modal-codigo" : "modal-mensaje"}>
              {modalConfig.contenido}
            </div>
            <button className="modal-boton" onClick={cerrarModal}>
              CERRAR
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default KioskoPage;