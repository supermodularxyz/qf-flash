import { ethers } from "ethers";
import { useEffect } from "react";
import {
  useMemo,
  useState,
  createContext,
  PropsWithChildren,
  useContext,
} from "react";
import { storage } from "utils/storage";

const createWallet = (mnemonic: string) => ethers.Wallet.fromMnemonic(mnemonic);

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
        const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
        const wallet = createWallet(mnemonic).connect(provider);

        storage.set(MNEMONIC_KEY, mnemonic);

        setState({ wallet });
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
