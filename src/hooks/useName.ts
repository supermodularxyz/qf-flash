import { useMutation, useQuery } from "@tanstack/react-query";
import { formatBytes32String, parseBytes32String } from "ethers/lib/utils";

import { useWallet } from "providers/WalletProvider";
import { getContract } from "utils/getContract";

export const useName = (address: string) => {
  const { wallet } = useWallet();
  return useQuery(
    ["name", address],
    () => getContract(wallet).getName(address).then(parseBytes32String),
    { enabled: Boolean(wallet && address) }
  );
};

export const useSetName = () => {
  const { wallet } = useWallet();
  return useMutation((ens: string) =>
    getContract(wallet).setName(formatBytes32String(ens))
  );
};
