import { useForm } from "react-hook-form";
import styled from "styled-components";
import TipBox from "../components/TipBox";
import { useEffect, useState } from "react";

const Wrapper = styled.form`
  width: 100%;
  height: auto;
  display: flex;
  align-items: start;
  margin-bottom: 500px;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`;

const Title = styled.h2`
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  padding: 0 30px;
`;

const Line = styled.div`
  width: 100%;
  margin: 10px 0;
  height: ${(props) => props.height};

  @media screen and (min-width: 1100px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;
  }
`;

const TipSpace = styled.div`
  width: 100%;
  height: 100%;

  @media screen and (max-width: 1100px) {
    display: none;
  }
`;

const QuestionTip = styled.div`
  border: 1px solid #a7cfed;
  height: ${(props) => props.height};
  background-color: ${(props) => props.bgColor};
  background-color: #ebf5fb;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 20px 0 20px 50px;
`;

const TipTitle = styled.h3`
  font-weight: bold;
`;

const TipContent = styled.h4`
  font-size: ${(props) => props.theme.fontSizes.lg};
`;

const Steps = styled.ul`
  padding-left: 25px;
`;

const Step = styled.li``;

const InputBox = styled.div`
  height: ${(props) => props.height};
  border: 1px solid ${(props) => props.theme.colors.gray};
  height: ${(props) => props.height};

  @media screen and (min-width: 1100px) {
    max-width: 850px;
  }

  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 25px;
  position: relative;
`;

const InputTitle = styled.h3`
  font-size: ${(props) => props.theme.fontSizes.lg};
  font-weight: bold;
  margin-bottom: 6px;
`;

const InputExplan = styled.h5`
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: 400;
  margin-bottom: 6px;
`;

const Input = styled.input`
  height: ${(props) => props.height};
  width: 100%;
  margin-bottom: 6px;
  padding-left: 10px;
`;

const Btn = styled.div`
  width: 50px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  color: white;
  background-color: ${(props) => props.theme.colors.skyblue};
  font-size: ${(props) => props.theme.fontSizes.md};

  &:hover {
    background-color: #0064bd;
  }
`;

const QuestionBtn = styled.button`
  width: 170px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  color: white;
  background-color: ${(props) => props.theme.colors.skyblue};
  font-size: ${(props) => props.theme.fontSizes.md};
  border: none;
`;

const Block = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.gray};
  opacity: 0.5;
`;

export default function QuestionDetail() {
  const { register, handleSubmit, watch, setValue } = useForm();
  const [inputTurn, setInputTurn] = useState(0);

  // console.log(watch());

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <Title>Ask a public question</Title>
      <Line height={"270px"}>
        <QuestionTip style={{ maxWidth: "850ppx" }}>
          <TipTitle style={{ fontSize: "25px" }}>
            Writing a good question
          </TipTitle>
          <>
            <TipContent>
              You’re ready to ask a programming-related question and this form
              will help guide you through the process.
            </TipContent>
            <TipContent>
              Looking to ask a non-programming question? See the topics here to
              find a relevant site.
            </TipContent>
          </>
          <TipTitle style={{ fontSize: "15px" }}>Steps</TipTitle>
          <Steps>
            <Step>Summarize your problem in a one-line title.</Step>
            <Step>Summarize your problem in a one-line title.</Step>
            <Step>
              Describe what you tried and what you expected to happen.
            </Step>
            <Step>
              Add “tags” which help surface your question to members of the
              community.
            </Step>
            <Step>Review your question and post it to the site.</Step>
          </Steps>
        </QuestionTip>
        <TipSpace></TipSpace>
      </Line>
      <Line height={"170px"}>
        <InputBox>
          <InputTitle>Title</InputTitle>
          <InputExplan>
            Be specific and imagine you’re asking a question to another person.
          </InputExplan>
          <Input
            height={"35px"}
            placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
            {...register("title", { required: true })}
          />
          <Btn
            onClick={() => {
              if (watch()["title"] === "") return;
              setInputTurn((prev) => prev + 1);
            }}
          >
            Next
          </Btn>
        </InputBox>
        <TipSpace>
          {inputTurn === 0 && (
            <TipBox
              icon={"pencil"}
              title={"Writing a good title"}
              contents={[
                "Your title should summarize the problem.",
                "You might find that you have a better idea of your title after writing out the rest of the question.",
              ]}
            />
          )}
        </TipSpace>
      </Line>
      <Line height={"350px"}>
        <InputBox>
          {inputTurn < 1 && <Block />}
          <InputTitle>What are the details of your problem?</InputTitle>
          <InputExplan>
            Introduce the problem and expand on what you put in the title.
            Minimum 20 characters.
          </InputExplan>
          <Input height={"220px"} {...register("detail", { required: true })} />
          <Btn
            onClick={() => {
              if (watch()["detail"] === "") return;
              setInputTurn((prev) => prev + 1);
            }}
          >
            Next
          </Btn>
        </InputBox>
        <TipSpace>
          {inputTurn === 1 && (
            <TipBox
              icon={"pencil"}
              title={"Introduce the problem"}
              contents={[
                "Explain how you encountered the problem you’re trying to solve, and any difficulties that have prevented you from solving it yourself.",
              ]}
            />
          )}
        </TipSpace>
      </Line>
      <Line height={"350px"}>
        <InputBox>
          {inputTurn < 2 && <Block />}
          <InputTitle>What did you try and what were you expecting?</InputTitle>
          <InputExplan>
            Describe what you tried, what you expected to happen, and what
            actually resulted. Minimum 20 characters.
          </InputExplan>
          <Input height={"220px"} {...register("effort", { required: true })} />
          <Btn
            onClick={() => {
              if (watch()["effort"] === "") return;
              setInputTurn((prev) => prev + 1);
            }}
          >
            Next
          </Btn>
        </InputBox>
        <TipSpace>
          {inputTurn === 2 && (
            <TipBox
              icon={"pencil"}
              title={"Expand on the problem"}
              contents={[
                "Show what you’ve tried, tell us what happened, and why it didn’t meet your needs.",
                "Not all questions benefit from including code, but if your problem is better understood with code you’ve written, you should include a minimal, reproducible example.",
                "Please make sure to post code and errors as text directly to the question (and not as images), and format them appropriately.        ",
              ]}
            />
          )}
        </TipSpace>
      </Line>
      <Line height={"170px"}>
        <InputBox>
          {inputTurn < 3 && <Block />}
          <InputTitle>Tags</InputTitle>
          <InputExplan>
            Add up to 5 tags to describe what your question is about. Start
            typing to see suggestions.
          </InputExplan>
          <Input
            height={"35px"}
            placeholder="e.g. (.net json vba)"
            {...register("tags", { required: true })}
          />
          <Btn
            onClick={() => {
              if (watch()["tags"] === "") return;
              setInputTurn((prev) => prev + 1);
            }}
          >
            Next
          </Btn>
        </InputBox>
        <TipSpace>
          {inputTurn === 3 && (
            <TipBox
              icon={"pencil"}
              title={"Adding tags"}
              contents={[
                "Tags help ensure that your question will get attention from the right people.",
                "Tag things in more than one way so people can find them more easily. Add tags for product lines, projects, teams, and the specific technologies or languages used.",
              ]}
            />
          )}
        </TipSpace>
      </Line>
      <Line height={"170px"}>
        <InputBox>
          {inputTurn < 4 && <Block />}
          <InputTitle>
            Review questions already on Stack Overflow to see if your question
            is a duplicate.
          </InputTitle>
          <InputExplan>
            Clicking on these questions will open them in a new tab for you to
            review. Your progress here will be saved so you can come back and
            continue.
          </InputExplan>
          <Input
            height={"35px"}
            placeholder="Do any of these posts answer your question?"
            {...register("duplicateCheck", { required: true })}
          />
          <QuestionBtn>Review your question</QuestionBtn>
        </InputBox>
        <TipSpace>
          {inputTurn === 4 && (
            <TipBox
              icon="bell"
              title={
                "Make sure we don’t already have an answer for your question"
              }
              contents={[
                "Stack Overflow is a huge database of knowledge.",
                "Please make sure your question isn’t already answered before posting, or your question might be closed as a duplicate.",
              ]}
            />
          )}
        </TipSpace>
      </Line>
    </Wrapper>
  );
}
