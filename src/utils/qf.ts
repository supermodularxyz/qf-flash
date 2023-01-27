import { Projects } from "hooks/useLeaderboard";

export const calculateMatch = (projects: Projects) => {
  let summed = 0;
  const matches = {} as { [address: string]: number };

  Object.entries(projects).map(([address, { amounts = [] }]) => {
    let sumAmount = 0;

    amounts.map((num: number) => (sumAmount += Math.sqrt(num)));
    sumAmount *= sumAmount;
    matches[address] = sumAmount;
    summed += sumAmount;
  });

  const divisor = 2000 / summed;

  Object.entries(projects).map(([address]) => (matches[address] *= divisor));

  return matches;
};
