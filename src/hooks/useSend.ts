import { useMutation } from "@tanstack/react-query";
import { useWallet } from "providers/WalletProvider";
import { getContract } from "utils/getContract";

export const useSend = () => {
  const { wallet } = useWallet();
  return useMutation(
    ({ to, amount, name }: { to: string; amount: number; name: string }) =>
      getContract(wallet).transfer(to, amount)
  );
};
