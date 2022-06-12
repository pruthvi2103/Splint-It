import "../styles/globals.css";

import { SessionProvider } from "next-auth/react";
import { AppProps } from "../src/types/common";
import AuthGuard from "../src/hoc/AuthGuard";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      {Component.requireAuth ? (
        <AuthGuard>
          <Component {...pageProps} />
        </AuthGuard>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}

export default MyApp;
