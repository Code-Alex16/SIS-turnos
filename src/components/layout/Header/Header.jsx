import ClockDisplay from "../Clock/ClockDisplay";
import "./header.css";

export function Header({ logoSrc, title }) {
  return (
    <header className="header">

      {/* Izquierda: Logo */}
      <div className="header__logo-area">
        {logoSrc
          ? <img className="header__logo" src={logoSrc} alt="Ministerio de Salud Pública" />
          : <p className="header__logo-fallback">Ministerio de Salud Pública</p>
        }
      </div>

      {/* Centro: Título */}
      {title && <h1 className="header__title">{title}</h1>}

      {/* Derecha: Reloj */}
      <ClockDisplay />

    </header>
  );
}
