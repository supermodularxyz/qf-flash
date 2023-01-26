import { useMutation, useQuery } from "@tanstack/react-query";
import { formatBytes32String, parseBytes32String } from "ethers/lib/utils";
import { useWallet } from "providers/WalletProvider";
import { getContract } from "utils/getContract";

export const useSend = () => {
  const { wallet } = useWallet();
  return useMutation(
    ({ to, amount, name }: { to: string; amount: number; name: string }) => {
      console.log("name in bytes", formatBytes32String(name));
      console.log(
        "bytes as name",
        parseBytes32String(formatBytes32String(name))
      );
      return getContract(wallet).then((contract) =>
        contract.send(to, amount, formatBytes32String(name))
      );
    }
  );
};

export const useSendEvents = () => {
  const { wallet } = useWallet();

  return useQuery(
    ["events"],
    () => {
      const queryStart = Date.now();
      return getContract(wallet).then(async (contract) => {
        const nameByAddress: { [address: string]: string } = {};
        const amountByAddress: { [address: string]: number } = {};
        const votesByAddress: { [address: string]: string } = {};
        const projects: {
          [address: string]: {
            amount: number;
            funders: Set<string>;
          };
        } = {};
        const events = await contract
          .queryFilter(contract.filters.Sent())
          .then((events) => {
            return Promise.all(
              events.map(async (e) => {
                console.log(e);
                const { amount, from, to, data } = e.args;
                const name = parseBytes32String(data);

                nameByAddress[from] = name;

                if (!amountByAddress[to]) amountByAddress[to] = 0;
                if (!votesByAddress[to]) votesByAddress[to];

                // if (!projects[to])
                projects[to] = projects[to] || {
                  amount: 0,
                  funders: new Set(),
                };

                projects[to].amount = projects[to].amount += Number(amount);
                projects[to].funders.add(from);
                amountByAddress[to] = amountByAddress[to] += Number(amount);
                votesByAddress[to] = from;

                const block = await wallet?.provider.getBlock(e.blockNumber);

                return {
                  amount: amount.toString(),
                  from,
                  to,
                  name,
                  timestamp: block ? new Date(block?.timestamp * 1000) : null,
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
        };
      });
    },
    { enabled: Boolean(wallet), refetchInterval: 10000 }
  );
};
