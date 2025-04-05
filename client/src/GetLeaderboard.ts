export type Leaderboard = [string, number][];

export const fetchLeaderboard = async (type: number): Promise<ParsedData | null> => {
  try {
    const response = await fetch(`https://compas-api.derekzhang.ca/leaderboard?type=${type}`);
    const jsonData = await response.json();

    // Parse the data into a single dictionary structure
    const leaderboard: Leaderboard = jsonData.map(({ name, score }: { name: string, score: number }) => [name, score])

    return leaderboard;
  } catch (error) {
    console.error("Error fetching the data:", error);
    return null;
  }
};
