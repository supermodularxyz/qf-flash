import { type NextPage } from "next";
import QRCode from "react-qr-code";

import { P } from "components/Text";
import { Layout } from "layouts/Layout";
import { useTokenBalance } from "hooks/useBalance";
import { useWallet } from "providers/WalletProvider";
import { Skeleton } from "components/Skeleton";
import { Profile } from "components/Profile";
import { ScanButton } from "components/ScanButton";
import { useRole } from "hooks/useRole";
import { roles } from "utils/roles";

const FlowerQR = () => {
  const { wallet } = useWallet();
  const role = useRole();
  if (role.isLoading || role.data === roles.Sender) return null;
  return (
    <div className="mt-4 flex justify-center">
      <QRCode
        className="h-48 w-48 rounded-xl shadow-xl"
        value={wallet?.address as string}
      />
    </div>
  );
};

const roleInstructions = [
  "",
  "Scan another attendees QR code to vote for them",
  "Show your QR to receive tokens",
];
const Instructions = () => {
  const tokens = useTokenBalance();
  const role = useRole();
  return (
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
      <Skeleton isLoading={role.isLoading}>
        {roleInstructions[role.data || 0]}
      </Skeleton>
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <Layout fab={<ScanButton />}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm uppercase tracking-widest">Welcome to</div>
          <h3 className="mb-2 text-2xl">Quadratic Honey</h3>
        </div>
        <Profile />
      </div>
      <Instructions />
      <FlowerQR />
    </Layout>
  );
};

export default Home;
