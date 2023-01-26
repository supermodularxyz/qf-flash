import { useReducer } from "react";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { Zap } from "lucide-react";

import { Layout } from "components/Layout";
import { Label } from "components/Form";
import { Button } from "components/Button";
import { useTokenBalance } from "hooks/useContract";

const Send: NextPage = () => {
  const router = useRouter();
  const balance = useTokenBalance();

  const [amount, dispatch] = useReducer(
    (state: number, action: "inc" | "reset") =>
      action === "reset" ? 0 : state < Number(balance.data) ? state + 1 : state,
    0
  );

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
          <Label className="mb-4 text-center">
            How many tokens do you want to send?
          </Label>
          <div className="relative">
            <div className="text-center">
              <span className=" mr-2 text-4xl">{amount}</span>
              <span className="text-sm">/ {balance.data}</span>
            </div>
            <Button
              type="button"
              className="absolute right-0 top-0"
              onClick={() => dispatch("reset")}
            >
              Reset
            </Button>
          </div>
          <div className="mb-16 flex justify-center">
            <div
              className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-gray-200 transition-colors hover:bg-gray-300 active:bg-gray-100"
              onClick={() => dispatch("inc")}
            >
              <Zap />
            </div>
          </div>
          <div className="flex justify-center">
            <Button className="" type="submit">
              Send
            </Button>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default Send;
