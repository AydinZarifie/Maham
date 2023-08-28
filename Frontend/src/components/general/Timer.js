import React, { useState, useEffect } from "react";

const Timer = ({ onFinish }) => {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      onFinish();
    }
  }, [seconds, onFinish]);

  return <>{seconds === 0 ? "" : `${seconds}s`}</>;
};

export default Timer;
