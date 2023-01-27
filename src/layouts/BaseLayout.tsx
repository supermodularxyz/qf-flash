import Head from "next/head";
import { PropsWithChildren } from "react";

export const BaseLayout = ({ children }: PropsWithChildren) => (
  <>
    <Head>
      <title>QF Flash Game</title>
      <meta name="description" content="QF Flash Game" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className="h-screen bg-gray-100 font-mono text-sm md:py-16">
      <div className="container relative mx-auto h-full max-w-md  bg-white md:rounded-xl md:shadow-2xl">
        {children}
      </div>
    </main>
  </>
);
