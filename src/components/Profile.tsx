import { useName } from "hooks/useName";
import { useRole } from "hooks/useRole";
import { useWallet } from "providers/WalletProvider";
import { roleEmoji } from "utils/roles";

export const Profile = () => {
  const { wallet } = useWallet();
  const role = useRole();
  const name = useName(wallet?.address as string);

  return (
    <div>
      <div className="text-4xl">{roleEmoji[role?.data || 0]}</div>
      <div className="text-center">{name.data}</div>
    </div>
  );
};
