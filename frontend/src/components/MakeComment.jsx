import { useState } from "react";
import styled from "styled-components";
import { addComment } from "../hooks/tempUseQuestion";
import { getMemberId } from "../hooks/useUserInfo";

const Container = styled.div`
  max-width: 800px;
  width: 60vw;
  height: 200px;
  background-color: white;
  position: fixed;
  top: 100px;
  margin: 0 auto;
  left: 0;
  right: 0;
  z-index: 20;
  border-radius: 20px;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const Title = styled.h3`
  font-size: 30px;
`;

const ErrorMsg = styled.h4`
  font-size: 20px;
  color: red;
`;

const Input = styled.input`
  width: 70%;
  height: 30px;
  padding-left: 10px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const Btn = styled.div`
  width: 100px;
  height: 60px;
  background-color: ${(props) => props.theme.colors.skyblue};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;

  &:active {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
`;

export default function MakeComment({ answerId, questionId }) {
  const [comment, setComment] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleComment = (e) => {
    setComment((prev) => e.target.value);
  };

  const enterComment = async () => {
    if (comment.length > 40) {
      setErrMsg((prev) => "25자 이내로 입력하세요.");
      return;
    }
    setErrMsg((prev) => "");
    const memberId = getMemberId();

    const newComment = {
      memberId,
      answerId,
      comment,
    };

    await addComment(newComment);
    navigate(`/questions/${question.questionId}`, { replace: true });
  };

  return (
    <Container>
      <Title>Enter your comment</Title>
      {errMsg && <ErrorMsg>{errMsg}</ErrorMsg>}
      <Input
        placeholder="Enter your comment"
        type="text"
        onChange={handleComment}
      />
      <Btn onClick={enterComment}>Enter</Btn>
    </Container>
  );
}
