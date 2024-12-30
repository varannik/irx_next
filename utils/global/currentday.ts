

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


export function getTehranDate(preday:number){


  let nowInTehran = getCurrentTimeInTehran()

  // Parse the date string into components
  const [datePart, timePart] = nowInTehran.split(", ");
  const [month, day, year] = datePart.split("/");

  // Reformat to the desired format
  const formattedDateTime = `${year}-${month}-${day}`;

  // Parse the date string into a Date object
  const date = new Date(formattedDateTime);
  
  // Subtract one day (24 hours)
  date.setDate(date.getDate() + preday);

  // Extract the local date part
  const yearN = date.getFullYear();
  const monthN = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
  const dayN = String(date.getDate()).padStart(2, '0');

  return `${yearN}-${monthN}-${dayN}`;



}

export function getSubmitionDate(){

  let dateTimeString = getCurrentTimeInTehran()
  const tsdate = new Date(dateTimeString);
  const hour = tsdate.getHours();


  if (hour > 9) {

    return getTehranDate(1)

  } else {

    return getTehranDate(0)
  }

}



export function getSubmitionDateUI(){

  const dateTimeString = getCurrentTimeInTehran()
  const tsdate = new Date(dateTimeString);
  const hour = tsdate.getHours();


  if (hour > 9) {

    return getTehranDate(2)

  } else {

    return getTehranDate(1)
  }

}




