import type { PropsWithChildren, ReactNode } from "react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useIsFetching } from "@tanstack/react-query";
import { Hexagon, Wallet } from "lucide-react";

import { Button } from "components/Button";
import { useWallet } from "providers/WalletProvider";
import { APP_NAME, BaseLayout } from "./BaseLayout";

const Logo = () => {
  const isFetching = useIsFetching();
  return (
    <Link
      href={"/"}
      className="flex pl-1 text-xs font-bold tracking-widest hover:text-amber-700"
    >
      <div className="relative -top-0.5 mr-1">
        <Hexagon
          className={clsx("h-4 w-4  transition-colors", {
            ["animate-ping text-amber-700"]: isFetching,
          })}
        />
        <Hexagon
          className={clsx("absolute left-0 top-0  h-4 w-4 text-gray-800 ")}
        />
      </div>
      {APP_NAME}
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
      <header className="flex items-center justify-between bg-amber-300 p-1">
        <Logo />
        <div className="flex items-center gap-1 text-xs">
          <NavLink label="Leaderboard" href={`/leaderboard`} />
          <NavLink label="What is this?" href={`/about`} />
          <Link href={`/wallet`} className="">
            <Button intent={"ghost"} className="rounded-full py-2 px-2">
              <Wallet className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>
      <div className="h-[2px] bg-gradient-to-r from-amber-300   to-amber-600 " />
      <div className="p-4">
        {isLoading ? (
          <Alert>
            <div className="h-8 w-8 animate-ping rounded-full border-4 border-amber-400" />
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
      <Footer />
    </BaseLayout>
  );
};

const Footer = () => (
  <div className="absolute bottom-0 w-full">
    <div className="flex justify-center gap-2 text-[10px] text-gray-500">
      <div>
        by{" "}
        <a
          href="https://supermodular.xyz"
          target="_blank"
          rel="noreferrer"
          className="font-bold hover:text-indigo-600"
        >
          supermodular
        </a>
      </div>
      <div className="relative text-indigo-500">
        ♥<div className="absolute top-[1px]  animate-ping">♥</div>
      </div>
      <a
        href="https://github.com/supermodularxyz/qf-flash"
        target="_blank"
        rel="noreferrer"
        className="hover:text-indigo-600"
      >
        &lt;view source\&gt;
      </a>
    </div>
  </div>
);

const NavLink = ({ href = "", label = "" }) => {
  const router = useRouter();
  const isActive = router.asPath === href;
  return (
    <Link
      className={clsx("rounded p-3 hover:bg-amber-400", {
        ["underline underline-offset-2"]: isActive,
      })}
      href={href}
    >
      {label}
    </Link>
  );
};
