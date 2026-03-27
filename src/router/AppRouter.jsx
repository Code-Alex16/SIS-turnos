import { Navigate, Route, Routes } from "react-router-dom";

// Plantillas
import KioskoPage from "../feature/Turneros/page/KioskoPage";
import Turnos from "../feature/SalaEspera/pages/tur";
import PanelEnfermeria from "../feature/Enfermeria/pages/PanelEnfermera";
import ErrorPage from "../feature/Error/page/404";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/turnero" replace />} />
      <Route path="/turnero" element={<KioskoPage />} />
      <Route path="/Enfermeria" element={<PanelEnfermeria />} />
      <Route path="/turnos" element={<Turnos slug="tv-turnos" />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default AppRouter;