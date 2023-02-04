import { useQuery } from "@tanstack/react-query";
import { useWallet } from "providers/WalletProvider";
import { getContract } from "utils/getContract";
import { sum } from "utils/math";
import { calculateMatch } from "utils/qf";

export type Projects = {
  [address: string]: {
    funders: { [address: string]: number };
  };
};

export type Bees = {
  [address: string]: {
    flowers: { [address: string]: number };
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

      const projects: Projects = {};
      const bees: Bees = {};

      const events = await contract
        .queryFilter(contract.filters.Transfer())
        .then((events) => {
          return Promise.all(
            events
              .filter((e) => e.args.from !== ZERO_ADDRESS)
              .map((e) => {
                console.log(e);
                // return {};
                const { value, from, to } = e.args;

                if (!projects[to]) projects[to] = { funders: {} };

                projects[to]!.funders[from] =
                  (projects[to]!.funders[from] || 0) + Number(value);

                if (!bees[from]) bees[from] = { flowers: {} };

                bees[from]!.flowers[to] =
                  (bees[from]!.flowers[to] || 0) + Number(value);

                return {};
              })
          );
        })
        .catch((err) => {
          console.log("error", err);
          return [];
        });

      const queryEnd = Date.now();
      return {
        bees: mapBeeScores(bees),
        projects: mapProjects(projects),
        queryDuration: queryEnd - queryStart,
        lastUpdated: queryEnd,
      };
    },
    { enabled: Boolean(wallet), refetchInterval: 10000 }
  );
};

const mapProjects = (projects: Projects) => {
  const matches = calculateMatch(projects);
  return Object.entries(projects)
    .map(([address, { funders }]) => ({
      address,
      matching: matches[address],
      amount: sum(Object.values(funders)),
      funders: Object.keys(funders),
    }))
    .sort((a, b) => (Number(a.matching) > Number(b.matching) ? -1 : 1));
};

const mapBeeScores = (bees: Bees) => {
  return Object.entries(bees)
    .map(([address, { flowers }]) => {
      return {
        address,
        visited: Object.keys(flowers).length,
        amount: sum(Object.values(flowers)),
      };
    })
    .sort((a, b) => (a.visited > b.visited ? -1 : 1));
};
