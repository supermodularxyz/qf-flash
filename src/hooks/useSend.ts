import { useMutation } from "@tanstack/react-query";
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
