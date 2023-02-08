import { useQuery } from "@tanstack/react-query";

import { useWallet } from "providers/WalletProvider";
import { getContract } from "utils/getContract";

export const useRole = () => {
  const { wallet } = useWallet();
  return useQuery(
    ["role", wallet?.address],
    () => getContract(wallet).getRole(wallet?.address as string),
    { enabled: Boolean(wallet) }
  );
};
