import styled from "styled-components";

const Container = styled.section`
  width: 300px;
  height: auto;
  padding-left: 10px;
  // border: 1px solid black;
`;

const Title = styled.h3`
  width: 100%;
  height: 45px;
  font-size: 25px;
  display: flex;
  justify-content: left;
  align-items: center;
`;

const Tag = styled.section`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: left;
  align-items: center;
`;

const Name = styled.section`
  background-color: #e1ecf4;
  color: #447aa1;
  width: auto;
  height: 25px;
  padding: 7px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Count = styled.h4`
  font-size: 12px;
  margin-left: 5px;
  font-weight: 400;
`;

const Footer = styled.footer`
  color: #0075cc;
  font-weight: bold;
  margin-top: 5px;
`;

export default function RelatedTags() {
  return (
    <Container>
      <Title>Related Tags</Title>
      <Tag>
        <Name>javascript</Name>
        <Count>x 2489035</Count>
      </Tag>
      <Tag>
        <Name>python</Name>
        <Count>x 2126983</Count>
      </Tag>
      <Tag>
        <Name>java</Name>
        <Count>x 1894607</Count>
      </Tag>
      <Tag>
        <Name>c#</Name>
        <Count>x 1588214</Count>
      </Tag>
      <Tag>
        <Name>php</Name>
        <Count>x 1458216</Count>
      </Tag>
      <Tag>
        <Name>android</Name>
        <Count>x 1402953</Count>
      </Tag>
      <Tag>
        <Name>html</Name>
        <Count>x 1171572</Count>
      </Tag>
      <Tag>
        <Name>jquery</Name>
        <Count>x 1037059</Count>
      </Tag>
      <Tag>
        <Name>c++</Name>
        <Count>x 792209</Count>
      </Tag>
      <Tag>
        <Name>css</Name>
        <Count>x 790648</Count>
      </Tag>
      <Footer>more related tags</Footer>
    </Container>
  );
}
