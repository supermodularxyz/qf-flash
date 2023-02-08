import { useCallback, useEffect } from "react";
import { useState, createContext, PropsWithChildren, useContext } from "react";
import { providers, Wallet } from "ethers";
import { storage } from "utils/storage";

type Context = {
  wallet: Wallet | null;
  isLoading: boolean;
  createWallet: (m: string) => Wallet | null;
};
const WalletContext = createContext<Context>({
  wallet: null,
  isLoading: true,
  createWallet: (m: string) => null,
});

export const useWallet = () => useContext(WalletContext);

const MNEMONIC_KEY = "mnemonic";

export const WalletProvider = ({
  children,
  rpcUrl,
}: { rpcUrl: string } & PropsWithChildren) => {
  const [state, setState] = useState<Omit<Context, "createWallet">>({
    wallet: null,
    isLoading: true,
  });

  const createWallet = useCallback(
    (mnemonic: string) => {
      console.time("creating wallet");

      const provider = new providers.JsonRpcProvider(rpcUrl);
      const wallet = Wallet.fromMnemonic(mnemonic).connect(provider);

      storage.set(MNEMONIC_KEY, mnemonic);
      setState((s) => ({ isLoading: false, wallet }));

      console.timeEnd("creating wallet");
      return wallet;
    },
    [rpcUrl]
  );

  const storedMnemonic = storage.get(MNEMONIC_KEY);
  useEffect(() => {
    if (storedMnemonic && !state.wallet) {
      createWallet(storedMnemonic);
    }
    setState((s) => ({ ...s, isLoading: false }));
  }, [storedMnemonic]);

  return (
    <WalletContext.Provider value={{ ...state, createWallet }}>
      {children}
    </WalletContext.Provider>
  );
};
