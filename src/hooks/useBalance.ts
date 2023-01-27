import type { BigNumber } from "ethers";
import { useQuery } from "@tanstack/react-query";
import { formatEther } from "ethers/lib/utils.js";

import { useWallet } from "providers/WalletProvider";
import { getContract } from "utils/getContract";

export const useTokenBalance = () => {
  const { wallet } = useWallet();
  return useQuery(
    ["qf-balance"],
    () =>
      getContract(wallet)
        .balanceOf(wallet?.address as string)
        .then((value: BigNumber) => value.toString()),
    { enabled: Boolean(wallet) }
  );
};

export const useBalance = () => {
  const { wallet } = useWallet();
  return useQuery(
    ["eth-balance"],
    () => wallet?.getBalance().then((value) => formatEther(value)),
    { enabled: !!wallet }
  );
};
