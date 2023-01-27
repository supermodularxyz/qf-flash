import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useWallet } from "providers/WalletProvider";
import { Layout } from "layouts/Layout";
import { Input, Label } from "components/Form";
import { Button } from "components/Button";
import { storage } from "utils/storage";

const NAME_KEY = "name";
const Create: NextPage = () => {
  const router = useRouter();
  const mnemonic = router.query.key as string;

  const { createWallet } = useWallet();

  useEffect(() => {
    mnemonic && createWallet(mnemonic);
  }, [mnemonic]);

  const storedName = storage.get(NAME_KEY);

  return (
    <Layout>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const target = e.target as HTMLFormElement;
          const { name } = Object.fromEntries(new FormData(target));

          storage.set(NAME_KEY, name as string);

          router.push("/");
        }}
        className="flex flex-col gap-2 pt-24"
      >
        <Label>Enter your name</Label>
        <Input
          name="name"
          autoFocus
          required
          min={3}
          max={10}
          defaultValue={storedName}
          className="w-full"
        />
        <Button className="w-full">Go!</Button>
      </form>
    </Layout>
  );
};

export default Create;
