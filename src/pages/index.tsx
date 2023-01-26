import { type NextPage } from "next";
import Link from "next/link";
import QRCode from "react-qr-code";

import { P } from "components/Text";
import { Button } from "components/Button";
import { Layout } from "components/Layout";
import { useBalance, useTokenBalance } from "hooks/useBalance";
import { useWallet } from "providers/WalletProvider";

const Home: NextPage = () => {
  const { wallet } = useWallet();
  const tokens = useTokenBalance();

  const { data } = useBalance();

  console.log("balance", data);
  return (
    <Layout>
      <h1 className="text-center uppercase tracking-widest">Welcome to the</h1>
      <h1 className="mb-4 text-center text-4xl">QF Flash Game</h1>
      <div className="">
        <P>There is $10k at stake, which will be distributed via QF.</P>
        <P>
          You have{" "}
          <span className="font-bold underline underline-offset-2">
            {tokens.data}
          </span>{" "}
          tokens in your wallet.
        </P>
        <P>Scan another attendees QR code to vote for them</P>
      </div>
      <Link href={`/scan`}>
        <Button className="mb-4 w-full">Scan QR</Button>
      </Link>
      <div className="mt-4 flex justify-center">
        {wallet ? (
          <QRCode className="rounded-lg" value={wallet?.address} />
        ) : (
          <div className="h-64 w-64 animate-pulse rounded-lg bg-gray-200" />
        )}
      </div>
    </Layout>
  );
};

export default Home;
