import Head from "next/head";

import { motion } from "framer-motion";

import C from "../styles/Student/Home/Home.module.scss";

import StudentLayout from "../components/Student/StudentLayout";
import Post from "@/components/Student/Post";
import SideContent from "@/components/Student/SideContent";

import UseResize from "@/resources/utils/hooks/useResize";

import { SvgHandler } from "@/resources/utils/handlers/SvgHandler";

import { GetPosts } from "@/resources/api/Post/GetPosts";
import { Key, useEffect, useState } from "react";

function Student() {
  const [Posts, setPosts] = useState<any>(null);

  const { windowHeight } = UseResize();

  const { isSuccess, isError, error, data, refetch } = GetPosts();

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setPosts(data?.data);
    }

    if (isError) {
      console.log(error);
    }
  }, [isSuccess, isError]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>AMS | STUDENT</title>
      </Head>

      <div className={C.Home}>
        <SideContent />

        <div className={`${C.PostArea}`}>
          <div
            className={`${C.PostsHolder} ${"NoScroll"}`}
            style={{
              height: (windowHeight && windowHeight - 55) + "px",
            }}
          >
            {Posts && Posts.map((E: any) => <Post Data={E} key={E._id} />)}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 1 } }}
            exit={{ opacity: 0 }}
            className={C.SvgHolder}
          >
            {SvgHandler.ArrowDown()}
          </motion.div>
        </div>
      </div>
    </>
  );
}

Student.GetLayout = (Page: any) => <StudentLayout>{Page}</StudentLayout>;

export default Student;
