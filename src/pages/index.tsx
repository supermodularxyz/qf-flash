import { type NextPage } from "next";
import Link from "next/link";
import QRCode from "react-qr-code";

import { P } from "components/Text";
import { Button } from "components/Button";
import { Layout } from "layouts/Layout";
import { useBalance, useTokenBalance } from "hooks/useBalance";
import { useWallet } from "providers/WalletProvider";
import { ArrowRight, Camera } from "lucide-react";
import { useState } from "react";
import { storage } from "utils/storage";
import { Skeleton } from "components/Skeleton";
import { useRole } from "hooks/useRole";
import { useName } from "hooks/useName";
import { Profile } from "components/Profile";

const ScanButon = () => {
  const [hideInstructions, setHideInstructions] = useState(
    false
    // () => storage.get("instructions") === "hidden"
  );
  function handleHideInstructions() {
    setHideInstructions(true);
    // storage.set("instructions", "hidden");
  }
  return (
    <>
      {!hideInstructions ? (
        <span className="absolute -left-48 top-6 flex items-center gap-4 pl-2 text-gray-500">
          Press to scan QR
          <ArrowRight className="h-4 w-4" />
        </span>
      ) : null}
      <Link href={`/scan`}>
        <Button
          intent="primary"
          onClick={handleHideInstructions}
          className="h-16 w-16 rounded-full shadow-xl hover:shadow-none"
        >
          <Camera />
        </Button>
      </Link>
    </>
  );
};

const Home: NextPage = () => {
  const { wallet } = useWallet();
  const tokens = useTokenBalance();

  return (
    <Layout fab={<ScanButon />}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm uppercase tracking-widest">
            Welcome to the
          </div>
          <h3 className="mb-2 text-2xl">QF Flash Game</h3>
        </div>
        <Profile />
      </div>
      <div className="text-sm">
        <P>There is $10k at stake, which will be distributed via QF.</P>
        <P>
          You have{" "}
          <Skeleton className="w-6" isLoading={tokens.isLoading}>
            <span className="text-md font-bold underline underline-offset-2">
              {tokens.data}
            </span>
          </Skeleton>{" "}
          tokens in your wallet.
        </P>
        <P>Scan another attendees QR code to vote for them</P>
      </div>
      {/* <Link href={`/scan`}>
        <Button className="mb-4 w-full">Scan QR</Button>
      </Link> */}
      <div className="mt-4 flex justify-center">
        {wallet ? (
          <QRCode
            className="h-48 w-48 rounded-xl shadow-xl"
            value={wallet?.address}
          />
        ) : (
          <div className="h-48 w-48 animate-pulse rounded-xl bg-gray-200 shadow-xl" />
        )}
      </div>
    </Layout>
  );
};

export default Home;
