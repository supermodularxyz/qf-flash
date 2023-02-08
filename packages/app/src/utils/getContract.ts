import type { Wallet } from "ethers";
import { QFToken__factory } from "types";

const tokenAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;

export const getContract = (signer: Wallet | null) =>
  QFToken__factory.connect(tokenAddress, signer as Wallet);
