import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CommentLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  height: 35px;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  margin-bottom: 2px;
  padding-left: 10px;
`;

const CommentInfos = styled.div`
  display: flex;
  align-items: center;
`;

const CommentInfo = styled.h5`
  font-size: ${(props) => props.theme.fontSizes.lg};
  margin-right: 10px;
`;

const CommentBtn = styled.span`
  margin: 20px;
  font-size: ${(props) => props.theme.fontSizes.lg};
  color: gray;

  &:hover {
    color: #0c0d0e;
    cursor: pointer;
  }
`;

const EditCommentInput = styled.input`
  width: 60%;
  height: 80%;
  padding-left: 10px;
`;

const dummyComments = ["I am happy", "I feel good"];

export default function Comments({ comments, setMakeComment }) {
  return null;
}
