import { type NextPage } from "next";
import QRCode from "react-qr-code";

import { P } from "components/Text";
import { Layout } from "layouts/Layout";
import { useTokenBalance } from "hooks/useBalance";
import { useWallet } from "providers/WalletProvider";
import { Skeleton } from "components/Skeleton";
import { Profile } from "components/Profile";
import { ScanButon } from "components/ScanButton";

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
