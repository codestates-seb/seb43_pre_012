import styled from "styled-components";
import HomeQuestions from "../components/HomeQuestions";

const Wrapper = styled.section`
  /* height: auto; */
  display: flex;
  /* align-items: start; */
  padding-bottom: 50px;
  position: relative;
  width: 100%;
  /* justify-content: center; */
`;

export default function Questions() {
  return (
    <Wrapper>
      <HomeQuestions />
    </Wrapper>
  );
}
