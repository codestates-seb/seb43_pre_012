import styled from "styled-components";
import AllQuestions from "../components/AllQuestions";
import Nav from "../components/Nav";

const Wrapper = styled.section`
  height: auto;
  display: flex;
  align-items: start;
  padding-bottom: 50px;
  position: relative;
`;

export default function Questions() {
  return (
    <Wrapper>
      <Nav />
      <AllQuestions />
    </Wrapper>
  );
}
