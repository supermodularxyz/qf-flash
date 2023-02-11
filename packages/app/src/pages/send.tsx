import { type NextPage } from "next";
import { useReducer } from "react";
import { useRouter } from "next/router";

import { Layout } from "layouts/Layout";
import { Label } from "components/Form";
import { Button } from "components/Button";
import { useSend } from "hooks/useSend";
import { useTokenBalance } from "hooks/useBalance";
import { storage } from "utils/storage";
import { Burst } from "components/particles/Burst";

const isRoleError = (err: unknown) =>
  (err as Error)?.message?.includes?.("Must fulfill roles");

const Send: NextPage = () => {
  const router = useRouter();
  const balance = useTokenBalance();

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

          send
            .mutateAsync({ to, amount, name })
            .then(() => router.push("/success"))
            .catch(console.log);
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
          <div className="relative flex select-none justify-center pt-16 pb-16">
            <button
              disabled={send.isLoading}
              type="button"
              className="select-none rounded-full bg-transparent text-7xl duration-[60ms] active:scale-75"
              onClick={() => dispatch("inc")}
            >
              {"🌼"}
            </button>
            <Burst />
          </div>
          <div className="mx-auto flex w-48 justify-center">
            <Button
              className="w-full"
              type="submit"
              intent={"primary"}
              disabled={!amount || send.isLoading}
            >
              {send.isLoading ? "Sending..." : "Send"}
            </Button>
          </div>
          <span className="py-4 text-center text-xs text-red-600">
            {isRoleError(send.error)
              ? "Flowers cannot send tokens to Bees"
              : send.error
              ? "Unknown error"
              : ""}
          </span>
        </div>
      </form>
    </Layout>
  );
};

export default Send;
