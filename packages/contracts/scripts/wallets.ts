import fs from "fs/promises";
import { ethers, network } from "hardhat";
import { createWallets } from "../utils/createWallets";
import { AccountMap, splitWalletsIntoRoles } from "../utils/prepareWallets";
import { saveWallets } from "../utils/saveWallets";

async function generateSVGs(accounts: AccountMap) {
  console.log("Generating SVGs...");
  return saveWallets(accounts);
}

async function main() {
  const useTestWallets =
    !Boolean(process.env.NUM_WALLETS) || network.name === "localhost";

  const numWallets = Number(process.env.NUM_WALLETS) || 10;

  const wallets = createWallets(numWallets, useTestWallets);

  const accounts = splitWalletsIntoRoles(wallets);

  // TODO: Generate QR SVGs
  await generateSVGs(accounts);
  console.log("Wallets created", accounts);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
