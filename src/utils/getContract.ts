import type { Wallet } from "ethers";
import { Erc777__factory } from "types";

const tokenAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;

export const getContract = (signer: Wallet | null) =>
  Erc777__factory.connect(tokenAddress, signer as Wallet);
