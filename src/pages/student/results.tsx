import Head from "next/head";

import { motion } from "framer-motion";

import StudentLayout from "../../components/Student/StudentLayout";

function Results() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>AMS | RESULTS</title>
      </Head>

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { delay: 0.4 } }}
        exit={{ opacity: 0, y: -20 }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        STUDENT : | : RESULTS
      </motion.div>
    </>
  );
}

Results.GetLayout = (Page: any) => <StudentLayout>{Page}</StudentLayout>;

export default Results;
