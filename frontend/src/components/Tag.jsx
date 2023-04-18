import styled from "styled-components";

const Container = styled.section`
  height: 25px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  color: ${(props) => props.theme.colors.black};

  background-color: ${(props) => props.theme.colors.tagblue};
`;

export default function Tag({ tag }) {
  return <Container>{tag}</Container>;
}
