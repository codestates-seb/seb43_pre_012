import styled from "styled-components";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 70px;
`;

const RelatedQuestionTitle = styled.h4`
  color: ${(props) => props.theme.colors.black};
  font-size: ${(props) => props.theme.fontSizes.lg};
  font-weight: bold;
  margin-bottom: 5px;
`;

const RelatedQuestion = styled.section`
  display: flex;
  justify-content: start;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.gray};
  padding: 15px;
`;

const RelatedQuestionNum = styled.section`
  height: 25px;
  background-color: ${(props) => props.theme.colors.green};
  color: white;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-weight: 500;
`;

const RelatedQuestionName = styled.span`
  color: ${(props) => props.theme.colors.blue};
`;

export default function RelatedQuestions() {
  return (
    <Container>
      <RelatedQuestionTitle>Related questions</RelatedQuestionTitle>
      <RelatedQuestion>
        <RelatedQuestionNum>7621</RelatedQuestionNum>
        <RelatedQuestionName>
          How do JavaScript closure work?
        </RelatedQuestionName>
      </RelatedQuestion>
      <RelatedQuestion>
        <RelatedQuestionNum>8570</RelatedQuestionNum>
        <RelatedQuestionName>
          How do I check if an element is hidden in jQuery?
        </RelatedQuestionName>
      </RelatedQuestion>
      <RelatedQuestion>
        <RelatedQuestionNum>7323</RelatedQuestionNum>
        <RelatedQuestionName>
          HHow do I remove a property from a JavaScript object?
        </RelatedQuestionName>
      </RelatedQuestion>
    </Container>
  );
}
