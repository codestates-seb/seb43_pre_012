import styled from "styled-components";
import TempHeader from "../components/TempHeader";
import YellowBlock from "../components/YellowBlock";
import Collectives from "../components/Collectives";
import RelatedTags from "../components/RelatedTags";
import HotQuestions from "../components/HotQuestions";

const Wrapper = styled.section`
  width: 100vw;
  height: auto;
  display: flex;
  padding-bottom: 50px;
  position: relative;
`;

const Nav = styled.nav`
  background-color: green;
  width: 170px;
  height: 500px;
  position: -webkit-sticky;
  position: sticky;
  top: 50px;
  left: 60px;
  margin-left: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  font-weight: bold;
  margin-top: 50px;

  color: white;
  font-size: 35px;
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

export default function QuestionDetail() {
  return (
    <Wrapper>
      <Nav>옆에 있는 거</Nav>
      <Container>
        <></>
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
