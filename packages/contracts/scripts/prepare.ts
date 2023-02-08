import { ethers, network } from "hardhat";
import { createWallets } from "../utils/createWallets";
import { configureRolesAndTranferTokens } from "../utils/prepareWallets";

async function main() {
  const [owner] = await ethers.getSigners();

  const contractAddress = process.env.CONTRACT_ADDRESS as string;
  const token = await ethers.getContractAt("QFToken", contractAddress);
  const testWallets =
    Boolean(process.env.TEST_WALLETS) || network.name === "localhost";

  const wallets = createWallets(10, testWallets);

  const accounts = await configureRolesAndTranferTokens(wallets, token, owner, {
    ratio: 0.3,
    eth: "0.001",
  });

  // TODO: Generate QR SVGs

  console.log("Wallets created", accounts);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
