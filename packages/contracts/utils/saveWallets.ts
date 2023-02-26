import path from "path";
import fs from "fs/promises";

import { AccountMap } from "./prepareWallets";

// const WALLET_PATH = path.resolve(__dirname, "..", "wallets.json");

const walletPath = () => {
  const contract = process.env.CONTRACT_ADDRESS || "";
  const fileName = `wallets${contract ? `_${contract}` : ""}.json`;
  return path.resolve(__dirname, "..", fileName);
};

export const saveWallets = async (accounts: AccountMap) => {
  return fs.writeFile(walletPath(), JSON.stringify(accounts, null, 2));
};

export const loadWallets = async (path = walletPath()): Promise<AccountMap> =>
  fs
    .readFile(path, "utf-8")
    .then((w) => JSON.parse(w))
    .catch((err) =>
      console.log(
        "Couldn't open wallets.json. Make sure you run scripts/wallets.ts first to generate."
      )
    );
