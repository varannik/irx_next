// Fetch data from dymanic routes 


export const fetchUserHist = async <T>({userId, limit}:{ userId: string; limit: number } , revalidate: number): Promise<T>=> {

    const res = await fetch(`${process.env.API_URL}/api/predictions/hist?id="${userId}"&limit=${limit}`, {
      next: { revalidate },
    });
  
    if (!res.ok) {
      throw new Error(`Failed to fetch ${userId} prediction`);
    }
    const data = await res.json();
    return data.data;
  };