import Head from "next/head";
import { PropsWithChildren, useEffect } from "react";

const APP_NAME = "QF Flash Game";
const APP_DESCRIPTION = `There is $10k at stake, which will be distributed via QF. You have 100 tokens in your wallet. Scan another attendees QR code to vote for them`;

export const BaseLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Head>
        <title>QF Flash Game</title>
        <meta name="application-name" content={APP_NAME} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={APP_NAME} />
        <meta name="description" content={APP_DESCRIPTION} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#FFFFFF" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen bg-gray-100 font-mono text-sm md:py-16">
        <div className="container relative mx-auto h-full max-w-md bg-white md:rounded-xl md:shadow-2xl">
          {children}
        </div>
      </main>
    </>
  );
};
