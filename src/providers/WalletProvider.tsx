import { useEffect } from "react";
import {
  useMemo,
  useState,
  createContext,
  PropsWithChildren,
  useContext,
} from "react";
import { storage } from "utils/storage";

import type { ethers } from "ethers";
type Context = {
  wallet: ethers.Wallet | null;
  createWallet: (m: string) => void;
};
const WalletContext = createContext<Context>({
  createWallet: (m: string) => m,
  wallet: null,
});

export const useWallet = () => useContext(WalletContext);

const MNEMONIC_KEY = "mnemonic";
const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_ID;

export const WalletProvider = ({
  children,
  rpcUrl,
}: { rpcUrl: string } & PropsWithChildren) => {
  const [state, setState] = useState<{ wallet: ethers.Wallet | null }>({
    wallet: null,
  });

  const value = useMemo(() => {
    return {
      createWallet: (mnemonic: string) => {
        import("ethers").then(({ providers, Wallet }) => {
          const createWallet = (mnemonic: string) =>
            Wallet.fromMnemonic(mnemonic);

          // const provider = new providers.AlchemyProvider(
          //   "optimism-goerli",
          //   alchemyKey
          // );
          const provider = new providers.JsonRpcProvider(rpcUrl);
          const wallet = createWallet(mnemonic).connect(provider);

          storage.set(MNEMONIC_KEY, mnemonic);

          setState({ wallet });
        });
      },
    };
  }, []);

  const storedMnemonic = storage.get(MNEMONIC_KEY);
  useEffect(() => {
    if (storedMnemonic && !state.wallet) {
      value.createWallet(storedMnemonic);
    }
  }, [storedMnemonic]);
  return (
    <WalletContext.Provider value={{ ...value, ...state }}>
      {children}
    </WalletContext.Provider>
  );
};
