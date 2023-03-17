import Head from "next/head";

import "../styles/style.css";

import { QueryClient, QueryClientProvider } from "react-query";

import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import store from "@/resources/redux/store";
import { Provider as ReduxProvider } from "react-redux";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
const App = (props: { Component: any; pageProps: any }) => {
  const { Component, pageProps } = props;

  const GetLayout = Component.GetLayout || ((Page: any) => Page);
  const Layout = Component.layout;
  const Router = useRouter();
  const queryClient = new QueryClient();

  return (
    <>
      <Head>
        <title>AMS</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <ReduxProvider store={store}>
          <AnimatePresence>
            {Layout ? (
              <Layout key={Layout.key}>
                <Component key={Router.basePath} />
              </Layout>
            ) : (
              GetLayout(<Component {...pageProps} key={Router.asPath} />)
            )}
          </AnimatePresence>
        </ReduxProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
