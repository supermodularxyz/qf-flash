import { useIsFetching } from "@tanstack/react-query";
import clsx from "clsx";
import { Wallet, Zap } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { Button } from "./Button";

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
export const Layout = ({ children }: PropsWithChildren) => (
  <>
    <Head>
      <title>QF Flash Game</title>
      <meta name="description" content="QF Flash Game" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className="text-md h-screen bg-gray-100 font-mono md:py-16">
      <div className="container mx-auto h-full max-w-md bg-white  md:rounded-xl md:shadow-2xl">
        <header className="flex items-center justify-between p-1">
          <Logo />
          <div className="flex items-center gap-1 text-xs">
            <Link
              className="rounded p-3 hover:bg-gray-100"
              href={`/leaderboard`}
            >
              Leaderboard
            </Link>
            <Link className="rounded p-3 hover:bg-gray-100" href={`/about`}>
              What is this?
            </Link>
            <Link href={`/wallet`} className="">
              <Button className="rounded-full py-2 px-2">
                <Wallet className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </header>
        <div className="h-[2px] bg-gradient-to-r from-fuchsia-500 via-red-500  to-yellow-500 " />
        <div className="p-4">{children}</div>
      </div>
    </main>
  </>
);
