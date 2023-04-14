import styled from "styled-components";

const Container = styled.footer`
  width: 100%;
  height: 320px;
  height: 320px;
  // background-color: #222629;
  border: 1px solid black;
  background-color: black;
  padding-left: 100px;
  padding-right: 150px;
  padding-top: 30px;
  display: grid;
  grid-template-columns: 1fr 3fr 3fr 3fr 4fr 5fr;
`;

const Column = styled.section`
  width: auto;
  height: 100%;
  color: #babfc2;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  background-color: white;
`;

const Title = styled.h3`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Ul = styled.ul``;

const Li = styled.li`
  font-size: 15px;
  font-weight: 500;
`;

const Sites = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Site = styled.h4`
  font-size: 15px;
`;

const IntroduceMyself = styled.h4``;

export default function Footer() {
  return (
    <Container>
      <Column style={{ alignItems: "center" }}>
        <Icon />
      </Column>
      <Column>
        <Title>STACK OVERFLOW</Title>
        <Ul>
          <Li>Questions</Li>
          <Li>Help</Li>
        </Ul>
      </Column>
      <Column>
        <Title>PRODUCTS</Title>
        <Ul>
          <Li>Teams</Li>
          <Li>Advertising</Li>
          <Li>Collectives</Li>
          <Li>Talent</Li>
        </Ul>
      </Column>
      <Column>
        <Title>COMPANY</Title>
        <Ul>
          <Li>About</Li>
          <Li>Press</Li>
          <Li>Work Here</Li>
          <Li>Legal</Li>
          <Li>Privacy Policy</Li>
          <Li>Terms of Service</Li>
          <Li> Contact Us</Li>
          <Li>Cookie Settings</Li>
          <Li>Cookie Policy</Li>
        </Ul>
      </Column>
      <Column>
        <Title>STACK EXCHANGE NETWORK</Title>
        <Ul>
          <Li>Technology</Li>
          <Li>Culture & recreation</Li>
          <Li>Life & arts</Li>
          <Li>Science</Li>
          <Li>Professional</Li>
          <Li>Business</Li>
          <Li>API</Li>
          <Li>Data</Li>
        </Ul>
      </Column>
      <Column style={{ padding: "20px 0", justifyContent: "space-between" }}>
        <Sites>
          <Site>Blog</Site>
          <Site>Facebook</Site>
          <Site>Twitter</Site>
          <Site>LinkedIn</Site>
          <Site>Instagram</Site>
        </Sites>
        <IntroduceMyself>
          Site design / logo © 2023 Stack Exchange Inc; user contributions
          licensed under CC BY-SA. rev 2023.4.13.43385
        </IntroduceMyself>
      </Column>
    </Container>
  );
}
