// Helper function to parse date string into Date object
export const parseDate = (dateString: string) => {
    const parsedDate = new Date(dateString);
    if (isNaN(parsedDate.getTime())) {
      throw new Error('Invalid date');
    }
    return parsedDate;
  };