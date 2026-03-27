import { useState, useEffect } from 'react'
import './PanelEnfermera.css'
import { Header } from '../../../components/layout/Header/Header'
import {
  asignarTriaje as guardarTriaje,
  eliminarTurno,
  llamarTurnoEnfermeria,
  llamarTurnoMedico,
  obtenerTurnos,
} from '../../../shared/turnosStorage'
import {
  filtrarPendientesMedico,
  filtrarPendientesTriaje,
  obtenerClaseTriaje,
  ordenarTurnosEnfermeria,
  ordenarTurnosMedico,
} from '../../../shared/turnosHelpers'

function PanelEnfermera() {
  const [vista, setVista] = useState('enfermera')
  const [turnos, setTurnos] = useState([])
  const logo = '/logos/MSP.png'
  useEffect(() => {
    const intervalo = setInterval(() => {
      setTurnos(obtenerTurnos())
    }, 500)

    return () => clearInterval(intervalo)
  }, [])

  const recargarTurnos = () => {
    setTurnos(obtenerTurnos())
  }

  const asignarTriaje = (id, nivel) => {
    guardarTriaje(id, Number(nivel))
    recargarTurnos()
  }

  const llamarTurno = (turno) => {
    if (vista === 'enfermera') {
      llamarTurnoEnfermeria(turno)
      recargarTurnos()
      return
    }

    if (!turno.triaje) {
      alert('Debe asignar triaje antes de llamar al médico')
      return
    }

    llamarTurnoMedico(turno, 'CONSULTORIO 1')
    eliminarTurno(turno.id)
    recargarTurnos()
  }

  const turnosFiltrados =
    vista === 'enfermera'
      ? ordenarTurnosEnfermeria(filtrarPendientesTriaje(turnos))
      : ordenarTurnosMedico(filtrarPendientesMedico(turnos))

  return (
    <div className="panel-pro">
      <Header logo={logo}/>

      <div className="selector">
        <button
          className={vista === 'enfermera' ? 'activo' : ''}
          onClick={() => setVista('enfermera')}
        >
          Enfermería
        </button>

        <button
          className={vista === 'medico' ? 'activo' : ''}
          onClick={() => setVista('medico')}
        >
          Médico
        </button>
      </div>

      <div className="contenido-pro">
        <div className="panel-izq">
          <div className="titulo">
            Pacientes
          </div>

          <div className="lista">
            {turnosFiltrados.length === 0 && (
              <p className="sin-turnos">No hay turnos</p>
            )}

            {turnosFiltrados.map(turno => (
              <div
                key={turno.id}
                className={`item ${obtenerClaseTriaje(turno.triaje) || 'blanco'}`}
              >
                <span>{turno.codigo}</span>

                <div className="acciones">
                  {vista === 'enfermera' && (
                    <select
                      className="select-triaje"
                      onChange={(e) => asignarTriaje(turno.id, e.target.value)}
                      value={turno.triaje || ''}
                    >
                      <option value="" disabled>Triaje</option>
                      <option value="1">🔴 1</option>
                      <option value="2">🟠 2</option>
                      <option value="3">🟡 3</option>
                      <option value="4">🟢 4</option>
                      <option value="5">🔵 5</option>
                    </select>
                  )}

                  <button
                    className="btn-llamar"
                    onClick={() => llamarTurno(turno)}
                  >
                    🔊
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel-der">
          <div className="video-box">
            INFORMACIÓN / VIDEO
          </div>
        </div>
      </div>
    </div>
  )
}

export default PanelEnfermera
