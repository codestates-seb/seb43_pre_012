import { useState } from "react";
import styled from "styled-components";

const Contaienr = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CommentLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  width: 80%;
  height: 35px;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  margin-bottom: 2px;
  padding-left: 5px;
`;

const CommentInfo = styled.h5`
  font-size: ${(props) => props.theme.fontSizes.lg};
  margin-right: 10px;
`;

const Btn = styled.span`
  margin: 20px;
  font-size: ${(props) => props.theme.fontSizes.lg};
  color: gray;

  &:hover {
    color: #0c0d0e;
    cursor: pointer;
  }
`;

const dummyComments = ["I am happy", "I feel good"];

export default function Comments({ comments, setMakeComment }) {
  return (
    <Contaienr>
      {dummyComments.map((comment, index) => (
        <CommentLine key={comment}>
          <CommentInfo>{index + 1}</CommentInfo>
          <CommentInfo>{comment}</CommentInfo>
          <CommentInfo>홍길동</CommentInfo>
        </CommentLine>
      ))}
      <Btn onClick={setMakeComment((prev) => true)}>Add a comment</Btn>
    </Contaienr>
  );
}
