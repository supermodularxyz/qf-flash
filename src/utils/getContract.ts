import type { Wallet } from "ethers";

const TOKEN_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

export const getContract = (signer: Wallet | null) =>
  import("types").then(({ Erc777__factory }) =>
    Erc777__factory.connect(TOKEN_ADDRESS, signer as Wallet)
  );
