import { type NextPage } from "next";
import Link from "next/link";

import { P } from "components/Text";
import QRCode from "react-qr-code";
import { truncate } from "utils/truncate";
import { PropsWithChildren } from "react";

const wallets = {
  sender: {
    "0x36Df1568fD3A66C95dA89114809E57cF746C5Cb8":
      "vintage monitor later shock ranch verb moon bird sight elder matter sudden",
    "0x94f1af7353cEe2411be9c5e60787071090e1E765":
      "olive chimney rate table transfer jewel custom entire patch donate tennis seek",
    "0x72e2c97d450334927B2131a914c2D793a5004fb3":
      "again demise negative there comfort enter inner timber receive grain flee agree",
    "0xF1c2131ca1C81b3a7f20A6B41c42124AdddaC9EF":
      "useless recipe crisp square machine twin excuse advance receive nothing pool adult",
    "0xA850b090d489aaE7E6Afae5B38c28E625dce6616":
      "sad neither either transfer stomach trial other pelican penalty merry chimney glue",
    "0x3874e67aaB9A78A73b8e0eE9fd425f54DdE1b9eD":
      "bundle taxi tape arch spare salute tuna group hundred axis muscle galaxy",
    "0x56300f8fce58d03100039dF1B35118dfE84242bf":
      "hero jar clinic ring deputy final goose detect sustain bonus mother good",
    "0xeC94855ee74d667F98E04eB5c6BCF8580A95271b":
      "cherry whip vapor viable tool quiz text kite frown notice box motor",
    "0x5bdA180D25F68229B264fCeEEa2ED958701dC56d":
      "miss know waste tiny awake project huge mix grocery blouse match insect",
    "0x191601f42041b26F2Aa909FeAe7c9220f281Af59":
      "seed shift circle evoke vendor april cause already access monkey wing dice",
  },
  receiver: {
    "0xd735E299f309AAB23dCa46FF789d9f2d24188624":
      "scene muffin lend because hole flower analyst riot result broccoli bottom fancy",
    "0x4A35D979131E8a3c4eDE5adC01a18853143147FC":
      "sleep swing anger swallow network hover unusual vicious dose essence donor novel",
    "0x6EadB2464F29DCd53667034cDD6bd1c40712b13C":
      "razor grocery owner exit strategy biology tent similar net repair junk boring",
    "0x1Ae7f0bE77E465B96959cEdD3ff0ef907956A5e4":
      "impact able jeans morning noble between indoor flee human ball crack cross",
  },
};

const PlaygroundLayout = ({ children }: PropsWithChildren) => (
  <main className="container mx-auto">{children}</main>
);

const Playground: NextPage = () => {
  return (
    <PlaygroundLayout>
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
          {Object.entries(wallets).map(([role, group]) => (
            <div key={role} className="mb-4">
              <h4 className="text-xs uppercase tracking-widest">
                {role} wallets
              </h4>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {Object.entries(group).map(([address, mnemonic]) => {
                  return (
                    <Link
                      key={address}
                      href={`/create?key=${encodeURI(mnemonic)}`}
                    >
                      <div className="rounded-lg p-2 transition-colors hover:bg-gray-100">
                        <div className="mb-2 flex justify-center">
                          <QRCode
                            className="h-32 w-32 rounded-lg sm:h-64 sm:w-64"
                            value={address}
                          />
                        </div>
                        <div className="text-center">{truncate(address)}</div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PlaygroundLayout>
  );
};

export default Playground;
