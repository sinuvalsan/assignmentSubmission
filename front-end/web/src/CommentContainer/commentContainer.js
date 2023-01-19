import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Comment from "../Comment/comment";
import httpRequest from "../Services/httpServices";
import { useUser } from "../UserProvider/userProvider";
import { useInterval } from "../util/useInterval";

const CommentContainer = (props) => {
  const { assignmentId } = props;
  const user = useUser();
  const emptyComment = {
    id: null,
    text: "",
    assignmentId: assignmentId != null ? parseInt(assignmentId) : null,
    user: user.jwt,
    createdDate: null,
  };

  const [comment, setComment] = useState(emptyComment);

  const [comments, setComments] = useState([]);

  useInterval(() => {
    updateCommentTimeDisplay();
  }, 1000 * 5);

  function updateCommentTimeDisplay() {
    const commentsCopy = [...comments];
    commentsCopy.forEach(
      (comment) => (comment.createdDate = dayjs(comment.createdDate))
    );
    formatComments(commentsCopy);
  }

  function formatComments(commentsCopy) {
    commentsCopy
      .sort((a, b) => {
        if (a.createdDate > b.createdDate) return -1;
        else return 1;
      })
      .forEach((comment) => {
        if (typeof comment.createDate === "string") {
          comment.createDate = dayjs(comment.createDate);
        }
      });
    setComments(commentsCopy);
  }

  useEffect(() => {
    httpRequest(
      `/api/comments?assignmentId=${assignmentId}`,
      "GET",
      user.jwt
    ).then((commentsData) => {
      formatComments(commentsData);
    });
  }, []);

  function updateComment(value) {
    const commentCopy = { ...comment };
    commentCopy.text = value;
    setComment(commentCopy);
  }

  function submitComment() {
    if (comment.id) {
      httpRequest(`/api/comments/${comment.id}`, "put", user.jwt, comment).then(
        (d) => {
          const commentsCopy = [...comments];
          const i = commentsCopy.findIndex((comment) => comment.id === d.id);
          commentsCopy[i] = d;
          formatComments(commentsCopy);
          setComment(emptyComment);
        }
      );
    } else {
      httpRequest("/api/comments", "post", user.jwt, comment).then((d) => {
        const commentsCopy = [...comments];
        commentsCopy.push(d);
        formatComments(commentsCopy);
        setComment(emptyComment);
      });
    }
  }

  function handleEditComment(commentId) {
    const i = comments.findIndex((comment) => comment.id === commentId);
    const commentCopy = {
      id: comments[i].id,
      text: comments[i].text,
      assignmentId: assignmentId != null ? parseInt(assignmentId) : null,
      user: user.jwt,
      createdDate: comments[i].createdDate,
    };
    setComment(commentCopy);
  }

  function handleDeleteComment(commentId) {
    httpRequest(`/api/comments/${commentId}`, "DELETE", user.jwt).then(
      (msg) => {
        const commentsCopy = [...comments];
        const i = comments.findIndex((comment) => comment.id === commentId);
        commentsCopy.splice(i, 1);
        formatComments(commentsCopy);
      }
    );
  }

  return (
    <>
      <div className="mt-5">
        <h4>Comments</h4>
      </div>
      <Row>
        <Col lg="8" md="10" sm="12">
          <textarea
            style={{ width: "100%", borderRadius: "0.25em" }}
            onChange={(e) => updateComment(e.target.value)}
            value={comment.text}
          ></textarea>
        </Col>
      </Row>
      <Button onClick={() => submitComment()}>Post Comment</Button>
      <div className="mt-5">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            commentData={comment}
            emitDeleteComment={handleDeleteComment}
            emitEditComment={handleEditComment}
          />
        ))}
      </div>
    </>
  );
};

export default CommentContainer;
