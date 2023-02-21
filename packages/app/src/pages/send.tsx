import { type NextPage } from "next";
import { useReducer, useState } from "react";
import { useRouter } from "next/router";

import { Layout } from "layouts/Layout";
import { Label } from "components/Form";
import { Button } from "components/Button";
import { useSend } from "hooks/useSend";
import { useTokenBalance } from "hooks/useBalance";
import { storage } from "utils/storage";
import { Burst } from "components/particles/Burst";
import { ArrowUp } from "lucide-react";
import clsx from "clsx";
import { Skeleton } from "components/Skeleton";

const isRoleError = (err: unknown) =>
  (err as Error)?.message?.includes?.("Must fulfill roles");

const Instructions = ({ hide = false }) =>
  hide ? null : (
    <span className="absolute left-1/2 bottom-2 flex -translate-x-1/2 flex-col items-center gap-4 pl-2 text-gray-500">
      <ArrowUp className="absolute left-1/2 -top-5 h-4 w-4 -translate-x-1/2" />
      <div>Tap to add tokens</div>
    </span>
  );

export const FlowerButton = ({
  disabled,
  onClick,
}: {
  disabled: boolean;
  onClick: () => void;
}) => {
  // Only show instructions until use has pressed the button
  const [hideInstructions, setHideInstructions] = useState(
    () => storage.get("instructions.send") === "hidden"
  );
  function handleClick() {
    setHideInstructions(true);
    storage.set("instructions.send", "hidden");
    onClick();
  }

  return (
    <>
      <div className="relative flex select-none justify-center pt-16 pb-16">
        <button
          disabled={disabled}
          type="button"
          className={clsx(
            "select-none rounded-full bg-transparent text-7xl duration-[60ms] active:scale-75",
            { ["animate-pulse"]: !hideInstructions }
          )}
          onClick={handleClick}
        >
          🌼
        </button>
        <Burst isIdle={!hideInstructions} />
        <Instructions hide={hideInstructions} />
      </div>
    </>
  );
};

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
              <span className="text-sm">
                /
                <Skeleton isLoading={balance.isLoading} className="w-4">
                  {balance.data}
                </Skeleton>
              </span>
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
          <FlowerButton
            disabled={send.isLoading}
            onClick={() => dispatch("inc")}
          />
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
