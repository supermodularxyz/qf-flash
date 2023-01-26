import { ethers } from "ethers";

import { useMutation } from "@tanstack/react-query";

import { useWallet } from "providers/WalletProvider";

export const useSendTransaction = () => {
  const { wallet } = useWallet();
  return useMutation(
    (tx: ethers.providers.TransactionRequest) =>
      wallet?.sendTransaction(tx) || Promise.resolve(null)
  );
};
