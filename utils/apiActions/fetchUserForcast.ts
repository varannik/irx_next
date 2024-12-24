// Fetch data from dymanic routes 


export const fetchUserForcast = async <T>({userId, submitDate}:{ userId: string; submitDate: string } , revalidate: number): Promise<T>=> {

    const res = await fetch(`${process.env.API_URL}/api/predictions/${submitDate}/${userId}`, {
      next: { revalidate },
    });
  
    if (!res.ok) {
      throw new Error(`Failed to fetch ${userId} prediction`);
    }
    const data = await res.json();

    return data.data;
  };