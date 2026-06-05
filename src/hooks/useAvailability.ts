import { useState, useEffect } from 'react';

export function useAvailability() {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const checkAvailability = () => {
      const now = new Date();
      // Current time in PKT timezone (Asia/Karachi, UTC+5)
      const pktDateString = now.toLocaleString("en-US", { timeZone: "Asia/Karachi" });
      const pktDate = new Date(pktDateString);
      
      const day = pktDate.getDay(); // 0 for Sunday
      const hour = pktDate.getHours();
      
      let online = false;
      
      if (day !== 0) { // Monday to Saturday
        const isMorningShift = hour >= 8 && hour < 11;
        const isAfternoonShift = hour >= 15 && hour < 17;
        
        if (isMorningShift || isAfternoonShift) {
          online = true;
        }
      }
      
      setIsOnline(online);
    };

    checkAvailability();
    const interval = setInterval(checkAvailability, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  return isOnline;
}
