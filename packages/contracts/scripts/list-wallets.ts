import { utils } from "ethers";
import fs from "fs/promises";
import { ethers } from "hardhat";
import { loadWallets } from "../utils/saveWallets";

async function main() {
  const [owner] = await ethers.getSigners();

  const contractAddress =
    process.env.CONTRACT_ADDRESS ||
    "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Hardhat addresss

  const eth = utils.formatEther(
    (await owner.provider?.getBalance(owner.address)) || 0
  );
  console.log(eth);

  const token = await ethers.getContractAt("QFToken", contractAddress);
  const accounts = await loadWallets();
  for (const role in accounts) {
    for (const address of Object.keys(accounts[role])) {
      const eth = utils.formatEther(
        (await owner.provider?.getBalance(address)) || 0
      );
      const qf = await token.balanceOf(address);
      console.log(`${address} | ${eth} | ${qf} | ${role}`);
    }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

1 - 0.000518819497754491;
