import { type NextPage } from "next";

import { Layout } from "layouts/Layout";
import { Button } from "components/Button";
import { useWallet } from "providers/WalletProvider";
import { Input, Textarea } from "components/Form";
import { useState } from "react";
import { useBalance, useTokenBalance } from "hooks/useBalance";
import { P } from "components/Text";
import { Skeleton } from "components/Skeleton";
import { ScanButton } from "components/ScanButton";

const Wallet: NextPage = () => {
  const [reveal, setReveal] = useState(false);
  const { wallet } = useWallet();
  const balance = useBalance();
  const tokens = useTokenBalance();
  return (
    <Layout fab={<ScanButton />}>
      <div className="mb-4 text-sm uppercase tracking-widest">Wallet</div>

      <P>
        You have{" "}
        <Skeleton className="w-6" isLoading={tokens.isLoading}>
          <span className="text-md font-bold underline underline-offset-2">
            {tokens.data}
          </span>
        </Skeleton>{" "}
        tokens in your wallet and{" "}
        <Skeleton className="w-12" isLoading={balance.isLoading}>
          <span className="text-md font-bold underline underline-offset-2">
            {(+(balance.data || "0")).toFixed(4)}
          </span>
        </Skeleton>{" "}
        xDAI.
      </P>

      <Input className="mb-8 w-full text-sm" value={wallet?.address} />
      <div className="mb-2 flex justify-center">
        <Button onClick={() => setReveal(true)}>Reveal wallet key</Button>
      </div>
      {reveal ? (
        <Textarea
          rows={4}
          autoFocus
          value={wallet?.mnemonic.phrase}
          className="w-full text-center"
        />
      ) : null}
    </Layout>
  );
};

export default Wallet;
