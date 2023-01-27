import { useCallback, useEffect } from "react";
import { useState, createContext, PropsWithChildren, useContext } from "react";
import { providers, Wallet } from "ethers";
import { storage } from "utils/storage";

type Context = {
  wallet: Wallet | null;
  isLoading: boolean;
};
const WalletContext = createContext<Context>({
  wallet: null,
  isLoading: true,
});

export const useWallet = () => useContext(WalletContext);

const MNEMONIC_KEY = "mnemonic";

export const WalletProvider = ({
  children,
  rpcUrl,
}: { rpcUrl: string } & PropsWithChildren) => {
  const storedMnemonic = storage.get(MNEMONIC_KEY);
  const [state, setState] = useState<Context>({
    wallet: null,
    isLoading: true,
  });

  const createWallet = useCallback(
    async (mnemonic: string) => {
      console.time("creating wallet");

      const provider = new providers.JsonRpcProvider(rpcUrl);
      const wallet = Wallet.fromMnemonic(mnemonic).connect(provider);

      storage.set(MNEMONIC_KEY, mnemonic);

      console.timeEnd("creating wallet");
      return wallet;
    },
    [rpcUrl]
  );

  useEffect(() => {
    if (storedMnemonic && !state.wallet) {
      createWallet(storedMnemonic).then((wallet) =>
        setState((s) => ({ isLoading: false, wallet }))
      );
    }
    setState((s) => ({ ...s, isLoading: false }));
  }, [storedMnemonic]);

  return (
    <WalletContext.Provider value={state}>{children}</WalletContext.Provider>
  );
};
