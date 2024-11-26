// Fetch data from dymanic routes 


export const fetchGenForcast = async <T>({date}:{ date: string } , revalidate: number): Promise<T>=> {
  
    const res = await fetch(`${process.env.API_URL}/api/predictions/gens?date=${date}`, {
      next: { revalidate },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch ${date} prediction by gens `);
    }
    const data = await res.json();
    return data.data;
  };