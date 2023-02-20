import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { ethers } from "ethers";
import { writeFile } from "fs/promises";
import { resolve } from "path";

import * as dotenv from "dotenv";
dotenv.config();

const mnemonic = process.env.MNEMONIC as string;
if (!mnemonic) throw new Error("MNEMONIC not configured in .env file");

const wallet = ethers.Wallet.fromMnemonic(mnemonic);

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings: { optimizer: { enabled: true, runs: 1000 } },
  },
  networks: {
    "optimism-goerli": {
      url: "https://goerli.optimism.io",
      accounts: [wallet.privateKey],
    },
    gnosis: {
      url: "https://rpc.gnosischain.com/",
      gasPrice: 1000000000,
      accounts: [wallet.privateKey],
    },
    chiado: {
      url: "https://rpc.chiadochain.net",
      gasPrice: 1000000000,
      accounts: [wallet.privateKey],
    },
  },
};

export default config;

task("generate-abi", async (_, hre) => {
  console.log("Generating ABI...");
  await Promise.all(
    ["QFToken"].map(async (name) => {
      const { abi } = await hre.artifacts.readArtifact(name);
      const path = resolve(__dirname, "../app/src/abi", name + ".json");
      return writeFile(path, JSON.stringify(abi));
    })
  );
  console.log("Done!");
});
