import { useMutation } from "@tanstack/react-query";
import { providers } from "ethers";

const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_ID as string;
const provider = new providers.AlchemyProvider("homestead", alchemyKey);

export const useEnsAddress = () =>
  useMutation((name: string) =>
    provider.resolveName(name).then((address) => {
      if (!address) {
        throw new Error("No address found for ENS name");
      }
      return address;
    })
  );
