import styled from "styled-components";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { updateAnswer } from "../hooks/tempUseQuestion";

const Container = styled.div`
  max-width: 800px;
  width: 60vw;
  min-height: 600px;
  height: 70vh;
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
  justify-content: center;
`;

const Title = styled.h3`
  font-size: 30px;
  font-weight: bold;
`;

const Line = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LineTitle = styled.h4`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  height: 30px;
  font-size: 20px;
  padding-left: 10px;
`;

const Btn = styled.div`
  width: 100px;
  height: 50px;
  background-color: ${(props) => props.theme.colors.skyblue};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: 5px;
  font-size: 20px;

  &:hover {
    cursor: pointer;
  }

  &:active {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
`;

export default function EditAnswer({ answer }) {
  const navigate = useNavigate();
  const detailRef = useRef();

  const handleEdit = async () => {
    const { answerId, selected } = answer;
    const content = detailRef.current.getInstance().getHTML();
    if (content === "") return;

    let editedAnswer = { answerId, content, selected };
    await updateAnswer(editedAnswer);

    navigate(`/questions/${answer.questionId}`, { replace: true });
  };

  return (
    <Container>
      <Title>Edit answer</Title>
      <Line>
        <LineTitle>Detail</LineTitle>
        <Editor
          initialValue={answer.content}
          previewStyle="vertical"
          height="200px"
          // initialEditType="wysiwyg"
          useCommandShortcut={false}
          language="ko-KR"
          ref={detailRef}
        />
      </Line>
      <Btn
        onClick={() => {
          handleEdit();
        }}
      >
        Edit
      </Btn>
    </Container>
  );
}
