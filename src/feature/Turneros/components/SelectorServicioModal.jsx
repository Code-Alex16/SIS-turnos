import React from "react";
import TarjetaServicio from "../components/TarjetaServicio";
import { serviciosMock } from "../data/kioskoMockData";
import "../styles/KioskoPage.css";

function SelectorServicioModal({ abierto, onClose, onSelect }) {
  if (!abierto) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-contenido modal-contenido--servicios" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-simple">
          <div>
            <h2 className="modal-titulo">Seleccione su servicio</h2>
            <p className="modal-subtitulo">Al tocar una tarjeta, el turno se generará automáticamente.</p>
          </div>
          <button type="button" className="modal-cerrar-x" onClick={onClose}>×</button>
        </div>

        <div className="lista-servicios-modal">
          {serviciosMock.map((servicio) => (
            <TarjetaServicio
              key={servicio.id}
              datos={servicio}
              estaSeleccionada={false}
              funcionAlHacerClic={() => onSelect(servicio)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default React.memo(SelectorServicioModal);
