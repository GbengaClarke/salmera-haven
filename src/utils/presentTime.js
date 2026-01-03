import { useEffect, useState } from "react";

export function useClock() {
  const [time, setTime] = useState("");
  const [timezone, setTimezone] = useState("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZoneName: "short",
    });

    const tick = () => {
      const [t, tz] = formatter.format(new Date()).split(" ");
      setTime(t);
      setTimezone(tz);
    };

    tick();

    const now = new Date();
    const msUntilNextMinute = (60 - now.getSeconds()) * 1000;

    const timeoutId = setTimeout(() => {
      tick();

      const intervalId = setInterval(tick, 60_000);

      cleanupRef.current = intervalId;
    }, msUntilNextMinute);

    const cleanupRef = { current: null };

    return () => {
      clearTimeout(timeoutId);
      if (cleanupRef.current) clearInterval(cleanupRef.current);
    };
  }, []);

  return { time, timezone };
}
