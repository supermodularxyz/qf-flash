import { type NextPage } from "next";
import { useRouter } from "next/router";
import { Layout } from "components/Layout";
import { Input, Label } from "components/Form";
import { Button } from "components/Button";
import { useBalance } from "hooks/useBalance";

const Send: NextPage = () => {
  const router = useRouter();
  const balance = useBalance();
  return (
    <Layout>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const target = e.target as HTMLFormElement;
          const { address } = Object.fromEntries(new FormData(target));

          router.push("/");
        }}
      >
        <div className="flex flex-col gap-2">
          <Label>How many tokens do you want to send?</Label>
          <div>
            <Input
              autoFocus
              className="w-full"
              required
              name="address"
              placeholder="13"
              type="number"
              inputMode="numeric"
            />
            <span className="text-xs text-gray-600">
              You have: {balance.data?.formatted}
            </span>
          </div>
          <Button className="w-full" type="submit">
            Send
          </Button>
        </div>
      </form>
    </Layout>
  );
};

export default Send;
