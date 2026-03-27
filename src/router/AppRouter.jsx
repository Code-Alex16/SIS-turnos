import { Navigate, Route, Routes } from "react-router-dom";

// Plantillas
import KioskoPage from "../feature/Turneros/PrimeraPropuesta/KioskoPage";
import TurnoGeneral from "../feature/SalaEspera/pages/nuevoTurnosGeneral";
import TurnosEnfermeria from "../feature/SalaEspera/pages/nuevoTurnoEnfermeria";
import TurnosMedicos from "../feature/SalaEspera/pages/nuevoTurnosMedico";
import PanelEnfermeria from "../feature/Enfermeria/pages/PanelEnfermera";
import ErrorPage from "../feature/Error/page/404";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/turnero" replace />} />
      <Route path="/turnero" element={<KioskoPage />} />
      <Route path="/Enfermeria" element={<PanelEnfermeria />} />
      <Route path="/turnos" element={<TurnoGeneral />} />      
      <Route path="/turnos-medicos" element={<TurnosMedicos />} />
      <Route path="/turnos-enfermeria" element={<TurnosEnfermeria />} />

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default AppRouter;