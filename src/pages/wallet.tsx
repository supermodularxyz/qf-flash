import { type NextPage } from "next";

import { Layout } from "components/Layout";
import { Button } from "components/Button";
import { useWallet } from "providers/WalletProvider";
import { Input, Textarea } from "components/Form";
import { useState } from "react";
import { useBalance, useTokenBalance } from "hooks/useBalance";
import { P } from "components/Text";

const Wallet: NextPage = () => {
  const [reveal, setReveal] = useState(false);
  const { wallet } = useWallet();
  const balance = useBalance();
  const tokens = useTokenBalance();

  return (
    <Layout>
      <div className="mb-4 text-sm uppercase tracking-widest">Wallet</div>

      <P>
        You have{" "}
        <span className="text-md font-bold underline underline-offset-2">
          {tokens.data}
        </span>{" "}
        tokens in your wallet and{" "}
        <span className="text-md font-bold underline underline-offset-2">
          {(+(balance.data || "0")).toFixed(4)}
        </span>{" "}
        ETH.
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
