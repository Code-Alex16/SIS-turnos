import { useState } from 'react'
import './PanelEnfermera.css'

function PanelEnfermera() {

  const logo = '/logos/MSP.png';
  const [vista, setVista] = useState("enfermera")

  const [turnos, setTurnos] = useState([
    { id: 1, codigo: "ET-105", triaje: null },
    { id: 2, codigo: "ET-106", triaje: null },
    { id: 3, codigo: "ET-107", triaje: null },
    { id: 4, codigo: "ET-108", triaje: null },
    { id: 5, codigo: "ET-109", triaje: null }
  ])

  const asignarTriaje = (id, nivel) => {
    setTurnos(prev =>
      prev.map(t =>
        t.id === id ? { ...t, triaje: nivel } : t
      )
    )
  }

  const llamarTurno = (turno) => {

    let nuevoTurno = {}

    // 🔥 DIFERENCIAR CORRECTAMENTE
    if (vista === "enfermera") {
      // SOLO TRIAJE
      nuevoTurno = {
        codigo: turno.codigo
      }
    }

    if (vista === "medico") {
      // SOLO MÉDICO
      nuevoTurno = {
        codigo: turno.codigo,
        area: "Consultorio 1",
        triaje: turno.triaje
      }
    }

    console.log("ENVIANDO:", nuevoTurno)

    localStorage.setItem("turnoActual", JSON.stringify(nuevoTurno))
  }

  const turnosFiltrados = turnos.filter(t =>
    vista === "enfermera" ? t.triaje === null : t.triaje !== null
  )

  const turnosOrdenados = [...turnosFiltrados].sort((a, b) => {
    if (vista === "medico") {
      return a.triaje - b.triaje
    }
    return a.id - b.id
  })

  return (
    <div className="panel-pro">

      <div className="header-pro">
        <div className="logo-area">
          <img src={logo} alt="logo" />
        </div>

        <h2>Hospital de Especialidades <br/>Portoviejo</h2>
      </div>

      <div className="selector">
        <button 
          className={vista === "enfermera" ? "activo" : ""}
          onClick={() => setVista("enfermera")}
        >
          Enfermería
        </button>

        <button 
          className={vista === "medico" ? "activo" : ""}
          onClick={() => setVista("medico")}
        >
          Médico
        </button>
      </div>

      <div className="contenido-pro">

        <div className="panel-izq">

          <div className="titulo">
            {vista === "enfermera" ? "Asignar Triaje" : "Pacientes por Prioridad"}
          </div>

          <div className="lista">

            {turnosOrdenados.map(turno => (
              <div 
                key={turno.id}
                className={`item 
                  ${turno.triaje ? `triaje-${turno.triaje}` : "blanco"}
                `}
              >

                <span>{turno.codigo}</span>

                <div className="acciones">

                  {vista === "enfermera" && (
                    <select
                      className="select-triaje"
                      onChange={(e) => asignarTriaje(turno.id, Number(e.target.value))}
                      defaultValue=""
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