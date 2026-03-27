import { useEffect, useState } from 'react'
import { Header } from '../../../components/layout/Header/Header'
import './style3.css'
import {
  obtenerTurnos,
  obtenerTurnoEnfermeria,
  obtenerTurnoMedico,
} from '../../../shared/turnosStorage'
import {
  enmascararDocumento,
  filtrarPendientesMedico,
  filtrarPendientesTriaje,
  ordenarTurnosEnfermeria,
  ordenarTurnosMedico,
} from '../../../shared/turnosHelpers'

function TurnoList() {
  const [turnos, setTurnos] = useState([])
  useEffect(() => {
    const intervalo = setInterval(() => {
      const data = obtenerTurnos()

      const pendientesTriaje = ordenarTurnosEnfermeria(
        filtrarPendientesTriaje(data)
      )

      const pendientesMedico = ordenarTurnosMedico(
        filtrarPendientesMedico(data)
      )

      setTurnos([...pendientesTriaje, ...pendientesMedico])
    }, 500)

    return () => clearInterval(intervalo)
  }, [])

  return (
    <div>
      <div
        style={{
          background: '#1a498b',
          color: 'white',
          padding: '10px',
          fontWeight: 'bold',
          fontSize: '30px',
          textAlign: 'center',
          marginBottom: '10px',
        }}
      >
        TURNOS
      </div>

      {turnos.map(turno => (
        <div key={turno.id} className="turno-item">
          {turno.codigo}
        </div>
      ))}
    </div>
  )
}

function Turnos() {
  const [turnoActual, setTurnoActual] = useState(null)
  const [turnoFijo, setTurnoFijo] = useState(null)
  const [ultimoLlamado, setUltimoLlamado] = useState(null)

  const hospital = '/img/hospital.jpg';
  useEffect(() => {
    const intervalo = setInterval(() => {
      const turnoEnfermeria = obtenerTurnoEnfermeria()
      const turnoMedico = obtenerTurnoMedico()

      const candidatos = [turnoEnfermeria, turnoMedico].filter(Boolean)

      if (candidatos.length === 0) {
        return
      }

      const ultimo = candidatos.sort((a, b) => {
        const fechaA = new Date(a.llamadoEn || 0).getTime()
        const fechaB = new Date(b.llamadoEn || 0).getTime()
        return fechaB - fechaA
      })[0]

      const identificador = `${ultimo.codigo}-${ultimo.llamadoEn || ''}`

      if (identificador !== ultimoLlamado) {
        setTurnoActual(ultimo)
        setTurnoFijo(ultimo)
        setUltimoLlamado(identificador)

        setTimeout(() => {
          setTurnoActual(null)
        }, 4000)
      }
    }, 500)

    return () => clearInterval(intervalo)
  }, [ultimoLlamado])

  const esMedico =
    turnoActual &&
    turnoActual.area &&
    String(turnoActual.area).toUpperCase() !== 'TRIAJE'

  return (
    <div className="turnos-container">
      <Header />

      <div className="content">
        <div className="left-panel">
          {turnoActual ? (
            <div className={`turno-alerta ${!esMedico ? 'triaje-5' : ''}`}>
              <div className="nuevo-llamado">
                NUEVO LLAMADO
              </div>

              <div className="codigo-turno">
                {turnoActual.codigo}

                {esMedico && turnoActual.documento && (
                  <div style={{ fontSize: '22px', marginTop: '5px' }}>
                    {enmascararDocumento(turnoActual.documento)}
                  </div>
                )}
              </div>

              <div className="mensaje">
                Diríjase a:
              </div>

              <div className="destino">
                {esMedico ? turnoActual.area : 'TRIAJE'}
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

export default Turnos
