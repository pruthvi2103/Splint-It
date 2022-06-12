import { NextComponentType, NextPageContext } from "next";

export type AppProps = {
  pageProps: Record<string, never>;
  Component: NextComponentType<NextPageContext, any, {}> & {
    requireAuth?: boolean;
  };
};
