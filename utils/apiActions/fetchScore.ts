
export const fetchScore = async <T>( revalidate: number): Promise<T>=> {

    const res = await fetch(`${process.env.API_URL}/api/analytics/score/last`, {
      next: { revalidate },
    });
    console.log(res)
    if (!res.ok) {
      throw new Error('Failed to fetch  score for');
    }
    const data = await res.json();
    return data;
  };

