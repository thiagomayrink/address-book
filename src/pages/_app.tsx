import "@/styles/globals.css";
import "@/styles/reset.css";

import Head from "next/head";

import type { AppProps } from "next/app";

import TopAppBar from "@/components/TopAppBar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Icons"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          rel="stylesheet"
        />
      </Head>
      <TopAppBar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
