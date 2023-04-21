import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  display: flex;
  width: 160px;
  align-items: center;
  ${({ isSelected }) =>
    isSelected &&
    `
		background-color: #F1F2F3;
		border-right: 4px solid #f48024;
		font-weight: 800;
	`}
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2px;
  width: 100%;
  color: #6a737c;
  padding-left: 5px;
  height: 35px;
  &:hover {
    color: #0c0d0e;
    cursor: pointer;
  }
`;
const ButtonText = styled.div`
  position: absolute;
  display: flex;
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.black};
  margin-left: ${({ isHome }) => isHome || "25px"};
  ${({ isSelected }) =>
    isSelected &&
    `
		font-weight: 800;
		
	`}
`;

export default function ButtonContainer({ name, children, style }) {
  const location = useLocation().pathname.split("/")[1] || "home";
  const isSelected = location === name.toLowerCase();
  const isHome = name === "Home";
  return (
    <Container style={style} isSelected={isSelected}>
      <ButtonWrapper>
        {children}
        <ButtonText isHome={isHome} isSelected={isSelected}>
          {name}
        </ButtonText>
      </ButtonWrapper>
    </Container>
  );
}
