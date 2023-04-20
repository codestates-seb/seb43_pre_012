import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
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
import useQuestionById from "../hooks/useQuestionById";
import { Editor } from "@toast-ui/react-editor";
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";

const Wrapper = styled.section`
  height: auto;
  display: flex;

  @media screen and (max-width: ${(props) => props.theme.screen.md}) {
    flex-direction: column;
    align-items: center;
  }
`;

const Container = styled.main`
  max-width: 740px;
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

const Contents = styled.section`
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  margin-top: 10px;
  margin-bottom: 25px;
  max-width: 660px;
  width: 100%;

  & * {
    margin-bottom: 10px;
  }

  & p {
    font-size: ${(props) => props.theme.fontSizes.lg};
  }

  & pre {
    padding: 20px;
    width: 100%;
    max-height: 600px;
    overflow: auto;

    background-color: #f6f7f6;
  }

  & code {
    padding: 2px 4px;
    border-radius: 4px;
    font-family: "Courier New", Courier, monospace;
    font-size: ${(props) => props.theme.fontSizes.sm};
  }

  & img {
    width: 100%;
  }
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

const RelatedQuestions = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 70px;
`;

const RelatedQuestionTitle = styled.h4`
  color: ${(props) => props.theme.colors.black};
  font-size: ${(props) => props.theme.fontSizes.lg};
  font-weight: bold;
  margin-bottom: 5px;
`;

const RelatedQuestion = styled.section`
  display: flex;
  justify-content: start;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.gray};
  padding: 15px;
`;

const RelatedQuestionNum = styled.section`
  height: 25px;
  background-color: ${(props) => props.theme.colors.green};
  color: white;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-weight: 500;
`;

const RelatedQuestionName = styled.span`
  color: ${(props) => props.theme.colors.blue};
`;

const Answer = styled.div``;

const AnswerTitle = styled.h4`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const AnswerInput = styled.div`
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

const Loader = styled.h1`
  font-size: ${(props) => props.theme.fontSizes.lg};
  font-weight: bold;
`;

const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget sem suscipit, dictum ligula id, iaculis mi. Nullam iaculis ligula quis ante condimentum sollicitudin. Pellentesque lectus turpis, vehicula nec arcu a, iaculis dignissim dolor. Mauris gravida risus eget orci aliquet, quis euismod nunc tempus. Maecenas tincidunt, est non sagittis accumsan, urna erat aliquet lacus, id sollicitudin mauris orci ut enim. Duis enim nibh, fermentum ut lacinia in, cursus at velit. Proin hendrerit, leo et aliquet posuere, tortor diam vulputate orci, ut congue nisl dolor et magna. Nam rhoncus varius tellus, ac gravida nulla placerat vehicula. Cras ornare sodales nisl congue vulputate. Sed dapibus varius lorem ut fermentum. Cras volutpat eu tellus a interdum. Etiam blandit mauris vestibulum lacus laoreet semper. Pellentesque pellentesque massa turpis, eu dignissim ligula volutpat non. Etiam vitae velit ornare, ultrices purus vel, fermentum dui. Nullam auctor gravida venenatis.";

const getDate = (date) => {
  const dateInfo = Date(1681826527).split(" ");

  return `${dateInfo[3]}.${dateInfo[1]}.${dateInfo[2]}`;
};

export default function QnDetail() {
  // 일단은 거의 다 section으로 처리했는데, 나중에 수정할 여유가 된다면 수정하는 것이 좋아보임

  const [isLogin, setIsLogin] = useState(true);
  const { id } = useParams();
  const editorRef = useRef();

  const {
    getQuestionById: { data: question, isLoading },
  } = useQuestionById(id);

  const handlePostAnswer = () => {
    // html형식으로 텍스트를 가져오려면, getHTML()
    // 마크다운 형식으로 텍스트를 가져오려면, getMarkdown()
    const answer = editorRef.current.getInstance().getHTML();

    console.log("작성한 답!!!");
    console.log(answer);
  };

  return (
    <>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
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
                <HeaderInfo>{`Asked ${getDate(
                  question.creation_date
                )}`}</HeaderInfo>
                <HeaderInfo>Modified today</HeaderInfo>
                <HeaderInfo>{`Viewd ${question.view_count} times`}</HeaderInfo>
              </BottomHeader>
            </Header>
            <MainContents>
              <Question>
                <UpDownBtns>
                  <FontAwesomeIcon
                    icon={faCaretUp}
                    style={{ fontSize: "50px" }}
                  />
                  <UsefulCount>{question.score}</UsefulCount>
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
                  {/* <Content
                    dangerouslySetInnerHTML={{ __html: question.body }}
                  /> */}
                  <Viewer initialValue={question.body} />
                  <Tags>
                    {question.tags.map((tag) => (
                      <Tag key={tag} tag={tag} />
                    ))}
                  </Tags>
                  <QuestionerLine>
                    <Questioner>
                      <QuestionerIcon bgImage={question.owner.profile_image} />
                      {question.owner.display_name}
                    </Questioner>
                  </QuestionerLine>
                  <RelatedQuestions>
                    <RelatedQuestionTitle>
                      Related questions
                    </RelatedQuestionTitle>
                    <RelatedQuestion>
                      <RelatedQuestionNum>7621</RelatedQuestionNum>
                      <RelatedQuestionName>
                        How do JavaScript closure work?
                      </RelatedQuestionName>
                    </RelatedQuestion>
                    <RelatedQuestion>
                      <RelatedQuestionNum>8570</RelatedQuestionNum>
                      <RelatedQuestionName>
                        How do I check if an element is hidden in jQuery?
                      </RelatedQuestionName>
                    </RelatedQuestion>
                    <RelatedQuestion>
                      <RelatedQuestionNum>7323</RelatedQuestionNum>
                      <RelatedQuestionName>
                        HHow do I remove a property from a JavaScript object?
                      </RelatedQuestionName>
                    </RelatedQuestion>
                  </RelatedQuestions>
                  <Answer>
                    <AnswerTitle>
                      Know someone who can answer? Share a link to this question
                      via email, Twitter, or Facebook.
                    </AnswerTitle>
                    <AnswerTitle>Your Answer</AnswerTitle>
                    <AnswerInput>
                      <Editor
                        previewStyle="vertical"
                        height="100%"
                        initialEditType="wysiwyg"
                        useCommandShortcut={false}
                        language="ko-KR"
                        ref={editorRef}
                      />
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
                  </Answer>
                </Contents>
              </Question>
            </MainContents>
          </Container>
          <Aside />
        </Wrapper>
      )}
    </>
  );
}
