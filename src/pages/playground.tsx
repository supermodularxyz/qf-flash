import { type NextPage } from "next";
import Link from "next/link";

import { BaseLayout } from "layouts/BaseLayout";
import { P } from "components/Text";
import QRCode from "react-qr-code";
import { truncate } from "utils/truncate";

const wallets = {
  sender: {
    "0xe1e494B8CF4566C0EC9E06f3b68BfB0C7D670e49":
      "that actor crew give leopard blade cradle hazard priority favorite joke nurse",
    "0x1bc7100863B6A754C008A5C9d3cDF05f5Ee6F8EF":
      "audit end lucky profit gospel meadow pony notice gospel pond bulk review",
    "0xab85636D3f77B35F69C45d4FDDAc883A7d379307":
      "smart story picnic juice corn shock garment curious ankle twin digital raccoon",
    "0xf5EeC8dCE8896c5DB342Dd08A4D4FcBb14919e7A":
      "pig share nurse trust bid traffic simple vendor female stumble source post",
    "0x787C97D942Ece2F814Aa72957aC8A35996F6436E":
      "silk like mountain stairs curious suit giraffe memory ancient two define ready",
    "0xA7d32606Ba605c893F2Bd8bCC029ef76c5C829E2":
      "feel company ball special remove urge legend fish lesson hill dynamic mobile",
    "0xa2BEc0AF10c6b469E3991D61C7a8CaEB93501500":
      "ostrich attitude antique acid erode document screen gadget apology rule hub rural",
  },
  receiver: {
    "0x9C710D3e20692b25032204586c9dc7CcDa012Ab8":
      "mixture welcome improve stock noble size check obscure scrap cake immune bread",
    "0x331aF4cAc7d4086Cb56F4E5019f3C454Bb4114e8":
      "vacant dose violin august yellow want tonight bench myth act fame foil",
    "0xfa3Dc0a26B02f11Ac23eE3b391Eab64506D24c8D":
      "worry daring dinosaur walnut slender move nut mirror team harbor faint return",
  },
};

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
          {Object.entries(wallets).map(([role, group]) => (
            <div key={role} className="mb-4">
              <h4 className="text-xs uppercase tracking-widest">
                {role} wallets
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(group).map(([address, mnemonic]) => {
                  console.log(mnemonic);
                  return (
                    <Link
                      key={address}
                      href={`/create?key=${encodeURI(mnemonic)}`}
                    >
                      <div className="rounded-lg p-2 transition-colors hover:bg-gray-100">
                        <div className="mb-2 flex justify-center">
                          <QRCode
                            className="h-32 w-32 rounded-lg"
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
    </BaseLayout>
  );
};

export default Playground;
