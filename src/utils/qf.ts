import { Projects } from "hooks/useLeaderboard";

const MATCHING_POOL = Number(process.env.MATCHING_POOL) || 10_000;
export const calculateMatch = (projects: Projects) => {
  let summed = 0;
  const matches = {} as { [address: string]: number };

  Object.entries(projects).map(([address, { funders = {} }]) => {
    let sumAmount = 0;

    Object.entries(funders).map(
      ([funder, amount]: [string, number]) => (sumAmount += Math.sqrt(amount))
    );
    sumAmount *= sumAmount;
    matches[address] = sumAmount;
    summed += sumAmount;
  });

  const divisor = MATCHING_POOL / summed;

  Object.entries(projects).map(([address]) => (matches[address] *= divisor));

  return matches;
};
