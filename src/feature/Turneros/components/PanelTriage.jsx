import React from 'react';
import { coloresTriageMock } from '../data/kioskoMockData';
import ilustracionMedica from '../assets/ilustracion-medica.jpeg';
import './PanelTriage.css';

function PanelTriage() {
  return (
    <div className="panel-triage">
      <h3 className="titulo-informate">Infórmate</h3>
      
      <div className="lista-triage">
        {coloresTriageMock.map(color => (
          <div key={color.id} className="fila-triage">
            <div 
              className="caja-color" 
              style={{ 
                backgroundColor: color.colorFondo, 
                color: color.textoBlanco ? "white" : "black" 
              }}
            >
              {color.nombre}
            </div>
            <div className="caja-descripcion">
              <span className="urgencia-texto" style={{ color: color.colorFondo }}>
                {color.urgencia}
              </span>
              <span className="tiempo-texto">{color.tiempo}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="ilustracion-medica">
        <img src={ilustracionMedica} alt="Ilustración Médica de Emergencias" className="imagen-ilustrativa" />
      </div>
    </div>
  );
}

export default PanelTriage;