// Helper function to parse date string into Date object
export const parseDate = (dateString: string) => {
    const parsedDate = new Date(dateString);
    const dateOnly = parsedDate.toISOString().split('T')[0];

    if (isNaN(parsedDate.getTime())) {
      throw new Error('Invalid date');
    }
    return dateOnly;
  };