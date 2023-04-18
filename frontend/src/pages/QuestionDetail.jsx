import styled from "styled-components";
import QnDetail from "../components/QnDetail";
import Nav from "../components/Nav";

const Wrapper = styled.section`
  height: auto;
  display: flex;
  align-items: start;
  padding-bottom: 50px;
  position: relative;
`;

export default function QuestionDetail() {
  return (
    <>
      <Nav />
      <Wrapper>
        <QnDetail />
      </Wrapper>
    </>
  );
}
