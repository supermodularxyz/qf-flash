import { useReducer } from "react";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { Zap } from "lucide-react";

import { Layout } from "layouts/Layout";
import { Label } from "components/Form";
import { Button } from "components/Button";
import { useSend } from "hooks/useSend";
import { useTokenBalance } from "hooks/useBalance";
import { storage } from "utils/storage";
import { useQueryClient } from "@tanstack/react-query";

const Send: NextPage = () => {
  const router = useRouter();
  const balance = useTokenBalance();
  const client = useQueryClient();

  const send = useSend();
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

          const to = router.query.address as string;
          const name = storage.get("name") as string;
          console.log(to, amount, name);
          send.mutate(
            { to, amount, name },
            {
              onSuccess: () => {
                router.push("/");
              },
              onError: console.log,
            }
          );
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
              disabled={send.isLoading}
              type="button"
              className="absolute right-0 top-0"
              onClick={() => dispatch("reset")}
            >
              Reset
            </Button>
          </div>
          <div className="mb-16 flex justify-center">
            <button
              disabled={send.isLoading}
              type="button"
              className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-gray-200 transition-colors hover:bg-gray-300 active:bg-gray-100"
              onClick={() => dispatch("inc")}
            >
              <Zap />
            </button>
          </div>
          <div className="flex justify-center">
            <Button
              className=""
              type="submit"
              disabled={!amount || send.isLoading}
            >
              {send.isLoading ? "Sending..." : "Send"}
            </Button>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default Send;
