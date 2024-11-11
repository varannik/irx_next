export function getToday() {
    // Create a new Date object for today's date
    const now = new Date();
    
    // Set hours, minutes, seconds, and milliseconds to zero
    now.setUTCHours(0, 0, 0, 0);
    return now
  }