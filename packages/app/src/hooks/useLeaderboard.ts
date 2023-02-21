import { useQuery } from "@tanstack/react-query";
import { useWallet } from "providers/WalletProvider";
import { getContract } from "utils/getContract";
import { queryTransferEvents } from "utils/transfers";

export const useLeaderboard = () => {
  const { wallet } = useWallet();

  return useQuery(
    ["events"],
    async () => {
      const queryStart = Date.now();

      const { flowers, bees } = await queryTransferEvents(getContract(wallet));

      const queryEnd = Date.now();

      return {
        bees,
        flowers,
        queryDuration: queryEnd - queryStart,
        lastUpdated: queryEnd,
      };
    },
    { enabled: Boolean(wallet), refetchInterval: 3000 }
  );
};
