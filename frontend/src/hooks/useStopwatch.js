import { useState, useEffect } from 'react';

const useStopwatch = (initialTime = 0, onTimerEnd = () => {}, onTimerStart = () => {}, onTimerPause = () => {}) => {
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
    onTimerStart();
  };

  const pause = () => {
    setIsRunning(false);
    onTimerPause();
  };

  const reset = () => {
    setTime(initialTime);
    setIsRunning(false);
  };

  const updateTime = (value) => {
    setTime(value);
  };

  const formattedTime = new Date(time * 1000).toISOString().substr(11, 8).toLocaleString('en-US', { minimumIntegerDigits: 2 });

  return { time, start, pause, reset, updateTime, formattedTime };
};

export default useStopwatch;
