import { parseEther } from "ethers/lib/utils.js";
import { useSendTransaction } from "hooks/useSendTransaction";
import { Input } from "./Form";
import { Button } from "./Button";

export const TransferTokens = () => {
  const send = useSendTransaction();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const { to, amount } = Object.fromEntries(new FormData(target)) as {
          to: string;
          amount: string;
        };
        send.mutate({ to, value: parseEther(amount) });
      }}
    >
      <h3 className="font-bold">Transfer</h3>
      <div className="mb-2 flex items-center gap-1">
        <label>
          To
          <Input name="to" />
        </label>
        <label>
          Amount
          <Input name="amount" />
        </label>
      </div>
      <Button type="submit">Send</Button>
    </form>
  );
};
