import { type NextPage } from "next";

import Link from "next/link";
import { Layout } from "components/Layout";

const mnemonics = [
  "life world brick wealth decade wish friend legal transfer fog surface enroll",
  "bleak script drastic hungry health civil pigeon gossip announce allow roast remember",
  "top barely swim guard daughter squeeze bag fresh flat north insane rib",
  "situate nothing frame include powder palm work mammal hole ticket slab rebel",
  "season tobacco gossip cupboard noise latin baby senior cream young shield entire",
  "west relief carbon segment wasp jazz cloth solid devote vendor forum early",
];

const Playground: NextPage = () => {
  return (
    <Layout>
      <h1 className="mb-4 text-center text-4xl">Select a wallet</h1>

      <div className="grid grid-cols-2 gap-2">
        {mnemonics.map((m, i) => (
          <Link key={i} href={`/create?key=${m}`}>
            <div className="flex aspect-square items-center justify-center rounded-lg bg-gray-200 transition-colors hover:bg-gray-300">
              Wallet #{i + 1}
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Playground;
