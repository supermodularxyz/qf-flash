import { useQuery } from "@tanstack/react-query";
import { useWallet } from "providers/WalletProvider";
import { getContract } from "utils/getContract";
import { sum } from "utils/math";
import { calculateMatch } from "utils/qf";

export type Scores = {
  [address: string]: {
    amounts: { [address: string]: number };
  };
};

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export const useLeaderboard = () => {
  const { wallet } = useWallet();

  return useQuery(
    ["events"],
    async () => {
      const queryStart = Date.now();
      const contract = getContract(wallet);

      const bees: Scores = {};
      const flowers: Scores = {};

      await contract
        // Fetch all Transfer events
        .queryFilter(contract.filters.Transfer())
        .then((events) =>
          Promise.all(
            events
              // Filter out initial minting transfers
              .filter((e) => e.args.from !== ZERO_ADDRESS)
              .map((e) => {
                const { value, from, to } = e.args;

                // Init empty objects
                if (!bees[from]) bees[from] = { amounts: {} };
                if (!flowers[to]) flowers[to] = { amounts: {} };

                // Add token amounts
                flowers[to]!.amounts[from] =
                  (flowers[to]!.amounts[from] || 0) + Number(value);

                bees[from]!.amounts[to] =
                  (bees[from]!.amounts[to] || 0) + Number(value);

                return {};
              })
          )
        )
        .catch((err) => {
          console.log("Error building leaderboard data: ", err);
        });

      const queryEnd = Date.now();
      return {
        bees: mapBeeScores(bees),
        flowers: mapFlowerScores(flowers),
        queryDuration: queryEnd - queryStart,
        lastUpdated: queryEnd,
      };
    },
    { enabled: Boolean(wallet), refetchInterval: 10000 }
  );
};

const mapFlowerScores = (flowers: Scores) => {
  const matches = calculateMatch(flowers);
  return Object.entries(flowers)
    .map(([address, { amounts }]) => ({
      address,
      matching: matches[address],
      amount: sum(Object.values(amounts)),
      funders: Object.keys(amounts),
    }))
    .sort((a, b) => (Number(a.matching) > Number(b.matching) ? -1 : 1));
};

const mapBeeScores = (bees: Scores) => {
  return Object.entries(bees)
    .map(([address, { amounts }]) => {
      return {
        address,
        visited: Object.keys(amounts).length,
        amount: sum(Object.values(amounts)),
      };
    })
    .sort((a, b) => {
      if (a.visited === b.visited) {
        return a.amount > b.amount ? -1 : 1;
      }
      return a.visited > b.visited ? -1 : 1;
    });
};
