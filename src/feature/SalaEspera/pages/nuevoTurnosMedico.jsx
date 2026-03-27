import { useEffect, useState } from 'react'
import {Header} from '../../../components/layout/Header/Header'
import './style3.css'
import { obtenerTurnos, obtenerTurnoMedico } from '../../../shared/turnosStorage'
import {
  enmascararDocumento,
  filtrarPendientesMedico,
  ordenarTurnosMedico,
} from '../../../shared/turnosHelpers'

function TurnoList() {
  const [turnos, setTurnos] = useState([])

  useEffect(() => {
    const intervalo = setInterval(() => {
      const data = obtenerTurnos()
      const filtrados = ordenarTurnosMedico(filtrarPendientesMedico(data))
      setTurnos(filtrados)
    }, 500)

    return () => clearInterval(intervalo)
  }, [])

  return (
    <div>
      <div className="titulo-turnos">TURNOS</div>

      {turnos.map(turno => (
        <div key={turno.id} className="turno-item">
          {turno.codigo}
        </div>
      ))}
    </div>
  )
}

function TurnosMedico() {
  const [turnoActual, setTurnoActual] = useState(null)
  const [turnoFijo, setTurnoFijo] = useState(null)
  const [ultimoCodigo, setUltimoCodigo] = useState(null)

  const hospital = '/img/hospital.jpg'
  useEffect(() => {
    const intervalo = setInterval(() => {
      const turno = obtenerTurnoMedico()

      if (turno?.codigo && turno.codigo !== ultimoCodigo) {
        setTurnoActual(turno)
        setTurnoFijo(turno)
        setUltimoCodigo(turno.codigo)

        setTimeout(() => {
          setTurnoActual(null)
        }, 4000)
      }
    }, 500)

    return () => clearInterval(intervalo)
  }, [ultimoCodigo])

  return (
    <div className="turnos-container">
      <Header />

      <div className="content">
        <div className="left-panel">
          {turnoActual ? (
            <div className="turno-alerta">
              <div className="nuevo-llamado">
                NUEVO LLAMADO
              </div>

              <div className="codigo-turno">
                {turnoActual.codigo}

                {turnoActual.documento && (
                  <div style={{ fontSize: '22px', marginTop: '5px' }}>
                    {enmascararDocumento(turnoActual.documento)}
                  </div>
                )}
              </div>

              <div className="mensaje">
                Diríjase a:
              </div>

              <div className="destino">
                {turnoActual.area || 'CONSULTORIO 1'}
              </div>
            </div>
          ) : (
            <img src={hospital} className="hospital-img" alt="Hospital" />
          )}

          <div className="turno-card">
            {turnoFijo ? turnoFijo.codigo : ''}
          </div>
        </div>

        <div className="right-panel">
          <TurnoList />
        </div>
      </div>
    </div>
  )
}

export default TurnosMedico
