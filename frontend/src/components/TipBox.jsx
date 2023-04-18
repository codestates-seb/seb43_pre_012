import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faBell, faPen } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  max-width: 350px;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const Title = styled.h3`
  width: 100%;
  height: 45px;
  background-color: ${(props) => props.theme.colors.gray};
  font-size: 18px;
  display: flex;
  align-items: center;
  padding-left: 15px;
`;

const Main = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 25px;
`;

const Contents = styled.div``;

const Content = styled.h4`
  margin-left: 15px;
  font-size: 12px;
  margin-bottom: 5px;
`;

export default function TipBox({ icon, title, contents }) {
  return (
    <Container>
      <Title>{title}</Title>
      <Main>
        <FontAwesomeIcon
          icon={icon === "pencil" ? faPencil : faBell}
          style={{ fontSize: "50px" }}
        />
        <Contents>
          {contents.map((content) => (
            <Content key={content}>{content}</Content>
          ))}
        </Contents>
      </Main>
    </Container>
  );
}
