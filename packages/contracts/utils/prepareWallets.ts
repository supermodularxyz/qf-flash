import { ethers, Wallet } from "ethers";
import { QFToken } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { retry } from "./retry";

const roleMap = {
  1: "sender",
  2: "receiver",
};
const roles = {
  sender: 1,
  receiver: 2,
} as const;

export type AccountMap = { [role: string]: { [address: string]: string } };

export function splitWalletsIntoRoles(wallets: Wallet[], ratio = 0.3) {
  let i = 0;
  console.log(`Splitting ${wallets.length} wallets with ratio: ${ratio}`);
  const accounts = {
    [roleMap[roles.sender]]: {},
    [roleMap[roles.receiver]]: {},
  } as AccountMap;

  for (const w of wallets) {
    // Get role according to distribution
    const role = i < wallets.length * (1 - ratio) ? 1 : 2;

    // Set account with role, address and mnemonic
    accounts[roleMap[role]][w.address] = w.mnemonic.phrase;
    i++;
  }
  return accounts;
}

export async function configureRolesAndTranferTokens(
  accounts: AccountMap,
  token: QFToken,
  funder: SignerWithAddress,
  opts = { eth: "0.001" }
) {
  console.log(`Configuring roles and transfering tokens...`);
  for (const role in accounts) {
    for (const mnemonic of Object.values(accounts[role])) {
      const { address } = Wallet.fromMnemonic(mnemonic);

      console.log("Setting role for:", address, role);
      await retry(() =>
        token.setRole(address, roles[role as keyof typeof roles])
      );

      if ((await funder.provider?.getBalance(address))?.eq(0)) {
        console.log("Transfering ETH to:", address);
        await retry(() =>
          funder.sendTransaction({
            to: address,
            value: ethers.utils.parseEther(opts.eth),
          })
        );
      }
      if (role === "sender") {
        // Make sure tokens haven't been sent to this address already (sometimes some of the transactions fail)
        if ((await token.balanceOf(address)).eq(0)) {
          console.log("Transfering tokens to:", address);
          await retry(() => token.mint(address, 100));
        }
      }
    }
  }
}
