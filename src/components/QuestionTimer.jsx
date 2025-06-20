import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeout }) {
   const [remainingTime, setRemainingTime] = useState(timeout);

   useEffect(() => {
      console.log('SETTING TIMEOUT');
      const timer = setTimeout(onTimeout, timeout);

      return () => {
         console.log('CLEARING TIMEOUT');
         clearTimeout(timer);
      };
   }, [timeout, onTimeout]);
   

   useEffect(() => {
      console.log('SETTING INTERVAL');
      const interval = setInterval(() => {
         setRemainingTime(prevRemainingTime => prevRemainingTime - 100);
      }, 100);

      return () => {
         console.log('CLEARING INTERVAL');
         clearInterval(interval);
      };
   }, []);


   return (
      <progress id="question-time" max={timeout} value={remainingTime} />
   );
}