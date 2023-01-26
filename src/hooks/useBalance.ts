import type { BigNumber } from "ethers";
import { useQuery } from "@tanstack/react-query";
import { formatEther } from "ethers/lib/utils.js";

import { useWallet } from "providers/WalletProvider";
import { getContract } from "utils/getContract";

const TOKEN_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

export const useTokenBalance = () => {
  const { wallet } = useWallet();
  return useQuery(
    [TOKEN_ADDRESS, "balanceOf", wallet?.address],
    () =>
      getContract(wallet).then((contract) =>
        contract
          .balanceOf(wallet?.address as string)
          .then((value: BigNumber) => value.toString())
      ),
    { enabled: Boolean(wallet) }
  );
};

export const useBalance = () => {
  const { wallet } = useWallet();
  return useQuery(
    ["balance", wallet?.address],
    () => wallet?.getBalance().then((value) => formatEther(value)),
    { enabled: !!wallet }
  );
};
