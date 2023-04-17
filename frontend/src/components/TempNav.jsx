import styled from "styled-components";

const Nav = styled.nav`
  background-color: green;
  min-width: 170px;
  height: 500px;
  position: -webkit-sticky;
  position: sticky;
  top: 50px;
  left: 60px;
  margin-left: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  font-weight: bold;
  margin-top: 50px;

  color: white;
  font-size: 35px;

  @media screen and (max-width: ${(props) => props.theme.screen.sm}) {
    display: none;
  }
`;

export default function TempNav() {
  return <Nav>옆에 있는 거</Nav>;
}
