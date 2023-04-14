import styled from "styled-components";

const Container = styled.aside`
  width: 300px;
  height: auto;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const Title = styled.section`
  width: 100%;
  height: 40px;
  background-color: #faf3d5;
  display: flex;
  justify-content: left;
  align-items: center;
  padding-left: 15px;
  font-size: 14px;
  font-weight: bold;
`;

const Contents = styled.ul`
  width: 100%;
  background-color: #fdf6e2;
  padding: 15px;
`;

const Content = styled.li`
  margin-bottom: 8px;
`;

export default function YellowBlock() {
  return (
    <Container>
      <Title>The Overflow Blog</Title>
      <Contents>
        <Content>
          What’s the difference between software engineering and computer
          science degrees?
        </Content>
        <Content>
          Going stateless with authorization-as-a-service (Ep. 553)
        </Content>
      </Contents>
      <Title>Featured on Meta</Title>
      <Contents>
        <Content>
          Improving the copy in the close modal and post notices - 2023 edition
        </Content>
        <Content>
          Plagiarism flag and moderator tooling has launched to Stack Overflow!
        </Content>
        <Content>Temporary policy: ChatGPT is banned</Content>
        <Content>
          Do you observe increased relevance of Related Questions with our
          Machine...
        </Content>
      </Contents>
    </Container>
  );
}
