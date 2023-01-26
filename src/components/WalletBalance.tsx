import { useBalance } from "hooks/useBalance";
import { Skeleton } from "./Skeleton";

export const WalletBalance = () => {
  const balance = useBalance();

  return (
    <div className="flex items-center text-sm">
      Balance:{" "}
      <Skeleton isLoading={balance.isLoading} className="max-w-[100px]">
        {Number(balance.data?.formatted).toFixed(3)}
      </Skeleton>
    </div>
  );
};
