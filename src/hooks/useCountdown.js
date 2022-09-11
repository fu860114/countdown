import {
  useState,
  useCallback,
  useEffect,
  useRef
} from "react";

const SECOND = 1;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const digi = (value) => value < 10 ? "0" + value : "" + value;

/**
  * @param {number} endTime timestamp
  * @returns {
  *   onStart: ()=>void;
  *   onStop: ()=>void;
  *   value: string;  // DD:hh:mm:ss ,when expired, return 'timeup';
  *   isActive: boolean;
  * }
 */
export default function useCountdown(endTime) {
  const [value, setValue] = useState('');
  const [isActive, setActive] = useState(true);

  useEffect(() => {
    let timeId = -1;
    if(isActive) {
      const tick = () => {
        const diffSec = Math.round((endTime - Date.now()) / 1000);
        if (diffSec <= 0) {
          setActive(false);
          setValue("timeup");
          return;
        }
        const sec = diffSec % 60;
        const min = ~~(diffSec / MINUTE % 60);
        const hour = ~~(diffSec / HOUR % 24);
        const day = ~~(diffSec / DAY);
        setValue(`${digi(day)}:${digi(hour)}:${digi(min)}:${digi(sec)}`);
      };
      timeId = window.setInterval(tick, 1000);
      tick();
    }
    return () => {
      if(timeId !== -1) {
        window.clearInterval(timeId);
      }
    }
  }, [isActive]); // eslint-disable-line

  const onStart = useCallback(() => {
    setActive(true);
  }, []);

  const onStop = useCallback(() => {
    setActive(false);
  }, []);

  return {
    onStart,
    onStop,
    value,
    isActive
  };
}
