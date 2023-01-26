import { useQuery } from "@tanstack/react-query";
import { formatEther } from "ethers/lib/utils.js";

import { useWallet } from "providers/WalletProvider";

export const useBalance = () => {
  const { wallet } = useWallet();
  return useQuery(
    ["balance"],
    () =>
      wallet
        ?.getBalance()
        .then((value) => ({ value, formatted: formatEther(value) })),
    { enabled: !!wallet }
  );
};
