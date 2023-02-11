import path from "path";
import fs from "fs/promises";

import { AccountMap } from "./prepareWallets";

const WALLET_PATH = path.resolve(__dirname, "..", "wallets.json");

export const saveWallets = async (accounts: AccountMap) => {
  return fs.writeFile(WALLET_PATH, JSON.stringify(accounts, null, 2));
};

export const loadWallets = async (path = WALLET_PATH): Promise<AccountMap> =>
  fs
    .readFile(path, "utf-8")
    .then((w) => JSON.parse(w))
    .catch((err) =>
      console.log(
        "Couldn't open wallets.json. Make sure you run scripts/wallets.ts first to generate."
      )
    );
