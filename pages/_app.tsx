import Providers from "@/store/provider";
import React from "react";
import "../app/globals.css";
import Header from "@/components/Header";
export default function App({ Component, pageProps }: any) {
  return (
    <Providers>
      <Header />
      <Component {...pageProps} />
    </Providers>
  );
}
