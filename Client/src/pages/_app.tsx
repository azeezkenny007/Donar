import type { AppProps } from "next/app";
import "../styles/index.css";
import { DonarProvider } from "../DonarBackend/Donar";
import { FirebaseBackendProvider } from "../DonarBackend/constants/Donar2";
// import { ToastContainer } from "react-toastify";
// import "@fontsource/play";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <FirebaseBackendProvider>
      <DonarProvider>
        <Component {...pageProps} />
      </DonarProvider>
      </FirebaseBackendProvider>
    </div>
  );
}
