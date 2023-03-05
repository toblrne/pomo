import { useState, useEffect } from 'react';

const useStopwatch = (initialTime = 0, onTimerEnd = () => {}) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            setIsRunning(false);
            onTimerEnd();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, onTimerEnd]);

  useEffect(() => {
    setTime(initialTime);
  }, [initialTime]);

  const start = () => {
    setIsRunning(true);
  };

  const pause = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setTime(initialTime);
    setIsRunning(false);
  };

  const setTimeValue = (value) => {
    setTime(value);
  };

  return { time, start, pause, reset, setTimeValue };
};

export default useStopwatch;