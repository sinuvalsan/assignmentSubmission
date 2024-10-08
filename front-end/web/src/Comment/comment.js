import jwt_decode from "jwt-decode";
import { useUser } from "../UserProvider/userProvider";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const Comment = (props) => {
  const user = useUser();
  const decodedJwt = jwt_decode(user.jwt);
  const { id, createdDate, createdBy, text } = props.commentData;
  const { emitEditComment, emitDeleteComment } = props;

  const [commentRelativeTime, setCommentRelativeTime] = useState("");

  useEffect(() => {
    updateCommentRelativeTime();
  }, [createdDate]);

  function updateCommentRelativeTime() {
    if (createdDate) {
      dayjs.extend(relativeTime);

      if (typeof createdDate === "string")
        setCommentRelativeTime(dayjs(createdDate).fromNow());
      else {
        setCommentRelativeTime(createdDate.fromNow());
      }
    }
  }

  return (
    <>
      <div className="comment-bubble">
        <div className="d-flex gap-5" style={{ fontWeight: "bold" }}>
          <div>{`${createdBy.name}`}</div>
          {decodedJwt.sub === createdBy.username ? (
            <>
              <div>
                <FaEdit onClick={() => emitEditComment(id)} />
              </div>
              <div>
                <MdDelete onClick={() => emitDeleteComment(id)} />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <div>{text}</div>
      </div>
      <div
        style={{ marginTop: "-1.25em", marginLeft: "1.4em", fontSize: "12px" }}
      >
        {commentRelativeTime ? `Posted ${commentRelativeTime}` : ""}
      </div>
    </>
  );
};

export default Comment;
