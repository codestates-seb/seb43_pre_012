import styled from "styled-components";

const Container = styled.aside`
  width: 300px;
  height: auto;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin-bottom: 20px;

  @media screen and (max-width: ${(props) => props.theme.screen.md}) {
    width: 100%;
  }
`;

const Title = styled.section`
  width: 100%;
  height: 40px;
  background-color: #f8f8f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  font-size: 14px;
  font-weight: bold;
`;

const Content = styled.section`
  width: 100%;
  background-color: white;
  padding: 15px;
  border: 0.5px solid gray;
  display: grid;
  gap: 5px;
  grid-template-rows: 1fr 1fr;
`;

const TopContent = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Icon = styled.div`
  width: 30px;
  height: 30px;
  background-color: black;
  margin-right: 10px;
`;

const Left = styled.div`
  display: flex;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spans = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

const Span = styled.span``;

const Btn = styled.div`
  width: 50px;
  height: 35px;
  border: 1px solid #379eef;
  color: #277fd0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

const BottomContent = styled.section`
  font-size: 15px;
  font-weight: 300;
`;

export default function Collectives() {
  return (
    <Container>
      <Title>
        <span>Collectives</span>
        <span>see all</span>
      </Title>
      <Content>
        <TopContent>
          <Left>
            <Icon />
            <Spans>
              <Span>AWS</Span>
              <Span>10k Members</Span>
            </Spans>
          </Left>
          <Btn>Join</Btn>
        </TopContent>
        <BottomContent>
          Amazon Web Services (AWS) is the world’s most comprehensive and
          broadly adopted...
        </BottomContent>
      </Content>
      <Content>
        <TopContent>
          <Left>
            <Icon />
            <Spans>
              <Span>AWS</Span>
              <Span>10k Members</Span>
            </Spans>
          </Left>
          <Btn>Join</Btn>
        </TopContent>
        <BottomContent>
          Amazon Web Services (AWS) is the world’s most comprehensive and
          broadly adopted...
        </BottomContent>
      </Content>
      <Content>
        <TopContent>
          <Left>
            <Icon />
            <Spans>
              <Span>AWS</Span>
              <Span>10k Members</Span>
            </Spans>
          </Left>
          <Btn>Join</Btn>
        </TopContent>
        <BottomContent>
          Amazon Web Services (AWS) is the world’s most comprehensive and
          broadly adopted...
        </BottomContent>
      </Content>
    </Container>
  );
}
