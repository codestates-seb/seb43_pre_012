import styled from "styled-components";
import { Link } from "react-router-dom";

const MAX_LEN = 170;

const Container = styled.section`
  /* width: 570px; */
  height: auto;
  height: 160px;
  display: flex;
  align-items: start;
  padding-top: 20px;
  border-bottom: 2px solid #f1f2f2;
`;

const Figures = styled.section`
  min-width: 120px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: end;
`;

const Figure = styled.h5`
  font-size: 15px;
  font-weight: 300;
  margin-bottom: 5px;
`;

const Infos = styled.section`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px;
  padding-top: 0px;
`;

const Title = styled.h3`
  color: #0175cc;
  font-size: 18px;
  font-weight: 500;
`;

const Content = styled.h4`
  font-size: 15px;
  font-weight: 400;
  margin-bottom: 5px;
`;

const Tags = styled.section`
  display: flex;
  align-items: center;
`;

const Tag = styled.div`
  height: 25px;
  padding: 5px;
  background-color: #e0edf4;
  color: #39739c;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  font-size: 15px;
  font-weight: 500;
  border-radius: 5px;
`;

const Questioner = styled.div`
  position: absolute;
  right: 40px;
  bottom: 25px;
  font-size: 13px;
  font-weight: 400;
  color: #237ed0;
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;
`;

const cleanContent = (body) => {
  const regex = /(<([^>]+)>)/gi;
  const result = body.slice(0, MAX_LEN).replace(regex, "");

  return result;
};

export default function Question({ question, showContent }) {
  const tempTags = ["JavaScript", "Java"];

  return (
    <Container>
      <Figures>
        <Figure>{`${question.score || 0} votes`}</Figure>
        <Figure>{`${question.answerCount} answers`}</Figure>
        <Figure>{`1 views`}</Figure>
      </Figures>
      <Infos>
        <Link to={`/questions/${question.questionId}`}>
          <Title>{question.title}</Title>
        </Link>
        <Content>
          {showContent && <>{cleanContent(question.content)}</>}
        </Content>
        <Tags>
          {question.tags
            ? question.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)
            : tempTags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
        </Tags>
        <Questioner>
          <Icon
            bgImage={
              "https://cdn.pixabay.com/photo/2022/11/22/22/06/bird-7610726_1280.jpg"
            }
          />
          {question.username}
        </Questioner>
      </Infos>
    </Container>
  );
}
