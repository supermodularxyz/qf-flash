import { type NextPage } from "next";
import Link from "next/link";
import { Wallet } from "ethers";

import { BaseLayout } from "layouts/BaseLayout";
import { P } from "components/Text";
import QRCode from "react-qr-code";

const mnemonics = [
  // "life world brick wealth decade wish friend legal transfer fog surface enroll",
  "bleak script drastic hungry health civil pigeon gossip announce allow roast remember",
  "top barely swim guard daughter squeeze bag fresh flat north insane rib",
  "situate nothing frame include powder palm work mammal hole ticket slab rebel",
  "season tobacco gossip cupboard noise latin baby senior cream young shield entire",
  "west relief carbon segment wasp jazz cloth solid devote vendor forum early",
];

const testWallets = mnemonics.map((mnemonic: string) => {
  const w = Wallet.fromMnemonic(mnemonic);
  return { address: w.address, mnemonic };
});

const Playground: NextPage = () => {
  return (
    <BaseLayout>
      <div className="p-4">
        <div className="mb-4 text-sm uppercase tracking-widest">
          Select a wallet
        </div>
        <P>This page is here to test different wallets.</P>
        <P>
          In the final product, these wallets will be scanned as QR codes from
          the attendees phone.
        </P>
        <div className="">
          <div className="grid grid-cols-2 gap-4">
            {testWallets.map((wallet, i) => (
              <Link key={i} href={`/create?key=${encodeURI(wallet.mnemonic)}`}>
                <div className="rounded-lg p-2 transition-colors hover:bg-gray-100">
                  <div className="mb-2 flex justify-center">
                    <QRCode
                      className="h-32 w-32 rounded-lg"
                      value={wallet.address}
                    />
                  </div>
                  <div className="text-center">Wallet #{i + 1}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Playground;
