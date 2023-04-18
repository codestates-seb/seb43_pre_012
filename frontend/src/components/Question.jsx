import styled from "styled-components";
import { Link } from "react-router-dom";

const MAX_LEN = 170;

const Container = styled.section`
  width: 770px;
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
  width: auto;
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

const Icon = styled.div``;

const Questioner = styled.h5`
  position: absolute;
  right: 15px;
  bottom: 25px;
  font-size: 13px;
  font-weight: 400;
  color: #237ed0;
`;

const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget sem suscipit, dictum ligula id, iaculis mi. Nullam iaculis ligula quis ante condimentum sollicitudin. Pellentesque lectus turpis, vehicula nec arcu a, iaculis dignissim dolor. Mauris gravida risus eget orci aliquet, quis euismod nunc tempus. Maecenas tincidunt, est non sagittis accumsan, urna erat aliquet lacus, id sollicitudin mauris orci ut enim. Duis enim nibh, fermentum ut lacinia in, cursus at velit. Proin hendrerit, leo et aliquet posuere, tortor diam vulputate orci, ut congue nisl dolor et magna. Nam rhoncus varius tellus, ac gravida nulla placerat vehicula. Cras ornare sodales nisl congue vulputate. Sed dapibus varius lorem ut fermentum. Cras volutpat eu tellus a interdum. Etiam blandit mauris vestibulum lacus laoreet semper. Pellentesque pellentesque massa turpis, eu dignissim ligula volutpat non. Etiam vitae velit ornare, ultrices purus vel, fermentum dui. Nullam auctor gravida venenatis.";

export default function Question({ question }) {
  return (
    <Container>
      <Figures>
        <Figure>{`임의의숫자 votes`}</Figure>
        <Figure>{`${question.answer_count} answers`}</Figure>
        <Figure>{`${question.view_count} views`}</Figure>
      </Figures>
      <Infos>
        <Link to={`${question.question_id}`}>
          <Title>{question.title}</Title>
        </Link>
        <Content>
          {loremIpsum.length >= MAX_LEN
            ? loremIpsum.slice(0, MAX_LEN) + "..."
            : loremIpsum}
        </Content>
        <Tags>
          {question.tags.map((tag) => (
            <Tag>{tag}</Tag>
          ))}
        </Tags>
        <Questioner>{question.owner.display_name}</Questioner>
      </Infos>
    </Container>
  );
}
