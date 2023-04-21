import styled from "styled-components";
import YellowBlock from "./YellowBlock";
import Collectives from "./Collectives";
import RelatedTags from "./RelatedTags";
import HotQuestions from "./HotQuestions";

const Container = styled.aside`
  width: auto;
  margin-top: 80px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: ${(props) => props.theme.screen.md}) {
    width: 100%;
    align-items: center;
    padding: 0 20px;
  }
`;

export default function Aside() {
  return (
    <Container>
      <YellowBlock />
      <Collectives />
      <RelatedTags />
      <HotQuestions />
    </Container>
  );
}
