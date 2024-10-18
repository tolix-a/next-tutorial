import Header from "@/component/Header";
import "@/styles/globals.css";
import { Suspense } from "react";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header/>
      <Suspense fallback={<div>준비중...</div>}>
        <Component {...pageProps} />;
      </Suspense>
    </>
  )
}
