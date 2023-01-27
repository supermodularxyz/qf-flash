import { useQuery } from "@tanstack/react-query";
import { parseBytes32String } from "ethers/lib/utils";
import { useWallet } from "providers/WalletProvider";
import { getContract } from "utils/getContract";
import { sum } from "utils/math";
import { calculateMatch } from "utils/qf";

export type Projects = {
  [address: string]: {
    funders: { [address: string]: number };
  };
};

export const useLeaderboard = () => {
  const { wallet } = useWallet();

  return useQuery(
    ["events"],
    async () => {
      const queryStart = Date.now();
      const contract = getContract(wallet);
      const nameByAddress: { [address: string]: string } = {};

      const projects: Projects = {};

      const events = await contract
        .queryFilter(contract.filters.Sent())
        .then((events) => {
          return Promise.all(
            events.map((e) => {
              const { amount, from, to, data } = e.args;

              const name = parseBytes32String(data);
              nameByAddress[from] = name;

              if (!projects[to]) projects[to] = { funders: {} };

              projects[to]!.funders[from] =
                (projects[to]!.funders[from] || 0) + Number(amount);

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
        nameByAddress,
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
