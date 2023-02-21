import { ethers, network } from "hardhat";

import { queryTransferEvents } from "app/src/utils/transfers";
import { retry } from "../utils/retry";

const erc20 = [
  "function transfer(address to, uint256 amount) external returns (bool)",
];

async function getPayoutToken() {
  if (network.name === "localhost") {
    const MockToken = await ethers.getContractFactory("MockToken");
    const token = await MockToken.deploy();
    const [owner] = await ethers.getSigners();

    await token.mint(owner.address, ethers.utils.parseEther("10000"));
    return token;
  } else {
    return await new ethers.Contract(process.env.PAYOUT_TOKEN as string, erc20);
  }
}
async function main() {
  const [owner] = await ethers.getSigners();

  const contractAddress =
    process.env.CONTRACT_ADDRESS ||
    "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const qfToken = await ethers.getContractAt("QFToken", contractAddress);
  const payoutToken = await getPayoutToken();

  const { flowers } = await queryTransferEvents(qfToken);

  for (const { address, matching } of flowers) {
    console.log(`transfering payout: ${address} - ${matching}`);
    await retry(() =>
      payoutToken
        .transfer(address, ethers.utils.parseEther(String(matching)))
        .catch((err: any) => {
          console.log(err.reason);
          throw err;
        })
    );
  }

  console.log("Payout success!", flowers);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
