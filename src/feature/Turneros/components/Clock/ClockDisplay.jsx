import { useClock } from "../../hooks/useClock";
import "./Clock.css";

function ClockDisplay() {
  const { time, date } = useClock();
  const clockIcon = '/icons/Header/clock_White.svg'
  return (
    <div className="clock">
      <div className="clock__time">
        {
          clockIcon ? <img src={clockIcon} alt="reloj" className="clock__icon" /> : <span className="clock__icon">🕐</span>
        }
        <span className="clock__digits">{time}</span>
      </div>
      <div className="clock__date">
        {date}
      </div>
    </div>
  );
}

export default ClockDisplay;