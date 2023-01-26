import { type NextPage } from "next";

import Link from "next/link";
import { Layout } from "components/Layout";
import { Button } from "components/Button";
import { useWallet } from "providers/WalletProvider";
import { Textarea } from "components/Form";
import { useState } from "react";
import { useBalance, useTokenBalance } from "hooks/useBalance";

const Wallet: NextPage = () => {
  const [reveal, setReveal] = useState(false);
  const { wallet } = useWallet();
  const balance = useBalance();
  const tokens = useTokenBalance();
  console.log(wallet);
  console.log(balance.data);
  console.log(tokens.data);
  return (
    <Layout>
      <h1 className="mb-4 text-center text-4xl">Wallet</h1>

      <pre>{wallet?.address}</pre>
      <div className="mb-2 flex justify-center">
        <Button onClick={() => setReveal(true)}>Reveal wallet key</Button>
      </div>
      {reveal ? (
        <Textarea
          autoFocus
          value={wallet?.mnemonic.phrase}
          className="w-full text-center"
        />
      ) : null}
    </Layout>
  );
};

export default Wallet;
