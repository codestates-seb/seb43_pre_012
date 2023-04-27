import styled from "styled-components";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { updateQuestion } from "../hooks/tempUseQuestion";

const Container = styled.form`
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

const Btn = styled.button`
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

export default function EditQuestion({ question }) {
  const tempTags = ["JavaScript", "Java"];

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const detailRef = useRef();
  // const { updateQuestion } = useQuestion();
  const queryClient = useQueryClient();

  const handleEdit = async (data) => {
    const { questionStatus, questionId } = question;
    const { title } = data;
    const tags = data.tags.split(",");
    const content = detailRef.current.getInstance().getHTML();
    if (content === "") return;

    const editedQuestion = { questionId, title, content, questionStatus };

    await updateQuestion(editedQuestion);

    window.location.reload();
    // window.location.replace(`/questions/${question.questionId}`);
  };

  return (
    <Container onSubmit={handleSubmit(handleEdit)}>
      <Title>Edit Question</Title>
      <Line>
        <LineTitle>Title</LineTitle>
        <Input
          defaultValue={question.title}
          placeholder="Input Title"
          {...register("title", { required: true })}
        />
      </Line>
      <Line>
        <LineTitle>Detail</LineTitle>
        <Editor
          initialValue={question.content || question.body}
          previewStyle="vertical"
          height="200px"
          initialEditType="wysiwyg"
          useCommandShortcut={false}
          language="ko-KR"
          ref={detailRef}
        />
      </Line>
      <Line>
        <LineTitle>Tags</LineTitle>
        <Input
          {...register("tags", { required: true })}
          defaultValue={tempTags.join(",")}
          placeholder="You can separate tags using ','"
        />
      </Line>
      <Btn>Edit</Btn>
    </Container>
  );
}
