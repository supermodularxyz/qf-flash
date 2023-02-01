import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useWallet } from "providers/WalletProvider";
import { Layout } from "layouts/Layout";
import { Input, Label } from "components/Form";
import { Button } from "components/Button";
import { useSetName } from "hooks/useName";
import { useEnsAddress } from "hooks/useEnsAddress";

const EnsForm = ({ onCreate = () => Promise.resolve({}) }) => {
  const setName = useSetName();
  const ens = useEnsAddress();

  const isLoading = ens.isLoading || setName.isLoading;
  return (
    <form
      className="flex flex-col gap-2 pt-24"
      onSubmit={(e) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const name = Object.fromEntries(new FormData(target)).name as string;

        return (
          ens
            // Resolve ENS to address to verify it exists
            .mutateAsync(name)
            .then((addr) => setName.mutateAsync(name))
            .then(() => onCreate())
            .catch(console.log)
        );
      }}
    >
      <Label>Enter your ENS name</Label>
      <Input
        name="name"
        autoFocus
        required
        min={3}
        max={10}
        className="w-full"
      />
      <div className="flex gap-1">
        <Button type="submit" className="w-full" disabled={isLoading}>
          Skip
        </Button>
        <Button type="submit" className="w-full" disabled={isLoading}>
          Go!
        </Button>
      </div>

      <span className="py-4 text-center text-xs text-red-600">
        {(ens.error as Error)?.message}
      </span>
    </form>
  );
};

const Create: NextPage = () => {
  const router = useRouter();
  const mnemonic = router.query.key as string;

  const { createWallet } = useWallet();

  useEffect(() => {
    mnemonic && createWallet(mnemonic);
  }, [mnemonic]);

  return (
    <Layout>
      <EnsForm onCreate={() => router.push("/")} />
    </Layout>
  );
};

export default Create;
