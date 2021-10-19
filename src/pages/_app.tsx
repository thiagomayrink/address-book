import "@/styles/reset.css";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";

import Head from "next/head";
import theme from "@/styles/themes/theme";

import TopAppBar from "@/components/TopAppBar";
import Footer from "@/components/Footer";
import Spreader from "@/components/Spreader";
import { ToastContainer } from "react-toastify";

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <>
      <Head>
        <title>Address Book</title>
        <link href="/favicon.ico" rel="icon" />
        <meta
          content="minimum-scale=1, initial-scale=1, width=device-width"
          name="viewport"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer />
        <TopAppBar />
        <Spreader height="24px" />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </>
  );
}
