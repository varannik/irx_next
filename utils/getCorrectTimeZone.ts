export function getCorrectTimeZone(dateStr: Date) {

    // Convert string to Date object
    const dateObj = new Date(dateStr);
  
    // Extract time
    // Extract hour and minutes
    const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
    return timeStr
  }
  