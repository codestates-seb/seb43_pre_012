import styled from "styled-components";
import QnDetail from "../components/QnDetail";
import YellowBlock from "../components/YellowBlock";
import Collectives from "../components/Collectives";
import RelatedTags from "../components/RelatedTags";
import HotQuestions from "../components/HotQuestions";
import TempNav from "../components/TempNav";

const Wrapper = styled.section`
  width: 100vw;
  height: auto;
  display: flex;
  padding-bottom: 50px;
  position: relative;
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
      <TempNav />
      <QnDetail />
    </Wrapper>
  );
}
