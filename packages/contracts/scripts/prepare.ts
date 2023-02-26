import { ethers, network } from "hardhat";
import { configureRolesAndTranferTokens } from "../utils/prepareWallets";
import { loadWallets } from "../utils/saveWallets";

async function main() {
  const [owner] = await ethers.getSigners();

  const contractAddress =
    process.env.CONTRACT_ADDRESS ||
    "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Hardhat addresss

  const token = await ethers.getContractAt("QFToken", contractAddress);

  const accounts = await loadWallets();

  await configureRolesAndTranferTokens(accounts, token, owner, {
    eth: "0.01",
  });

  console.log("Wallets funded!");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
