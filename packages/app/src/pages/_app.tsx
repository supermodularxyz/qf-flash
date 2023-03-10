import { type AppType } from "next/app";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "../styles/globals.css";
import { WalletProvider } from "providers/WalletProvider";

const queryClient = new QueryClient();

const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL as string;

console.log(rpcUrl);
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <WalletProvider rpcUrl={rpcUrl}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </WalletProvider>
  );
};

export default MyApp;
