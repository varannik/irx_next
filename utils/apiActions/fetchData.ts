// Fetch data from dymanic routes 

export const fetchCollectionData = async <T>(collection:string , revalidate: number): Promise<T>=> {
    const res = await fetch(`${process.env.API_URL}/api/int/${collection}`, {
      next: { revalidate },
    });
  
    if (!res.ok) {
      throw new Error(`Failed to fetch ${collection} Data`);
    }
    const data = await res.json();
    return data;
  };