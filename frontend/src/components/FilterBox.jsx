import styled from "styled-components";

const Container = styled.form`
  width: 300px;
  height: 150px;
  border-radius: 5px;
  position: absolute;
  right: 22px;
  top: 140px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  z-index: 20;
  background-color: white;
`;

const Title = styled.h3`
  font-size: ${(props) => props.theme.fontSizes.lg};
  font-weight: bold;
`;

const InputExplan = styled.h4`
  font-size: ${(props) => props.theme.fontSizes.md};
  margin-bottom: 10px;
`;

const Input = styled.input`
  height: 35px;
  background-color: ${(props) => props.theme.colors.gray};
  border: 1px solid gray;
  margin-bottom: 10px;
  padding-left: 10px;
`;

const Btns = styled.div`
  display: flex;
`;

const Btn = styled.button`
  height: 40px;
  padding: 10px;
  border: none;
  background-color: ${(props) => props.theme.colors.skyblue};
  color: white;
  border-radius: 5px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
`;

const CancelBtn = styled.div`
  height: 40px;
  padding: 10px;
  border: none;
  color: ${(props) => props.theme.colors.skyblue};
  border-radius: 5px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
`;

export default function FilterBox() {
  return (
    <Container>
      <Title>Company tech stack</Title>
      <InputExplan>Add up to ten tech tags</InputExplan>
      <Input placeholder="e.g. html,c#" />
      <Btns>
        <Btn>Apply filter</Btn>
        <CancelBtn>Cancel</CancelBtn>
      </Btns>
    </Container>
  );
}
