import styled from "styled-components";

const Container = styled.section`
  margin-top: 20px;
  margin-left: 25px;
  width: 770px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Btns = styled.section`
  display: flex;
  justify-content: left;
  align-items: center;
`;

const Btn = styled.div`
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #d4d8da;
  padding: 10px;
  margin-right: 5px;
`;

const DotDotDot = styled.span`
  margin-right: 5px;
  font-size: ${(props) => props.fontsize};
  font-weight: 400;
`;

export default function PageBtns() {
  return (
    <Container>
      <Btns>
        <Btn>1</Btn>
        <Btn>2</Btn>
        <Btn>3</Btn>
        <Btn>4</Btn>
        <Btn>5</Btn>
        <DotDotDot fontSize={"10px"}>...</DotDotDot>
        <Btn>1234567</Btn>
        <Btn>Next</Btn>
      </Btns>
      <Btns>
        <Btn>15</Btn>
        <Btn>30</Btn>
        <Btn>50</Btn>
        <DotDotDot fontSize={"12px"}>per page</DotDotDot>
      </Btns>
    </Container>
  );
}
