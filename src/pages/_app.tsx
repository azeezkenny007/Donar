import type { AppProps } from "next/app";
import "../styles/index.css";
// import "@fontsource/play";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
