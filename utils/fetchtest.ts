

export const fetchCollectionData = async <T>(collection:string , revalidate: number): Promise<T>=> {
    const res = await fetch(`${process.env.BASE_URL}/api/int/trends`, {
      next: { revalidate }, // Set cache to revalidate every 10 minutes
    });
  
    if (!res.ok) {
      throw new Error(`Failed to fetch ${collection} Data`);
    }
    const result = await res.json();
    const data = result[0]
    return data;
  };