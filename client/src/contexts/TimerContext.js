//전역 타이머 상태 저장 (책 별 타이머 관리)
import { createContext, useContext, useState, useEffect } from 'react';
import useInterval from '../hooks/UseInterval';

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {

  //북id 별로 관리
  const [timers, setTimers] = useState({}); // { [bookId]: { seconds, isRunning } }
  
  const start = (bookId) => {
    setTimers((prev) => ({
      ...prev,
      [bookId]: { ...(prev[bookId] || { seconds: 0 }), isRunning: true },
    }));
  };
    const pause = (bookId) => {
    setTimers((prev) => ({
      ...prev,
      [bookId]: { ...prev[bookId], isRunning: false },
    }));
  };

  const reset = (bookId) => {
    setTimers((prev) => ({
      ...prev,
      [bookId]: { seconds: 0, isRunning: false },
    }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) => {
        const updated = { ...prev };
        Object.entries(prev).forEach(([bookId, timer]) => {
          if (timer.isRunning) {
            updated[bookId] = {
              ...timer,
              seconds: timer.seconds + 1,
            };
          }
        });
        return updated;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (sec) => {
    //NaN뜨는 현상 방지..
    if (typeof sec !== 'number' || isNaN(sec)) return '00:00:00';

    const hrs = String(Math.floor(sec / 3600)).padStart(2, '0');
    const mins = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
    const secs = String(sec % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };  
/*
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  //useInterval 커스텀 훅 사용
  useInterval(() => {
    setSeconds((prev) => prev + 1);
  }, isRunning ? 1000 : null);

  
  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setSeconds(0);
  };
*/
  return (
    <TimerContext.Provider
      value={{
        //isRunning,
        //seconds,
        //formattedTime: formatTime(seconds),
        timers,
        start,
        pause,
        reset,
        formatTime,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => useContext(TimerContext);