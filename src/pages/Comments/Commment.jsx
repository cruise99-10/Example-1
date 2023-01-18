import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Comment = ({ commentId, comment }) => {
  const [isCommentEditMode, setIsCommentEditMode] = useState(false);
  const [editcomment, setEditcomment] = useState({
    comment: "",
    id: "",
  });

  const onDeleteComment = async (id) => {
    const result = window.confirm("삭제하시겠습니까?");
    if (result) {
      await axios.delete(
        `${process.env.REACT_APP_CAT}/board/${commentId}/${id}`
      );
      return window.location.reload();
    } else {
      return;
    }
  };

  const onEditComment = async (e) => {
    console.log(e);
    await axios.patch(`${process.env.REACT_APP_CAT}/comments/${e.id}`, e);
    // return window.location.reload();
  };

  return (
    <>
      {!isCommentEditMode ? (
        <StCommentBox>
          {comment.comment} : {comment.username}
          <br />
          <button
            size="large"
            onClick={() => {
              setIsCommentEditMode(true);
            }}
          >
            댓글 수정
          </button>
          <button
            size="large"
            onClick={() => {
              onDeleteComment(comment.id);
            }}
          >
            댓글 삭제
          </button>
        </StCommentBox>
      ) : (
        <form>
          <input
            required
            type="text"
            onChange={(ev) => {
              setEditcomment({
                ...editcomment,
                comment: ev.target.value,
                id: comment.id,
              });
            }}
          />
          <button onClick={() => onEditComment(editcomment)}>
            댓글 수정 완료
          </button>
        </form>
      )}
    </>
  );
};

export default Comment;

const StCommentBox = styled.div`
  margin: 10px 0 0;
  border: 1px solid black;
  width: 500px;
  height: 80px;
`;
