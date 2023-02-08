import { ethers, Wallet } from "ethers";
import { QFToken } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

const roleMap = {
  1: "sender",
  2: "receiver",
};
const roles = {
  Sender: 1,
  Receiver: 2,
} as const;

type AccountMap = { [role: string]: { [address: string]: string } };

export async function configureRolesAndTranferTokens(
  wallets: Wallet[],
  token: QFToken,
  funder: SignerWithAddress,
  opts = { ratio: 0.15, eth: "0.001" }
) {
  let i = 0;
  const accounts = {
    [roleMap[roles.Sender]]: {},
    [roleMap[roles.Receiver]]: {},
  } as AccountMap;

  for (const w of wallets) {
    // Get role according to distribution
    const role = i < wallets.length * (1 - opts.ratio) ? 1 : 2;

    // Set account with role, address and mnemonic
    accounts[roleMap[role]][w.address] = w.mnemonic.phrase;

    // Set sender or receiver role
    console.log("Setting role for address:", w.address, role);
    await token.setRole(w.address, role);

    // Give 100 tokens to senders
    if (role === roles.Sender) {
      // Make sure tokens haven't been sent to this address already (sometimes some of the transactions fail)
      if ((await token.balanceOf(w.address)).eq(0)) {
        console.log("Transfering tokens to:", w.address);
        await token.mint(w.address, 100);
      }
      console.log("Sending ETH to:", w.address);
      await funder.sendTransaction({
        to: w.address,
        value: ethers.utils.parseEther(opts.eth),
      });
    }
    i++;
  }
  return accounts;
}
