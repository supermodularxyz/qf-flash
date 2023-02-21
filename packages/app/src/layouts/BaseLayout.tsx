import Head from "next/head";
import { type PropsWithChildren, useEffect } from "react";

export const APP_NAME = "QuadHoney";
const APP_DESCRIPTION = `There is $10k at stake, which will be distributed via QF. You have 100 tokens in your wallet. Scan another attendees QR code to vote for them`;

export const BaseLayout = ({ children }: PropsWithChildren) => {
  useMobileHeightFix();

  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
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
        <div
          className="container relative mx-auto h-full max-w-md bg-white md:rounded-xl md:shadow-2xl"
          style={{ maxHeight: 851, height: `calc(var(--vh, 1vh) * 100)` }}
        >
          {children}
        </div>
      </main>
    </>
  );
};

function useMobileHeightFix() {
  useEffect(() => {
    function setHeight() {
      const vh = window.innerHeight * 0.01;
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
    setHeight();
    window.addEventListener("resize", setHeight);
    return () => window.removeEventListener("resize", setHeight);
  }, []);
}
