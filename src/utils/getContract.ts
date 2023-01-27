import type { Wallet } from "ethers";
import { Erc777__factory } from "types";

// const TOKEN_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const tokenAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;

export const getContract = (signer: Wallet | null) =>
  Erc777__factory.connect(tokenAddress, signer as Wallet);
