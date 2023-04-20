import styled from "styled-components";

const Container = styled.section`
  width: 300px;
  height: auto;
  margin-bottom: 20px;

  @media screen and (max-width: ${(props) => props.theme.screen.md}) {
    width: 100%;
  }
`;

const Title = styled.h3`
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const QuestionContainer = styled.section`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-rows: repeat(auto, 1fr);
  gap: 5px;
`;

const Question = styled.section`
  display: grid;
  grid-template-columns: 20px auto;
  gap: 5px;
`;

const Icon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 100%;
  background-color: black;
`;

const Content = styled.h4`
  font-size: 13px;
`;

const Footer = styled.footer`
  color: #0075cc;
  font-weight: bold;
  margin-top: 5px;
`;

export default function HotQuestions() {
  return (
    <Container>
      <Title>Hot Network Questions</Title>
      <QuestionContainer>
        <Question>
          <Icon />
          <Content>
            My employers "401(k) contribution" is cash, not an actual retirement
            account. What are my options?
          </Content>
        </Question>
        <Question>
          <Icon />
          <Content>What film was Natasha referencing?</Content>
        </Question>
        <Question>
          <Icon />
          <Content>
            Is there a way to temporarily gain tool proficiencies?
          </Content>
        </Question>
        <Question>
          <Icon />
          <Content>
            Does the computational theory of mind explain anything?
          </Content>
        </Question>
        <Question>
          <Icon />
          <Content>
            Are times zones, (i.e. a geo-spatial frame of reference) considered
            in age based regulations?
          </Content>
        </Question>
        <Question>
          <Icon />
          <Content>
            Why are there such low rates of acceptance in AI/ML conferences?
          </Content>
        </Question>
        <Question>
          <Icon />
          <Content>
            Story by S. Maugham or S. Zweig, mother manipulates her husbands to
            their graves and dies after her daughter's marriage
          </Content>
        </Question>
        <Question>
          <Icon />
          <Content>
            What does "wife on the crupper" mean in Hunchback of Notre Dame?
          </Content>
        </Question>
        <Question>
          <Icon />
          <Content>
            Is it right to ask my advisor to let me prepare my defense talk
            alone?
          </Content>
        </Question>
        <Question>
          <Icon />
          <Content>
            Does the Hartree Fock energy of a virtual orbital fulfill the virial
            theorem?
          </Content>
        </Question>
        <Question>
          <Icon />
          <Content>ZX Spectrum interrupt handling: maskable and NMI</Content>
        </Question>
        <Question>
          <Icon />
          <Content>
            Can I file IRS form 1040 first then wait to pay until the deadline?
          </Content>
        </Question>
      </QuestionContainer>
      <Footer>more hot questions</Footer>
    </Container>
  );
}
