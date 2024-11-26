export function getToday() {
    // Create a new Date object for today's date
    const now = new Date();
    
    // Set hours, minutes, seconds, and milliseconds to zero
    now.setUTCHours(0, 0, 0, 0);
    return now
  }



export function getPreviousDay(date = new Date()) {
    const previousDay = new Date(date);
    previousDay.setDate(date.getDate() - 1); // Subtract 1 day
    return previousDay.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  }