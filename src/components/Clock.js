import { useState, useEffect } from 'react';

function Clock(){
  const [time, setTime] = useState(new Date());
  
  function refreshClock() {
    setTime(new Date());
  }
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function clean() {
      clearInterval(timerId);
    };
  }, []);

  const timeCurrent = time.toTimeString().substring(0, 5);
  const timeCurrentHour = time.toTimeString().substring(0, 2);
  
  return (
    <h2>
      {timeCurrent}
      <span className="hour-info">{(timeCurrentHour<12)? "AM" : "PM"}</span>
    </h2>
  );
}
export default Clock;