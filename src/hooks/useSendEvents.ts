import { useQuery } from "@tanstack/react-query";
import { parseBytes32String } from "ethers/lib/utils";
import { useWallet } from "providers/WalletProvider";
import { getContract } from "utils/getContract";

export const useSendEvents = () => {
  const { wallet } = useWallet();

  return useQuery(
    ["events"],
    async () => {
      const queryStart = Date.now();
      const contract = getContract(wallet);
      const nameByAddress: { [address: string]: string } = {};
      const amountByAddress: { [address: string]: number } = {};
      const votesByAddress: { [address: string]: string } = {};

      const projects: {
        [address: string]: {
          amount: number;
          funders: Set<string>;
          lastFunded: number;
        };
      } = {};

      const events = await contract
        .queryFilter(contract.filters.Sent())
        .then((events) => {
          return Promise.all(
            events.map((e) => {
              const { amount, from, to, data } = e.args;
              const name = parseBytes32String(data);
              // const block = await wallet?.provider.getBlock(e.blockNumber);
              // const timestamp = block ? block?.timestamp * 1000 : 0;

              nameByAddress[from] = name;

              if (!projects[to])
                projects[to] = {
                  amount: 0,
                  funders: new Set(),
                  lastFunded: 0,
                };

              projects[to]!.amount = projects[to]!.amount += Number(amount);
              projects[to]!.funders.add(from);
              // projects[to]!.lastFunded =
              //   timestamp >= projects[to]!.lastFunded
              //     ? timestamp
              //     : projects[to]!.lastFunded;

              return {
                amount: amount.toString(),
                from,
                to,
                name,
                // timestamp: block ? new Date(block?.timestamp * 1000) : null,
              };
            })
          );
        })
        .catch((err) => {
          console.log("error", err);
          return [];
        });

      const queryEnd = Date.now();
      return {
        events,
        nameByAddress,
        amountByAddress,
        votesByAddress,
        projects,
        queryDuration: queryEnd - queryStart,
        lastUpdated: queryEnd,
      };
    },
    { enabled: Boolean(wallet), refetchInterval: 10000 }
  );
};
