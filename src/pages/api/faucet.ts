import { providers, Wallet } from "ethers";
import { isAddress, parseEther } from "ethers/lib/utils";
import { NextApiRequest, NextApiResponse } from "next";

/*
Not in use. Just a sketch of how a faucet might be implemented.

- Check if provided address is in fact a valid address
- Check if address is part of the generated wallets
- Check if balance is below the amount to send (to prevent multiple requests)
- Todo: Prevent multiple requests before the balance is updated
    - Rate limiter?
    - Keep track of and compare lastRequest[address] = Date.now()?
*/

const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL as string;

const ETH_DUST = "0.001";
const provider = new providers.JsonRpcProvider(rpcUrl);
const wallet = Wallet.fromMnemonic(process.env.MNEMONIC_KEY as string).connect(
  provider
);

const approvedWallets = (process.env.ADDRESS_WHITELIST || "")
  .split(",")
  .map((str) => str.trim())
  .reduce(
    (acc, x) => ({ ...acc, [x]: true }),
    {} as { [address: string]: boolean }
  );

async function faucet(address: string) {
  if (isAddress(address) && approvedWallets[address]) {
    // Only send if balance is lower than what is being sent
    if ((await provider.getBalance(address)) < parseEther(ETH_DUST)) {
      const value = parseEther(ETH_DUST);
      return wallet.sendTransaction({ to: address, value });
    }
  }
}
interface ApiRequest extends NextApiRequest {
  body: { address: string };
}
export default async function handler(req: ApiRequest, res: NextApiResponse) {
  try {
    await faucet(req.body?.address);
    res.status(200).json({ name: "John Doe" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error sending ETH" });
  }
}
