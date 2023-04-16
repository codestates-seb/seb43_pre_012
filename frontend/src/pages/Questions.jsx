import styled from "styled-components";
import AllQuestions from "../components/AllQuestions";
import YellowBlock from "../components/YellowBlock";
import Collectives from "../components/Collectives";
import RelatedTags from "../components/RelatedTags";
import HotQuestions from "../components/HotQuestions";
import TempNav from "../components/TempNav";

const Wrapper = styled.section`
  width: 100vw;
  height: auto;
  padding-bottom: 50px;
  position: relative;
  display: flex;
`;

const Container = styled.section`
  height: auto;
  margin-top: 50px;
  display: flex;
  justify-content: left;
  align-items: start;
  margin-left: 60px;
  z-index: 5;
`;

const Aside = styled.aside`
  width: auto;
  height: auto;
  display: grid;
  grid-template-rows: repeat(auto, 1fr);
  gap: 20px;
  margin-left: 25px;
  margin-top: 50px;
`;

export default function Questions() {
  return (
    <Wrapper>
      <TempNav />
      <Container>
        <AllQuestions />
        <Aside>
          <YellowBlock />
          <Collectives />
          <RelatedTags />
          <HotQuestions />
        </Aside>
      </Container>
    </Wrapper>
  );
}
