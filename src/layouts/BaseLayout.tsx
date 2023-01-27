import Head from "next/head";
import { PropsWithChildren, useEffect } from "react";

export const BaseLayout = ({ children }: PropsWithChildren) => {
  useMobileHeightFix();

  return (
    <>
      <Head>
        <title>QF Flash Game</title>
        <meta name="description" content="QF Flash Game" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen bg-gray-100 font-mono text-sm md:py-16">
        <div
          className="app container relative mx-auto h-full max-w-md bg-white md:rounded-xl md:shadow-2xl"
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
