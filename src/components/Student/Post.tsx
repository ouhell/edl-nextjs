import { SvgHandler } from "@/resources/utils/handlers/SvgHandler";
import React, { useEffect, useState } from "react";

import C from "../../styles/Student/Home/Post.module.scss";

import { GetComments } from "@/resources/api/Post/GetComments";
import { GetReplies } from "@/resources/api/Post/GetReplies";
import { AddComment } from "@/resources/api/Post/AddComment";
import { AddReply } from "@/resources/api/Post/AddReply";

import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";

export default function Post(props: { Data: any }) {
  const { Data } = props;

  const [ViewAll, setViewAll] = useState(false);

  const [TheData, setTheData] = useState<any>(null);
  const [Comments, setComments] = useState<any>(null);

  const [CommentValue, setCommentValue] = useState<string | null>(null);

  const { error, data, mutate } = GetComments();
  const { error: AddError, data: AddData, mutate: AddMutate } = AddComment();

  useEffect(() => {
    setTheData(Data);
    mutate(Data._id);
  }, [Data]);

  useEffect(() => {
    if (data) {
      setComments(data?.data);
    }

    if (error) {
      console.log(error);
    }
  }, [data, error]);

  useEffect(() => {
    if (AddData) {
      setComments((Comments: any) => [...Comments, AddData.data]);
    }

    if (error) {
      console.log(AddError);
    }
  }, [AddError, AddData]);

  if (TheData && Comments) {
    return (
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { delay: 0.6 } }}
        exit={{ opacity: 0, y: -20 }}
        className={C.Post}
      >
        <div className={C.Wrapper}>
          <div className={C.Top}>
            <div className={C.Info}>
              <div className={C.Avatar}></div>

              <div className={C.Line}></div>

              <div className={C.TheInfo}>
                <p className={C.UserName}>{TheData.user.user_name}</p>

                <p className={C.Time}>
                  {format(new Date(TheData.createdAt), "dd-MMM")} on
                  <span>{TheData.subject}</span>
                </p>
              </div>
            </div>

            <div className={C.ArchiveButton}>{SvgHandler.BookMark()}</div>
          </div>

          <div className={C.Content}>
            <div className={C.Text}>{TheData.content}</div>

            {TheData.image && <div className={C.ImageHolder}></div>}
          </div>

          <form
            className={C.Form}
            onSubmit={(E) => {
              E.preventDefault();

              if (CommentValue && CommentValue != "") {
                setCommentValue(null);
                AddMutate({ post: TheData._id, content: CommentValue });
              }
            }}
          >
            <div className={C.Avatar}></div>

            <div className={C.Line}></div>

            <input
              type="text"
              value={CommentValue || ""}
              onChange={(E) => setCommentValue(E.target.value)}
            />

            <button className={C.SubmitButton}></button>
          </form>

          <div className={C.CommentSection}>
            {Comments?.length > 0 && (
              <>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={C.Title}
                >
                  All Comments
                </motion.p>

                <Comment Data={Comments[0]} />
              </>
            )}

            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={
                ViewAll
                  ? { height: "auto", opacity: 1 }
                  : { height: 0, opacity: 0 }
              }
              transition={{ type: "spring", stiffness: 600, damping: 40 }}
              className={C.CommentsHolder}
            >
              {Comments.slice(1).map((E: any) => (
                <Comment Data={E} key={E._id} />
              ))}
            </motion.div>

            {Comments.length > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={C.ViewAllButton}
                onClick={() => {
                  setViewAll(!ViewAll);
                }}
              >
                View All Comments
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    );
  } else {
    return <></>;
  }
}

function Comment(props: { Data: any }) {
  const { Data } = props;

  const [Comment, setComment] = useState<any>(null);
  const [Replies, setReplies] = useState<any>(null);

  const [ViewReplies, setViewReplies] = useState(false);
  const [ReplyValue, setReplyValue] = useState<string | null>(null);

  const { error, data, mutate } = GetReplies();
  const { error: AddError, data: AddData, mutate: AddMutate } = AddReply();

  useEffect(() => {
    setComment(Data);
    mutate(Data._id);
  }, [Data]);

  useEffect(() => {
    if (data) {
      setReplies(data?.data);
    }

    if (error) {
      console.log(error);
    }
  }, [data, error]);

  useEffect(() => {
    if (AddData) {
      setReplies((Replies: any) => [...Replies, AddData.data]);
    }

    if (error) {
      console.log(AddError);
    }
  }, [AddError, AddData]);

  if (Comment && Replies) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={C.Comment}
      >
        <div className={C.Avatar}></div>

        <div className={C.CommentContent}>
          <p className={C.Text}>
            <span>{Comment.user.user_name} --</span>
            {Comment.content}
          </p>

          <div
            className={C.ReplyButton}
            onClick={() => setViewReplies(!ViewReplies)}
          >
            Reply Comments
            <div className={C.SvgHolder}>{SvgHandler.LevlUp()}</div>
          </div>

          {Replies && (
            <>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={
                  ViewReplies
                    ? { height: "auto", opacity: 1 }
                    : { height: 0, opacity: 0 }
                }
                transition={{ type: "spring", stiffness: 600, damping: 40 }}
                className={C.ReplyCommentsHolder}
              >
                {Replies.map((E: any) => (
                  <Reply Data={E} key={E._id} />
                ))}
              </motion.div>
            </>
          )}

          <AnimatePresence>
            {ViewReplies && (
              <motion.form
                className={C.Form}
                initial={{
                  opacity: 0,
                  height: 0,
                  marginBottom: "0rem",
                  marginTop: "0",
                }}
                animate={{
                  opacity: 1,
                  height: "auto",
                  marginBottom: "1.5rem",
                  marginTop: "0.3rem",
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                  marginBottom: "0rem",
                  marginTop: "0",
                }}
                transition={{ type: "spring", stiffness: 800, damping: 40 }}
                onSubmit={(E) => {
                  E.preventDefault();

                  if (ReplyValue && ReplyValue != "") {
                    setReplyValue(null);
                    AddMutate({ comment: Comment._id, content: ReplyValue });
                  }
                }}
              >
                <input
                  type="text"
                  value={ReplyValue || ""}
                  onChange={(E) => setReplyValue(E.target.value)}
                />

                <button className={C.SubmitButton}></button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  } else {
    return <></>;
  }
}

function Reply(props: { Data: any }) {
  const { Data } = props;

  const [Reply, setReply] = useState<any>(null);

  useEffect(() => {
    setReply(Data);
  }, [Data]);

  if (Reply) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={C.Comment}
        style={{ paddingBottom: "0rem" }}
      >
        <div className={C.Avatar}></div>

        <div className={C.CommentContent}>
          <p className={C.Text}>
            <span>{Reply.user.user_name} --</span>
            {Reply.content}
          </p>
        </div>
      </motion.div>
    );
  } else {
    return <></>;
  }
}
