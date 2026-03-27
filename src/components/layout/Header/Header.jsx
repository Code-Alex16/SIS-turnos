import ClockDisplay from "../Clock/ClockDisplay";
import "./header.css";

export function Header({ logoSrc, title }) {
  const logo_reserva = "/logos/MSP.png"
  return (
    <header className="header">

      {/* Izquierda: Logo */}
      <div className="header__logo-area">
        {logoSrc
          ? <img className="header__logo" src={logoSrc} alt="Ministerio de Salud Pública" />
          : <img className="header__logo" src={logo_reserva} alt="Ministerio de Salud Pública" />
        }
      </div>

      {/* Centro: Título */}
      {title && <h1 className="header__title">{title}</h1>}

      {/* Derecha: Reloj */}
      <ClockDisplay />

    </header>
  );
}
