// Hooks/useClock.hs
import { useEffect, useState } from "react";

const getNow = () => {
  const now = new Date();
  return {
    time: now.toLocaleTimeString("es-EC", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }),
    date: now.toLocaleDateString("es-EC", {
      year: "numeric",
      month: "long",
      day: "2-digit"
    })
  };
};

export function useClock() {

  const [clock, setClock] = useState(getNow);

  useEffect(() => {
    const interval = setInterval(() => setClock(getNow()), 1000)
    return () => clearInterval(interval);
  }, []);

  return clock; // {time, date}
}