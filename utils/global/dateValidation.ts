
type date = null | string 

export function isValidDate(dateString:date) {
    // Check for null, undefined, or empty string
    if (!dateString || typeof dateString !== "string") {
      return false;
    }
  
    // Attempt to parse the string into a Date object
    const date = new Date(dateString);
  
    // Check if the Date object is valid
    if (isNaN(date.getTime())) {
      return false; // Invalid date
    }
  
    // Additional check: Ensure the input string matches a specific date format (e.g., YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(dateString);
  }