export function getToday() {
    // Create a new Date object for today's date
    const now = new Date();
    
    // Set hours, minutes, seconds, and milliseconds to zero
    now.setUTCHours(0, 0, 0, 0);
    return now
  }

  export function get2DayAgo(date = new Date()) {
    const previousDay = new Date(date);
    previousDay.setDate(date.getDate() - 2); // Subtract 1 day
    return previousDay.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  }


export function getPreviousDay(date = new Date()) {
    const previousDay = new Date(date);
    previousDay.setDate(date.getDate() - 1); // Subtract 1 day
    return previousDay.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  }

  export function getCurrentDay(date = new Date()) {
    const previousDay = new Date(date);
    return previousDay.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  }



export function getNextDay(date = new Date()) {
  const previousDay = new Date(date);
  previousDay.setDate(date.getDate() + 1); // Subtract 1 day
  return previousDay.toISOString().split("T")[0]; // Format as YYYY-MM-DD
}

export function addOneDay(dateStr:string) {
  // Convert the date string to a Date object
  let date = new Date(dateStr);

  // Add one day
  date.setDate(date.getDate() + 1);

  // Format the date as YYYY-MM-DD
  return date.toISOString().split('T')[0];
}


export function getCurrentTimeInTehran(): string {
  // Create a date object in the Tehran time zone using Intl.DateTimeFormat
  const tehranTime = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Tehran',
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(new Date());


  return tehranTime;
}



