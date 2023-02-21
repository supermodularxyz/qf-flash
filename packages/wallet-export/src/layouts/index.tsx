import Head from "next/head";
import type { PropsWithChildren } from "react";

export const Layout = (props: PropsWithChildren) => {
  return (
    <>
      <Head>
        <title>Wallet Export</title>
        <meta name="description" content="Export generated wallets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto max-w-screen-md py-8">
        {props.children}
      </main>
    </>
  );
};
