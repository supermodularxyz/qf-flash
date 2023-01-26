import { useQuery } from "@tanstack/react-query";
import type { BigNumber, providers } from "ethers";
import { useWallet } from "providers/WalletProvider";
// import { Erc777__factory } from "types";

const TOKEN_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

export const useTokenBalance = () => {
  const { wallet } = useWallet();

  return useQuery(
    [TOKEN_ADDRESS],
    () => {
      try {
        return import("types").then(({ Erc777__factory }) => {
          const erc777 = Erc777__factory.connect(
            TOKEN_ADDRESS,
            wallet?.provider as providers.Provider
          );

          return erc777
            .balanceOf(wallet?.address as string)
            .then((value: BigNumber) => value.toString());
        });
      } catch (error) {
        console.log(error);
      }
    },
    { enabled: Boolean(wallet) }
  );
};
