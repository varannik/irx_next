// Helper function to parse date string into Date object
export const parseDate = (dateString: string) => {
    const parsedDate = new Date(dateString);

    
    if (isNaN(parsedDate.getTime())) {
      throw new Error('Invalid date');
    }

    // Extract the local date part
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const day = String(parsedDate.getDate()).padStart(2, '0');
    console.log('inside Parse date :', `${year}-${month}-${day}`)
    return `${year}-${month}-${day}`;
  };