// Fetch data from dymanic routes 

export const fetchCollectionData = async <T>(collection:string , revalidate: number): Promise<T>=> {
  console.log(`${process.env.BASE_URL}/api/int/${collection}`)
    const res = await fetch(`${process.env.BASE_URL}/api/int/${collection}`, {
      next: { revalidate },
    });
  
    if (!res.ok) {
      throw new Error(`Failed to fetch ${collection} Data`);
    }
    const data = await res.json();
    return data;
  };