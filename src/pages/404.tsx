import Head from "next/head";
import router from "next/router";

import { WithAuth } from "../resources/lib/WithAuth";

const NotFound = () => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <title>AMS | 404</title>
    </Head>

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      NOT-FOUND
    </div>
  </>
);

export default WithAuth(NotFound, router);
