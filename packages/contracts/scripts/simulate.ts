import { Wallet } from "ethers";
import { ethers } from "hardhat";
import { createWallets } from "../utils/createWallets";
import {
  configureRolesAndTranferTokens,
  splitWalletsIntoRoles,
} from "../utils/prepareWallets";

/*
Experimental script to simulate 100 wallets sending their tokens
*/

async function main() {
  const [owner] = await ethers.getSigners();

  const token = await ethers.getContractAt(
    "QFToken",
    "0x5FbDB2315678afecb367f032d93F642f64180aa3" // hardhat
  );

  const wallets = createWallets(100);
  const accounts = splitWalletsIntoRoles(wallets);

  await configureRolesAndTranferTokens(accounts, token, owner, {
    eth: "0.001",
  });

  const senders = Object.entries(accounts.sender);
  const receivers = Object.entries(accounts.receiver);

  let tokensRemaining = true;

  const tokenBalances = senders.reduce(
    (acc, [addr]) => ({ ...acc, [addr]: 100 }),
    {} as { [addess: string]: number }
  );

  while (tokensRemaining) {
    const randomSender = Wallet.fromMnemonic(
      senders[random(0, senders.length - 1)][1]
    ).connect(ethers.provider);
    const randomReceiver = Wallet.fromMnemonic(
      receivers[random(0, receivers.length - 1)][1]
    );
    const tokenBalance = (
      await token.balanceOf(randomSender.address)
    ).toNumber();

    tokenBalances[randomSender.address] = tokenBalance;
    tokensRemaining = Object.values(tokenBalances).some(
      (amount) => Number(amount) > 0
    );
    console.log(tokensRemaining, tokenBalances);

    const randomAmount = random(0, tokenBalance);

    if (randomAmount) {
      console.log(
        `${randomSender.address} sending ${randomAmount} to ${randomReceiver.address}`
      );
      await token
        .connect(randomSender)
        .transfer(randomReceiver.address, randomAmount);
    }
  }
  console.log(tokenBalances);
  return;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

const random = (min = 0, max = 1) =>
  Math.floor(Math.random() * (max - min + 1) + min);
