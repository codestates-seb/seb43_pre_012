import { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretUp,
  faCaretDown,
  faBookmark,
  faClockRotateLeft,
  faG,
  faF,
} from "@fortawesome/free-solid-svg-icons";
import { getQuestionDetail } from "../functions";
import Aside from "./Aside";

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
  font-size: ${(props) => props.fontSize};
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
  margin-bottom: 25px;
`;

const Tags = styled.section`
  display: flex;
  justify-content: start;
  align-items: center;
`;

const Tag = styled.section`
  height: 25px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  color: ${(props) => props.theme.colors.black};
  background-color: ${(props) => props.theme.colors.tagblue};
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
  background-color: black;
  margin-right: 5px;
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

const Answer = styled.form``;

const AnswerTitle = styled.h4`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const AnswerInput = styled.input`
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
  border: 1px solid black;
  padding: 5px;
  display: flex;
  align-items: center;
  margin-top: 50px;
`;

const PostBtn = styled.button`
  min-width: 120px;
  height: 60px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  background-color: ${(props) => props.theme.colors.skyblue};

  &:hover {
    background-color: ${(props) => props.theme.colors.btnHover};
  }
`;

const PostSpan = styled.span`
  width: auto;
  font-size: 15px;
  margin-left: 10px;
`;

const Loader = styled.h1`
  font-size: ${(props) => props.theme.fontSizes.lg};
  font-weight: bold;
`;

const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget sem suscipit, dictum ligula id, iaculis mi. Nullam iaculis ligula quis ante condimentum sollicitudin. Pellentesque lectus turpis, vehicula nec arcu a, iaculis dignissim dolor. Mauris gravida risus eget orci aliquet, quis euismod nunc tempus. Maecenas tincidunt, est non sagittis accumsan, urna erat aliquet lacus, id sollicitudin mauris orci ut enim. Duis enim nibh, fermentum ut lacinia in, cursus at velit. Proin hendrerit, leo et aliquet posuere, tortor diam vulputate orci, ut congue nisl dolor et magna. Nam rhoncus varius tellus, ac gravida nulla placerat vehicula. Cras ornare sodales nisl congue vulputate. Sed dapibus varius lorem ut fermentum. Cras volutpat eu tellus a interdum. Etiam blandit mauris vestibulum lacus laoreet semper. Pellentesque pellentesque massa turpis, eu dignissim ligula volutpat non. Etiam vitae velit ornare, ultrices purus vel, fermentum dui. Nullam auctor gravida venenatis.";

export default function QnDetail() {
  // 일단은 거의 다 section으로 처리했는데, 나중에 수정할 여유가 된다면 수정하는 것이 좋아보임

  const [question, setQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      setIsLoading((prev) => true);

      // const response = await getQuestionDetail(76012599);
      // setQuestion((prev) => response.items[0]);

      // console.log(response.items[0]);

      setIsLoading((prev) => false);
    })();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Wrapper>
          <Container>
            <Header>
              <TopHeader>
                <Title fontSize={"25px"}>대충제목이라는뜻</Title>
                <AskBtn>Ask Question</AskBtn>
              </TopHeader>
              <BottomHeader>
                <HeaderInfo>Asked today</HeaderInfo>
                <HeaderInfo>Modified today</HeaderInfo>
                <HeaderInfo>Viewed ?? times</HeaderInfo>
              </BottomHeader>
            </Header>
            <MainContents>
              <Question>
                <UpDownBtns>
                  <FontAwesomeIcon
                    icon={faCaretUp}
                    style={{ fontSize: "50px" }}
                  />
                  <UsefulCount>999</UsefulCount>
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
                  <Content>{`${loremIpsum}`}</Content>
                  <Tags>
                    <Tag>tag1</Tag>
                    <Tag>tag2</Tag>
                    <Tag>tag3</Tag>
                  </Tags>
                  <QuestionerLine>
                    <Questioner>
                      <QuestionerIcon />
                      Hong Gil Dong
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
                    <AnswerInput />
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
                      <PostBtn>Post Your Answer</PostBtn>
                      <PostSpan>Discard</PostSpan>
                      <PostSpan>
                        By clicking “Post Your Answer”, you agree to our terms
                        of service, privacy policy and cookie policy
                      </PostSpan>
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
