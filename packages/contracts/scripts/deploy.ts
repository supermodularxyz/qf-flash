import { ethers } from "hardhat";

async function main() {
  const QFToken = await ethers.getContractFactory("QFToken");
  const token = await QFToken.deploy();

  console.log("QFToken deployed at:", token.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
