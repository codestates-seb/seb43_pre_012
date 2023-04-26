import { useRef, useState } from "react";
import styled from "styled-components";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretUp,
  faCaretDown,
  faBookmark,
  faClockRotateLeft,
  faG,
  faF,
} from "@fortawesome/free-solid-svg-icons";
import Aside from "./Aside";
import Tag from "./Tag";
import Answer from "./Answer";
import RelatedQuestions from "../components/RelatedQuestions";
import { Editor } from "@toast-ui/react-editor";
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import EditQuestion from "./EditQuestion";
import { useQuery, useMutation } from "react-query";
import {
  addAnswer,
  getAnswersByQuestionId,
  getQuestionById,
  removeQuestion,
} from "../hooks/tempUseQuestion";
import { useEffect } from "react";

const Wrapper = styled.section`
  width: 100%;
  height: auto;
  display: flex;

  @media screen and (max-width: ${(props) => props.theme.screen.md}) {
    flex-direction: column;
    /* align-items: center; */
  }
`;

const Container = styled.main`
  /* max-width: 740px; */
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-right: 40px;
  margin-top: 50px;
`;

const Header = styled.header`
  width: 100%;
  height: 100px;
  padding-left: 25px;
`;

const TopHeader = styled.section`
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 25px;
  font-weight: bold;
`;

const AskBtn = styled.div`
  width: 100px;
  height: 35px;
  background-color: #0994fe;
  color: white;
  font-weight: 500;
  font-size: ${(props) => props.theme.fontSizes.sm};
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: #80c0ff 0px 1px 4px;

  &:hover {
    background-color: ${(props) => props.theme.colors.btnHover};
  }
`;

const BottomHeader = styled.section`
  width: 100%;
  height: 40%;
  display: flex;
`;

const HeaderInfo = styled.h6`
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: 400;
  margin-right: 15px;
`;

const MainContents = styled.section`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
`;

const Question = styled.section`
  width: 100%;
  height: auto;
  display: flex;
`;
const ContextsWrapper = styled.div``; //jh

const Contents = styled.section`
  display: flex;
  flex-direction: column;
`;

const Tags = styled.section`
  display: flex;
  justify-content: start;
  align-items: center;
`;

const QuestionerLine = styled.section`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: right;
  align-items: center;
  position: relative;
`;

const QuestionerIcon = styled.div`
  width: 35px;
  height: 35px;
  margin-right: 5px;
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;
`;

const Questioner = styled.div`
  height: 70px;
  background-color: #d8eaf6;
  display: flex;
  justify-content: center;
  align-items: center;

  // 임시값들
  width: 200px;
`;

const UpDownBtns = styled.section`
  flex-shrink: 0;
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  margin-right: 10px;
`;

const UsefulCount = styled.span`
  font-size: 30px;
  font-weight: 500;
`;

const Answers = styled.div`
  width: 100%;

  height: 150px;
  background-color: green;
`;

const AnswerTitle = styled.h4`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const AnswerInput = styled.div`
  background-color: red;
  max-width: 700px;
  width: 100%;
  height: 250px;
  font-size: ${(props) => props.theme.fontSizes.lg};
`;

const AccountChoices = styled.section`
  margin-top: 100px;
  height: 180px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 30px;
`;

const AccountChoiceTitle = styled.h4`
  font-size: 20px;
  font-weight: bold;
`;

const AccountChoice = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
`;

const AccountType = styled.section`
  width: 100%;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid gray;
  font-weight: 400;
  text-align: center;
`;

const GuestLabel = styled.h5`
  font-size: 17px;
  font-weight: 400;
`;

const GuestInput = styled.input`
  height: 35px;
  border: 1px solid ${(props) => props.theme.colors.gray};
`;

const PostLine = styled.section`
  width: 100%;
  height: 70px;
  padding: 5px;
  display: flex;
  align-items: center;
`;

const PostBtn = styled.div`
  min-width: 130px;
  height: 40px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 15px;
  color: white;
  background-color: ${(props) => props.theme.colors.skyblue};
  border-radius: 5px;

  &:hover {
    background-color: ${(props) => props.theme.colors.btnHover};
  }

  &:active {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
`;

const CRUDBtns = styled.div`
  position: absolute;
  bottom: 50px;
  left: 0;
  display: flex;
  align-items: center;
`;

const CRUDBtn = styled.h6`
  font-size: 15px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.gray};
  margin-right: 10px;

  &:hover {
    cursor: pointer;
  }
`;

const Loader = styled.h1`
  font-size: ${(props) => props.theme.fontSizes.lg};
  font-weight: bold;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 15;
  width: 100vw;
  height: 100vh;
`;
const EditContainer = styled.div`
  max-width: 600px;
  width: 90%;
  height: 100%;
  background-color: green;
  padding: 10px;
`;

const StyledEditor = styled(Editor)`
  width: 100%;
`;

const tempMemberId = 28;

export default function QnDetail() {
  const tempTags = ["JavaScript", "Java"];

  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [editQuestion, setEditQuestion] = useState(false);

  const { id } = useParams();
  const editorRef = useRef();

  const { data: question, isLoading: isQuestionLoading } = useQuery(
    ["question", id],
    () => getQuestionById(id)
  );

  const { data: answers, isLoading: isAnswersLoading } = useQuery(
    ["answers"],
    () => getAnswersByQuestionId(id)
  );

  const handlePostAnswer = async () => {
    // html형식으로 텍스트를 가져오려면, getHTML()
    // 마크다운 형식으로 텍스트를 가져오려면, getMarkdown()
    const content = editorRef.current.getInstance().getHTML();

    const newAnswer = {
      content,
      questionId: id,
      memberId: tempMemberId,
    };

    await addAnswer(newAnswer);
    window.location.replace(`/questions/${question.questionId}`);
  };

  const handleDeleteQuestion = async () => {
    await removeQuestion(id);

    // removeQuestion(id);
    navigate("/questions");
  };

  return (
    <>
      {isQuestionLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Wrapper>
            <Container>
              <Header>
                <TopHeader>
                  <Title>{question.title}</Title>
                  <Link to="/questions/ask">
                    <AskBtn>Ask Question</AskBtn>
                  </Link>
                </TopHeader>
                <BottomHeader>
                  <HeaderInfo>{`Asked ${question.createdAt}`}</HeaderInfo>
                  <HeaderInfo>{`Modified At ${question.modifiedAt}`}</HeaderInfo>
                  <HeaderInfo>{`Viewd ${
                    question.viewCount || 1
                  } times`}</HeaderInfo>
                </BottomHeader>
              </Header>
              <MainContents>
                <Question>
                  <UpDownBtns>
                    <FontAwesomeIcon
                      icon={faCaretUp}
                      style={{ fontSize: "50px" }}
                    />
                    <UsefulCount>{question.score || 5}</UsefulCount>
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      style={{ fontSize: "50px" }}
                    />
                    <FontAwesomeIcon
                      icon={faBookmark}
                      style={{ fontSize: "25px", marginBottom: "10px" }}
                    />
                    <FontAwesomeIcon
                      icon={faClockRotateLeft}
                      style={{ fontSize: "25px" }}
                    />
                  </UpDownBtns>
                  <Contents>
                    <Viewer initialValue={question.content} />
                    <Tags>
                      {question.tags
                        ? question.tags.map((tag) => (
                            <Tag key={tag} tag={tag} />
                          ))
                        : tempTags.map((tag) => <Tag key={tag} tag={tag} />)}
                    </Tags>
                    <QuestionerLine>
                      <CRUDBtns>
                        <CRUDBtn
                          onClick={() => setEditQuestion((prev) => true)}
                        >
                          Edit
                        </CRUDBtn>
                        <CRUDBtn onClick={handleDeleteQuestion}>Delete</CRUDBtn>
                      </CRUDBtns>
                      <Questioner>
                        <QuestionerIcon
                          bgImage={
                            "https://cdn.pixabay.com/photo/2022/11/22/22/06/bird-7610726_1280.jpg"
                          }
                        />
                        {question.username}
                      </Questioner>
                    </QuestionerLine>
                    <RelatedQuestions />
                    {isAnswersLoading ? (
                      <Loader>Loading...</Loader>
                    ) : (
                      answers.map((answer) => (
                        <Answer answer={answer} key={answer.answerId} />
                      ))
                    )}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateRows: "repeat(auto, 1fr)",
                      }}
                    >
                      <AnswerTitle>
                        Know someone who can answer? Share a link to this
                        question via email, Twitter, or Facebook.
                      </AnswerTitle>
                      <AnswerTitle>Your Answer</AnswerTitle>
                      <AnswerInput>
                        <EditContainer>
                          <StyledEditor
                            previewStyle="vertical"
                            height="100%"
                            initialEditType="wysiwyg"
                            useCommandShortcut={false}
                            language="ko-KR"
                            ref={editorRef}
                            width="800px"
                          />
                        </EditContainer>
                      </AnswerInput>
                      {isLogin ? null : (
                        <AccountChoices>
                          <AccountChoice>
                            <AccountChoiceTitle>
                              Sign up or log in
                            </AccountChoiceTitle>
                            <AccountType>
                              <FontAwesomeIcon
                                icon={faG}
                                style={{ marginRight: "5px" }}
                              />
                              Sign up using Google
                            </AccountType>
                            <AccountType
                              style={{
                                backgroundColor: "#3b5998",
                                color: "white",
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faF}
                                style={{
                                  backgroundColor: "white",
                                  color: "#3b5998",
                                  marginRight: "5px",
                                  padding: "5px",
                                }}
                              />
                              Sign up using Facebook
                            </AccountType>
                            <AccountType>
                              Sign up using Email and Password
                            </AccountType>
                          </AccountChoice>
                          <AccountChoice>
                            <AccountChoiceTitle>
                              Post as a guest
                            </AccountChoiceTitle>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                              }}
                            >
                              <GuestLabel>Name</GuestLabel>
                              <GuestInput />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                              }}
                            >
                              <GuestLabel>Email</GuestLabel>
                              <GuestInput />
                            </div>
                          </AccountChoice>
                        </AccountChoices>
                      )}
                      <PostLine>
                        <PostBtn onClick={() => handlePostAnswer()}>
                          Post Your Answer
                        </PostBtn>
                      </PostLine>
                    </div>
                  </Contents>
                </Question>
              </MainContents>
            </Container>
            <Aside />
          </Wrapper>
          {editQuestion && (
            <>
              <Overlay onClick={() => setEditQuestion((prev) => false)} />
              <EditQuestion question={question} />
            </>
          )}
        </>
      )}
    </>
  );
}
