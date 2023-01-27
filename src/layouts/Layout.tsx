import { useIsFetching } from "@tanstack/react-query";
import clsx from "clsx";
import { Button } from "components/Button";
import { Wallet, Zap } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useWallet } from "providers/WalletProvider";
import { PropsWithChildren, ReactNode } from "react";
import { BaseLayout } from "./BaseLayout";

const Logo = () => {
  const isFetching = useIsFetching();
  return (
    <Link
      href={"/"}
      className="flex pl-1 text-xs font-bold tracking-widest hover:text-gray-600"
    >
      <Zap
        className={clsx("mr-2 h-4 w-4 transition-colors", {
          ["animate-ping text-yellow-500"]: isFetching,
        })}
      />
      QF flash
    </Link>
  );
};

const Alert = (props: PropsWithChildren) => (
  <div className="flex h-64 items-center justify-center" {...props} />
);
export const Layout = ({
  children,
  fab,
}: { fab?: ReactNode } & PropsWithChildren) => {
  const { wallet, isLoading } = useWallet();

  return (
    <BaseLayout>
      <header className="flex items-center justify-between p-1">
        <Logo />
        <div className="flex items-center gap-1 text-xs">
          <NavLink label="Leaderboard" href={`/leaderboard`} />
          <NavLink label="What is this?" href={`/about`} />
          <Link href={`/wallet`} className="">
            <Button className="rounded-full py-2 px-2">
              <Wallet className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>
      <div className="h-[2px] bg-gradient-to-r from-fuchsia-500 via-red-500  to-yellow-500 " />
      <div className="p-4">
        {isLoading ? (
          <Alert>
            <div className="h-8 w-8 animate-ping rounded-full border-4 border-fuchsia-500" />
          </Alert>
        ) : wallet ? (
          children
        ) : (
          <Alert>
            <div className="flex flex-col gap-4">
              <div className="text-center">No wallet found</div>
              <Link href={"/playground"}>
                <Button>Create one in Playground</Button>
              </Link>
            </div>
          </Alert>
        )}
      </div>
      <div className="absolute bottom-8 right-8">{wallet && fab}</div>
    </BaseLayout>
  );
};

const NavLink = ({ href = "", label = "" }) => {
  const router = useRouter();
  const isActive = router.asPath === href;
  return (
    <Link
      className={clsx("rounded p-3 hover:bg-gray-100", {
        ["underline underline-offset-2"]: isActive,
      })}
      href={href}
    >
      {label}
    </Link>
  );
};
