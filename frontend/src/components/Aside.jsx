import styled from "styled-components";
import YellowBlock from "./YellowBlock";
import Collectives from "./Collectives";
import RelatedTags from "./RelatedTags";
import HotQuestions from "./HotQuestions";

const Container = styled.aside`
  margin-top: 80px;
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
