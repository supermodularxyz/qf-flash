import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "../styles/globals.css";
import { WalletProvider } from "providers/WalletProvider";

const queryClient = new QueryClient();

const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL as string;

console.log(rpcUrl);
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <WalletProvider rpcUrl={rpcUrl}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </QueryClientProvider>
    </WalletProvider>
  );
};

export default MyApp;
