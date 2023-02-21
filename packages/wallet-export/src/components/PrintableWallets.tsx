import QRCode from "react-qr-code";
import type { z } from "zod";

import type { WalletSchema } from "pages";
import { PrintButton } from "./PrintButton";

type WalletConfig = z.infer<typeof WalletSchema>;

type Props = { baseUrl: string; wallets: WalletConfig | null };

const labels = {
  sender: "Bee",
  receiver: "Flower",
};
export const PrintableWallets = ({ baseUrl, wallets }: Props) => (
  <div>
    <PrintButton />
    {Object.entries(wallets || {}).map(([role, wallet]) => (
      <div key={role} className="grid grid-cols-3 gap-y-8">
        {Object.entries(wallet).map(([address, mnemonic], i) => (
          <div
            key={address}
            className="mb-6 flex flex-col items-center justify-center"
          >
            <div className="">
              {labels[role as keyof typeof labels]} #{i + 1}
            </div>
            <QRCode
              className="aspect-square w-56"
              value={baseUrl + encodeURI(mnemonic)}
            />
            <div className="font-mono text-[8px]">{address}</div>
          </div>
        ))}
      </div>
    ))}
  </div>
);
