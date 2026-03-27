import { useEffect, useState } from 'react'
import { Header } from "../../../components/layout/Header/Header";
import TurnoList from '../components/TurnoList'
import './style3.css'

function Turnos() {
  const hospital = '/img/hospital.jpg';
  const logoSrc = '/logos/MSP.png';
  const [turnoActual, setTurnoActual] = useState(null)

  useEffect(() => {

    const intervalo = setInterval(() => {

      const data = localStorage.getItem("turnoActual")

      if (data) {
        const turno = JSON.parse(data)

        const turnoLimpio = {
          codigo: turno.codigo || "SIN-CODIGO",
          area: turno.area || null,
          triaje: turno.triaje ?? null
        }

        setTurnoActual(turnoLimpio)

        setTimeout(() => {
          setTurnoActual(null)
          localStorage.removeItem("turnoActual")
        }, 6000)
      }

    }, 500)

    return () => clearInterval(intervalo)

  }, [])

  const esMedico =
    turnoActual &&
    turnoActual.area &&
    turnoActual.triaje !== null

  return (
    <div className="turnos-container">

      <Header logoSrc={logoSrc}/>

      <div className="content">

        {/* IZQUIERDA */}
        <div className="left-panel">

          {/* 🔥 SIEMPRE EXISTE EL BLOQUE */}
          {turnoActual ? (
            <div className={`turno-alerta triaje-${turnoActual.triaje || 5}`}>

              <div className="nuevo-llamado">
                NUEVO LLAMADO
              </div>

              <div className="codigo-turno">
                {turnoActual.codigo}
              </div>

              <div className="mensaje">
                Diríjase a:
              </div>

              <div className="triaje">
                {esMedico ? turnoActual.area : "TRIAJE"}
              </div>

              {esMedico && (
                <div className="triaje">
                  TRIAJE {turnoActual.triaje}
                </div>
              )}

            </div>
          ) : (
            <img src={hospital} className="hospital-img" alt="Hospital" />
          )}

          {/* TURNO ABAJO */}
          <div className="turno-card">
            {turnoActual ? turnoActual.codigo : "ET-93"}
          </div>

        </div>

        {/* DERECHA */}
        <div className="right-panel">
          <TurnoList />
        </div>
        
      </div>

    </div>
  )
}

export default Turnos